"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ProductCard } from "@/components/product/ProductCard"

interface ProductData {
  id: string
  title: string
  titleEn: string | null
  price: number
  imageUrl: string
  platform: string
  category: string | null
  rating: number | null
  salesCount: number | null
}

export function ProductWall({ locale }: { locale: string }) {
  const [products, setProducts] = useState<ProductData[]>([])
  const [displayCount, setDisplayCount] = useState(12)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data: ProductData[]) => {
        const sorted = data.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
        setProducts(sorted)
        setHasMore(sorted.length > 12)
      })
      .catch(() => setProducts([]))
  }, [])

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => {
      const next = prev + 12
      setHasMore(next < products.length)
      return Math.min(next, products.length)
    })
  }, [products.length])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMore()
        }
      },
      { rootMargin: "300px" }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  const displayedProducts = products.slice(0, displayCount)

  if (products.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            titleEn={product.titleEn}
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
      {hasMore && <div ref={sentinelRef} className="h-4" />}
    </>
  )
}
