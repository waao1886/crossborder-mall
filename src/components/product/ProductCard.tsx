import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const PLATFORM_CONFIG: Record<string, { label: string; color: string }> = {
  JD: { label: "JD", color: "bg-red-500" },
  TAOBAO: { label: "Taobao", color: "bg-orange-500" },
  PINDUODUO: { label: "Pinduoduo", color: "bg-red-600" },
}

interface ProductCardProps {
  id: string
  title: string
  titleEn?: string | null
  translatedTitle?: string | null
  price: number
  imageUrl: string
  platform: string
  category?: string | null
  rating?: number | null
  salesCount?: number | null
  locale: string
}

export function ProductCard({
  id,
  title,
  titleEn,
  translatedTitle,
  price,
  imageUrl,
  platform,
  category,
  rating,
  salesCount,
  locale,
}: ProductCardProps) {
  const pc = PLATFORM_CONFIG[platform] || { label: platform, color: "bg-gray-500" }
  const displayTitle = translatedTitle || (locale === "en" && titleEn ? titleEn : title)

  return (
    <Link href={`/product/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full group">
        {/* Image */}
        <div className="aspect-square bg-muted relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={displayTitle}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            unoptimized
          />
          <Badge className={`absolute top-2 left-2 ${pc.color} text-white border-0`}>
            {pc.label}
          </Badge>
          {category && (
            <Badge variant="outline" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
          )}
        </div>

        <CardContent className="p-3 space-y-2">
          {/* Title */}
          <h3 className="text-sm font-medium line-clamp-2 leading-snug min-h-[2.5rem]">
            {displayTitle}
          </h3>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{rating}</span>
              {salesCount && (
                <span className="ml-1">
                  · {salesCount >= 10000 ? `${(salesCount / 10000).toFixed(1)}万` : salesCount} sold
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">¥</span>
            <span className="text-lg font-bold">{price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground ml-1">CNY</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
