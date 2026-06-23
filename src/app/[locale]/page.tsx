import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Monitor, ShoppingCart, Truck, Smartphone, Store, Gift, BookOpen, Coffee, Search } from "lucide-react"
import { ProductWall, type ProductData } from "@/components/product/ProductWall"
import fs from "fs"
import path from "path"

const PLATFORMS = [
  { key: "taobao", name: "Taobao / Tmall", param: "TAOBAO", color: "from-orange-400 to-orange-600", icon: ShoppingBag },
  { key: "jd", name: "JD.com", param: "JD", color: "from-red-400 to-red-600", icon: Monitor },
  { key: "pinduoduo", name: "Pinduoduo", param: "PINDUODUO", color: "from-rose-400 to-rose-600", icon: ShoppingCart },
  { key: "alibaba", name: "1688.com", param: "ALIBABA", color: "from-amber-400 to-amber-600", icon: Truck },
  { key: "douyin", name: "Douyin Shop", param: "DOUYIN", color: "from-fuchsia-400 to-pink-600", icon: Smartphone },
  { key: "suning", name: "Suning.com", param: "SUNING", color: "from-blue-400 to-blue-600", icon: Store },
  { key: "vipshop", name: "VIP.com", param: "VIPSHOP", color: "from-purple-400 to-purple-600", icon: Gift },
  { key: "dangdang", name: "Dangdang", param: "DANGDANG", color: "from-teal-400 to-teal-600", icon: BookOpen },
  { key: "meituan", name: "Meituan", param: "MEITUAN", color: "from-yellow-400 to-yellow-600", icon: Coffee },
]

export default async function HomePage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("home")
  const locale = params.locale

  const localeParam = params.locale || "en"

  // Load product data at build time
  const productsPath = path.join(process.cwd(), "public", "data", "products.json")
  const allProducts: ProductData[] = fs.existsSync(productsPath)
    ? JSON.parse(fs.readFileSync(productsPath, "utf-8"))
    : []
  const products = [...allProducts].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-10 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Search Bar above title */}
          <form action={`/${localeParam}/search`} className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="q"
                placeholder={t("hero.searchPlaceholder")}
                className="pl-12 pr-4 h-14 text-lg rounded-2xl shadow-sm border-2 border-primary/20 focus:border-primary"
              />
              <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl">
                {t("hero.searchBtn")}
              </Button>
            </div>
          </form>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Platform Grid — Pinterest Style */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-3">
            {PLATFORMS.map((p) => (
              <Link
                key={p.key}
                href={`/search?platform=${p.param}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200 group-hover:shadow-md`}>
                  <p.icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending — Infinite Photo Wall */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold mb-6">{t("hotDeals")}</h2>
          <ProductWall locale={locale} products={products} />
        </div>
      </section>
    </div>
  )
}
