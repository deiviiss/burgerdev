'use server'

import { prisma } from '@/lib/prisma'

export const getPromotionById = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!promotion) return { ok: false, message: 'Promoción no encontrada' }

    return promotion
  } catch (error) {
    console.error('Error fetching promotion by ID:', error)
    return { ok: false, message: 'Error al obtener la promoción' }
  }
}
