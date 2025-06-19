'use server'

import { prisma } from '@/lib/prisma'

export const getCategoryPromotion = async () => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: 'Promociones'
      }
    })

    if (!category) return null

    return category
  } catch (error) {
    console.error('Error fetching category promotion:', error)
    return null
  }
}
