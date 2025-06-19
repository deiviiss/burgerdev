'use server'

import { prisma } from "@/lib/prisma"
import { Product, ProductOption } from "@/lib/types"

function groupOptionsByType(options: ProductOption[] = []) {
  return options.reduce((acc, option) => {
    const type = option.type
    if (!acc[type]) acc[type] = []
    acc[type].push(option)
    return acc
  }, {} as Record<string, ProductOption[]>)
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products: Product[] = await prisma.product.findMany({
      include: {
        options: true,
        category: true
      },
      orderBy: [
        {
          category: {
            name: "asc"
          },
        },
        {
          name: "asc",
        },
      ]
    })

    if (!products) return []

    return products.map(p => ({
      ...p,
      groupedOptions: groupOptionsByType(p.options)
    }))
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}