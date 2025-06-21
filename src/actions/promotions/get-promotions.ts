'use server'

import { prisma } from '@/lib/prisma'
import { type Promotion } from '@/lib/types'

export async function getPromotions(options?: { onlyActive?: boolean }): Promise<Promotion[]> {
  const { onlyActive = true } = options || {}

  try {
    const promotions: Promotion[] = await prisma.promotion.findMany({
      where: onlyActive ? { isActive: true } : undefined // Get only active promotions by default
    })

    return promotions ?? []
  } catch (error) {
    console.error('Error al obtener promociones:', error)
    return []
  }
}
