import { PrismaClient } from "@prisma/client"
import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany({
    orderBy: { salesCount: "desc" },
    select: {
      id: true,
      title: true,
      titleEn: true,
      price: true,
      imageUrl: true,
      platform: true,
      category: true,
      rating: true,
      salesCount: true,
    },
  })

  const outDir = join(__dirname, "..", "public", "data")
  mkdirSync(outDir, { recursive: true })
  
  const outPath = join(outDir, "products.json")
  writeFileSync(outPath, JSON.stringify(products))
  console.log(`Exported ${products.length} products to ${outPath}`)
  
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error("Export failed:", e)
  process.exit(1)
})
