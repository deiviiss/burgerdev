'use server'

import { prisma } from '@/lib/prisma'
import { type Promotion } from '@/lib/types'

export async function getPromotions(): Promise<Promotion[]> {
  try {
    const promotions: Promotion[] = await prisma.promotion.findMany({
      where: {
        isActive: true // Get only active promotions
      }
    })

    if (!promotions) return []

    return promotions
  } catch (error) {
    console.error('Error al obtener promociones:', error)
    return []
  }
}
