import { NextRequest, NextResponse } from "next/server"
import { translateProduct } from "@/lib/translation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, language } = body

    if (!productId || !language) {
      return NextResponse.json(
        { error: "Missing productId or language" },
        { status: 400 }
      )
    }

    const result = await translateProduct(productId, language)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Translate API error:", error)
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    )
  }
}
