import { getTranslations } from "next-intl/server"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ShoppingBag, Newspaper, Tv, Search, MessageCircle, Briefcase, Train, Laptop } from "lucide-react"

const SECTIONS = [
  {
    title_key: "china.portal.shopping",
    icon: ShoppingBag,
    color: "bg-orange-50",
    sites: [
      { name: "淘宝网", url: "https://www.taobao.com", desc: "China's largest marketplace" },
      { name: "京东", url: "https://www.jd.com", desc: "Electronics & premium brands" },
      { name: "拼多多", url: "https://www.pinduoduo.com", desc: "Group deals & daily essentials" },
      { name: "1688", url: "https://www.1688.com", desc: "Wholesale & factory direct" },
      { name: "小红书", url: "https://www.xiaohongshu.com", desc: "Lifestyle & shopping reviews" },
    ],
  },
  {
    title_key: "china.portal.news",
    icon: Newspaper,
    color: "bg-blue-50",
    sites: [
      { name: "CGTN", url: "https://www.cgtn.com", desc: "China Global Television Network" },
      { name: "China Daily", url: "https://www.chinadaily.com.cn", desc: "National English-language daily" },
      { name: "新华社", url: "https://english.news.cn", desc: "Xinhua News Agency (EN)" },
      { name: "环球时报", url: "https://www.globaltimes.cn", desc: "Global Times English edition" },
      { name: "人民日报", url: "http://en.people.cn", desc: "People's Daily online" },
    ],
  },
  {
    title_key: "china.portal.travel",
    icon: Train,
    color: "bg-green-50",
    sites: [
      { name: "12306", url: "https://www.12306.cn", desc: "Railway tickets official" },
      { name: "携程 Ctrip", url: "https://www.ctrip.com", desc: "Hotels, flights & tours" },
      { name: "去哪儿", url: "https://www.qunar.com", desc: "Travel deals & comparison" },
      { name: "马蜂窝", url: "https://www.mafengwo.cn", desc: "Travel guides & experiences" },
    ],
  },
  {
    title_key: "china.portal.search",
    icon: Search,
    color: "bg-purple-50",
    sites: [
      { name: "百度 Baidu", url: "https://www.baidu.com", desc: "China's #1 search engine" },
      { name: "搜狗 Sogou", url: "https://www.sogou.com", desc: "Search & input methods" },
      { name: "必应 Bing CN", url: "https://cn.bing.com", desc: "Microsoft search (China)" },
    ],
  },
  {
    title_key: "china.portal.social",
    icon: MessageCircle,
    color: "bg-pink-50",
    sites: [
      { name: "微信 WeChat", url: "https://www.wechat.com", desc: "Messaging, payments & more" },
      { name: "微博 Weibo", url: "https://www.weibo.com", desc: "China's Twitter-like platform" },
      { name: "抖音 Douyin", url: "https://www.douyin.com", desc: "Short videos & live shopping" },
      { name: "知乎 Zhihu", url: "https://www.zhihu.com", desc: "Q&A / knowledge platform" },
    ],
  },
  {
    title_key: "china.portal.biz",
    icon: Briefcase,
    color: "bg-amber-50",
    sites: [
      { name: "阿里巴巴国际站", url: "https://www.alibaba.com", desc: "Global B2B trade" },
      { name: "中国制造网", url: "https://www.made-in-china.com", desc: "Suppliers & manufacturers" },
      { name: "海关总署", url: "http://english.customs.gov.cn", desc: "Customs policies & tariffs" },
      { name: "商务部", url: "http://english.mofcom.gov.cn", desc: "Trade policies & regulations" },
    ],
  },
  {
    title_key: "china.portal.video",
    icon: Tv,
    color: "bg-indigo-50",
    sites: [
      { name: "B站 Bilibili", url: "https://www.bilibili.com", desc: "Anime, gaming & creator videos" },
      { name: "优酷 Youku", url: "https://www.youku.com", desc: "TV shows & movies" },
      { name: "腾讯视频 Tencent", url: "https://v.qq.com", desc: "Premium streaming" },
    ],
  },
  {
    title_key: "china.portal.tech",
    icon: Laptop,
    color: "bg-cyan-50",
    sites: [
      { name: "36氪", url: "https://36kr.com", desc: "Tech & startup news" },
      { name: "虎嗅 HUXIU", url: "https://www.huxiu.com", desc: "Business & tech commentary" },
      { name: "少数派 sspai", url: "https://sspai.com", desc: "Digital tools & productivity" },
    ],
  },
]

export default async function ChinaPortalPage() {
  const t = await getTranslations("china")

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">{t("portal.title")}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{t("portal.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SECTIONS.map((section) => (
          <Card key={section.title_key} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                <div className={`p-1.5 rounded-md ${section.color}`}>
                  <section.icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm">{t(section.title_key)}</h3>
              </div>
              <div className="space-y-2">
                {section.sites.map((site) => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group py-1 px-2 -mx-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {site.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                        {site.desc}
                      </span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
