import { getTranslations } from "next-intl/server"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Headphones, Plane, ExternalLink, Globe, ShieldCheck, MessageCircle, Map, Ship } from "lucide-react"

const SERVICES = {
  logistics: {
    title_key: "services.logistics.title",
    icon: Truck,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    items: [
      { name: "SF International", desc: "顺丰国际 — 全球220+国家", url: "https://www.sf-international.com", icon: Truck },
      { name: "Cainiao Global", desc: "菜鸟国际 — 阿里系物流网络", url: "https://www.cainiao.com", icon: Globe },
      { name: "EMS ePacket", desc: "中国邮政 — 经济小包直达", url: "https://www.ems.com.cn", icon: Ship },
      { name: "4PX Express", desc: "递四方 — 东南亚专线", url: "https://www.4px.com", icon: Truck },
    ],
  },
  agent: {
    title_key: "services.agent.title",
    icon: Headphones,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    items: [
      { name: "Superbuy", desc: "代购专家 — 帮你淘宝京东下单", url: "https://www.superbuy.com", icon: MessageCircle },
      { name: "Wegobuy", desc: "跨境代购 — 质检+合包寄送", url: "https://www.wegobuy.com", icon: ShieldCheck },
      { name: "Panda Buddy", desc: "中文客服协助 — 解决售后争议", url: "#", icon: Headphones },
    ],
  },
  travel: {
    title_key: "services.travel.title",
    icon: Plane,
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    items: [
      { name: "Trip.com", desc: "携程国际 — 酒店/机票/火车票", url: "https://www.trip.com", icon: Plane },
      { name: "Ctrip Tours", desc: "中国旅行团 — 定制游/跟团游", url: "https://vacations.ctrip.com", icon: Map },
      { name: "China Discovery", desc: "中国探索 — 私人导游/小众路线", url: "https://www.chinadiscovery.com", icon: Map },
    ],
  },
} as const

export default async function ServicesPage() {
  const t = await getTranslations("services")

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">{t("title")}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{t("subtitle")}</p>
      </div>

      <div className="space-y-10">
        {Object.entries(SERVICES).map(([key, section]) => (
          <section key={key}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2 rounded-lg ${section.color}`}>
                <section.icon className={`h-5 w-5 ${section.iconColor}`} />
              </div>
              <h2 className="text-xl font-semibold">{t(section.title_key)}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className={`h-full border ${section.color} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
