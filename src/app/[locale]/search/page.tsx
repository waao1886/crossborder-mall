"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductCard } from "@/components/product/ProductCard"
import { Search, X, Loader2, SlidersHorizontal } from "lucide-react"

const PLATFORMS = ["", "JD", "TAOBAO", "PINDUODUO", "ALIBABA", "DOUYIN", "SUNING", "VIPSHOP", "DANGDANG", "MEITUAN"]
const SORT_OPTIONS = [
  { value: "sales", label: "sortSales" },
  { value: "price_asc", label: "sortPriceLow" },
  { value: "price_desc", label: "sortPriceHigh" },
  { value: "rating", label: "sortRating" },
]

interface Product {
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

function SearchContent() {
  const searchParams = useSearchParams()
  const t = useTranslations("search")

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "")
  const [platform, setPlatform] = useState(searchParams.get("platform") || "")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("sales")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const limit = 12

  // Load all products once from static JSON
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setAllProducts(data)
        // extract unique categories
        const cats = Array.from(new Set(data.map((p) => p.category).filter(Boolean))) as string[]
        setCategories(cats.sort())
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Client-side filter/sort/paginate
  useEffect(() => {
    if (allProducts.length === 0) return

    let filtered = [...allProducts]

    if (query) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.titleEn && p.titleEn.toLowerCase().includes(q))
      )
    }

    if (platform) {
      filtered = filtered.filter((p) => p.platform === platform)
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }

    // Sort
    switch (sort) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "sales":
      default:
        filtered.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
        break
    }

    setTotal(filtered.length)
    setTotalPages(Math.max(1, Math.ceil(filtered.length / limit)))

    const start = (page - 1) * limit
    setProducts(filtered.slice(start, start + limit))
  }, [allProducts, query, platform, category, sort, page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(searchInput)
    setPage(1)
  }

  const clearFilters = () => {
    setSearchInput("")
    setQuery("")
    setPlatform("")
    setCategory("")
    setSort("sales")
    setPage(1)
  }

  const hasFilters = query || platform || category

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("placeholder")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
          <Button
            type="button"
            variant={showFilters ? "secondary" : "outline"}
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 border rounded-lg bg-card">
          <div className="flex flex-wrap items-center gap-4">
            {/* Platform Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{t("platform")}:</span>
              <div className="flex gap-1">
                {PLATFORMS.map((p) => (
                  <Badge
                    key={p || "all"}
                    variant={platform === p ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => { setPlatform(p); setPage(1) }}
                  >
                    {p || t("allPlatforms")}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">{t("category")}:</span>
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => { setCategory(category === cat ? "" : cat); setPage(1) }}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            )}

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium text-muted-foreground">{t("sortBy")}:</span>
              <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1) }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasFilters && (
            <div className="mt-3 pt-3 border-t">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="h-3 w-3" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Info */}
      {!loading && (
        <div className="mb-4 text-sm text-muted-foreground">
          {total} {t("results")}
          {query && <> for &quot;{query}&quot;</>}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Product Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
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
              locale="en"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-4">{t("noResults")}</p>
          {hasFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum: number
            if (totalPages <= 7) {
              pageNum = i + 1
            } else if (page <= 4) {
              pageNum = i + 1
            } else if (page >= totalPages - 3) {
              pageNum = totalPages - 6 + i
            } else {
              pageNum = page - 3 + i
            }
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
