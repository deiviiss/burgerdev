'use server'

import { prisma } from '@/lib/prisma'
import { type Category } from '@/lib/types'

export const getCategoryPromotion = async (): Promise<Category | null> => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: 'Promociones'
      }
    })

    if (!category) return null

    return category
  } catch (error) {
    return null
  }
}
