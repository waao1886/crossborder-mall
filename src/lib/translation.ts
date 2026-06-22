import { db } from "@/lib/db"

const SUPPORTED_LANGUAGES = ["th", "vi", "id", "ms", "km", "lo", "ar"] as const
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const GOOGLE_API_KEY = process.env.GOOGLE_TRANSLATION_API_KEY || ""
const MYMEMORY_EMAIL = process.env.MYMEMORY_EMAIL || "" // optional, gives 10000 words/day

interface TranslationCache {
  [key: string]: string
}
const cache: TranslationCache = {}
const CACHE_MAX = 5000

/**
 * Try MyMemory API first (free, no VPN needed, works in China).
 * Falls back to Google if key is configured.
 * Falls back to original text if nothing works.
 */
async function callTranslationAPI(
  text: string,
  targetLang: string
): Promise<string> {
  // --- Strategy 1: MyMemory (free, no key, works in China) ---
  try {
    const params = new URLSearchParams({
      q: text,
      langpair: `zh|${targetLang}`,
    })
    if (MYMEMORY_EMAIL) params.set("de", MYMEMORY_EMAIL)

    const res = await fetch(
      `https://api.mymemory.translated.net/get?${params.toString()}`
    )
    const data = await res.json()
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
    // If MyMemory returns a match quality warning, still use it
    if (data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
  } catch {
    // MyMemory failed, try Google
  }

  // --- Strategy 2: Google Cloud Translation (premium, needs VPN to get key) ---
  if (GOOGLE_API_KEY) {
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target: targetLang, source: "zh-CN", format: "text" }),
      })
      const data = await res.json()
      if (data.data?.translations?.[0]?.translatedText) {
        return data.data.translations[0].translatedText
      }
    } catch {
      // Google failed
    }
  }

  // --- Fallback: return original ---
  return text
}

/**
 * Translate text to target language.
 * Caches in memory (LRU, 5000 entries).
 */
export async function translateText(
  text: string,
  targetLang: SupportedLanguage
): Promise<string> {
  if (!text || !text.trim()) return text

  const cacheKey = `${targetLang}:${text.slice(0, 100)}`
  if (cache[cacheKey]) return cache[cacheKey]

  const translated = await callTranslationAPI(text, targetLang)

  // LRU cache eviction
  if (Object.keys(cache).length > CACHE_MAX) {
    delete cache[Object.keys(cache)[0]]
  }
  cache[cacheKey] = translated

  return translated
}

/**
 * Translate a product's title and description into the target language.
 * DB cache → API → save to DB cache.
 */
export async function translateProduct(
  productId: string,
  targetLang: SupportedLanguage
): Promise<{ title: string; description: string | null }> {
  // 1. Check DB cache
  const cached = await db.productTranslation.findUnique({
    where: { productId_language: { productId, language: targetLang } },
  })
  if (cached) return { title: cached.title, description: cached.description }

  // 2. Get original product
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { title: true, description: true },
  })
  if (!product) return { title: "", description: null }

  // 3. Translate
  const [tTitle, tDesc] = await Promise.all([
    translateText(product.title, targetLang),
    product.description ? translateText(product.description, targetLang) : null,
  ])

  // 4. Save to DB cache
  try {
    await db.productTranslation.create({
      data: {
        productId,
        language: targetLang,
        title: tTitle,
        description: tDesc as string | null,
      },
    })
  } catch { /* duplicate, ignore */ }

  return { title: tTitle, description: tDesc as string | null }
}

/**
 * Batch translate for pre-warming.
 */
export async function batchTranslateProducts(
  products: Array<{ id: string; title: string; description?: string | null }>,
  targetLangs: SupportedLanguage[] = [...SUPPORTED_LANGUAGES]
): Promise<number> {
  let count = 0
  for (const p of products) {
    for (const lang of targetLangs) {
      const exists = await db.productTranslation.findUnique({
        where: { productId_language: { productId: p.id, language: lang } },
      })
      if (exists) continue

      const t = await translateText(p.title, lang)
      const d = p.description ? await translateText(p.description, lang) : null
      try {
        await db.productTranslation.create({
          data: { productId: p.id, language: lang, title: t, description: d },
        })
        count++
      } catch { /* skip duplicates */ }
    }
  }
  return count
}

export async function getDisplayTitle(productId: string, locale: string): Promise<string> {
  if (locale === "en") {
    const p = await db.product.findUnique({
      where: { id: productId },
      select: { titleEn: true, title: true },
    })
    return p?.titleEn || p?.title || ""
  }
  if (!SUPPORTED_LANGUAGES.includes(locale as SupportedLanguage)) return ""
  const { title } = await translateProduct(productId, locale as SupportedLanguage)
  return title
}

export { SUPPORTED_LANGUAGES }
export type { SupportedLanguage }
