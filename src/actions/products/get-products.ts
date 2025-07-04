'use server'

import { prisma } from '@/lib/prisma'
import { type Product, type ProductOption } from '@/lib/types'

function groupOptionsByType(options: ProductOption[] = []) {
  return options.reduce<Record<string, ProductOption[]>>((acc, option) => {
    const type = option.type
    if (!acc[type]) acc[type] = []
    acc[type].push(option)
    return acc
  }, {})
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products: Product[] = await prisma.product.findMany({
      include: {
        options: true,
        category: true,
        branches: true
      },
      orderBy: [
        {
          category: {
            name: 'desc'
          }
        },
        {
          name: 'asc'
        }
      ]
    })

    if (!products) return []

    return products.map(p => ({
      ...p,
      groupedOptions: groupOptionsByType(p.options)
    }))
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return []
  }
}
