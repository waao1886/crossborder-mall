"use client"

import { usePathname } from "@/i18n/routing"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "km", label: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "lo", label: "ລາວ", flag: "🇱🇦" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    const segments = window.location.pathname.split("/").filter(Boolean)
    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      segments[0] = locale
    } else {
      segments.unshift(locale)
    }
    window.location.href = "/" + segments.join("/")
  }

  const segments = pathname.split("/").filter(Boolean)
  const currentLocale = segments.length > 0 ? segments[0] : "en"
  const currentLang = languages.find((l) => l.code === currentLocale)

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent">
        <Globe className="h-4 w-4" />
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.label}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 bg-popover border rounded-md shadow-lg p-1 hidden group-hover:block z-50 min-w-[180px]">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent transition-colors ${currentLocale === lang.code ? "font-semibold bg-accent/50" : ""}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
