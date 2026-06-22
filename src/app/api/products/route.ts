import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const platform = searchParams.get("platform") || ""
    const category = searchParams.get("category") || ""
    const minPrice = parseFloat(searchParams.get("minPrice") || "0")
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "0")
    const sort = searchParams.get("sort") || "sales"
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12")))

    const where: Record<string, unknown> = {}

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { titleEn: { contains: query } },
        { description: { contains: query } },
      ]
    }
    if (platform) where.platform = platform
    if (category) where.category = category
    if (minPrice > 0 && maxPrice > 0) {
      where.price = { gte: minPrice, lte: maxPrice }
    } else if (minPrice > 0) {
      where.price = { gte: minPrice }
    } else if (maxPrice > 0) {
      where.price = { lte: maxPrice }
    }

    const orderBy: Record<string, string> = {}
    switch (sort) {
      case "price_asc": orderBy.price = "asc"; break
      case "price_desc": orderBy.price = "desc"; break
      case "rating": orderBy.rating = "desc"; break
      case "sales":
      default: orderBy.salesCount = "desc"; break
    }

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          platform: true,
          title: true,
          titleEn: true,
          price: true,
          imageUrl: true,
          category: true,
          rating: true,
          salesCount: true,
        },
      }),
      db.product.count({ where }),
    ])

    // Get distinct categories for filters
    const categories = await db.product.findMany({
      select: { category: true },
      distinct: ["category"],
      where: platform ? { platform } : {},
    })

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      categories: categories.map((c) => c.category).filter(Boolean),
    })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
