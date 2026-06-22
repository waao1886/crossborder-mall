import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/ProductCard"
import { ShoppingBag, Monitor, ShoppingCart, Truck, Smartphone, Store, Gift, BookOpen, Coffee } from "lucide-react"
import { db } from "@/lib/db"

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
  const needTranslate = locale !== "en" && locale !== "zh"

  const hotProducts = await db.product.findMany({
    orderBy: { salesCount: "desc" },
    take: 12,
    select: {
      id: true, platform: true, title: true, titleEn: true,
      price: true, imageUrl: true, category: true, rating: true, salesCount: true,
    },
  })

  const productIds = hotProducts.map((p) => p.id)
  const translations = new Map<string, string>()
  if (needTranslate) {
    const cached = await db.productTranslation.findMany({
      where: { productId: { in: productIds }, language: locale },
      select: { productId: true, title: true },
    })
    for (const c of cached) translations.set(c.productId, c.title)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-10 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
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

      {/* Hot Deals — Photo Wall */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{t("hotDeals")}</h2>
            <Link href="/search">
              <Button variant="outline" size="sm">{t("viewAll")} →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {hotProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                titleEn={product.titleEn}
                translatedTitle={translations.get(product.id)}
                price={product.price}
                imageUrl={product.imageUrl}
                platform={product.platform}
                category={product.category}
                rating={product.rating}
                salesCount={product.salesCount}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
