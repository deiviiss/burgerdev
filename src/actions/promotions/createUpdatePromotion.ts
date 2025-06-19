'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { promotionSchema } from '@/schemas/promotion.schema'

export const createUpdatePromotion = async (formData: FormData) => {
  const rawData = Object.fromEntries(formData)

  const data = {
    ...rawData,
    discountPercentage: rawData.discountPercentage ? Number(rawData.discountPercentage) : 0,
    promoPrice: rawData.promoPrice ? Number(rawData.promoPrice) : 0,
    originalPrice: rawData.originalPrice ? Number(rawData.originalPrice) : 0,
    isActive: rawData.isActive === 'true'
  }

  const parsed = promotionSchema.safeParse(data)

  if (!parsed.success) {
    return { ok: false, message: 'Datos inválidos' }
  }

  const {
    id,
    name,
    description,
    discountPercentage,
    originalPrice,
    promoPrice,
    image,
    isActive,
    categoryId
  } = parsed.data

  try {
    const promotion = id
      ? await prisma.promotion.update({
        where: { id },
        data: {
          name,
          description,
          discountPercentage,
          originalPrice,
          promoPrice,
          image,
          isActive,
          categoryId
        }
      })
      : await prisma.promotion.create({
        data: {
          name,
          description,
          discountPercentage,
          originalPrice,
          promoPrice,
          image,
          isActive,
          categoryId
        }
      })

    revalidatePath('/admin')
    revalidatePath('/')

    return { ok: true, message: id ? 'Promoción actualizada' : 'Promoción creada', promotion }
  } catch (error) {
    return { ok: false, message: 'Error al guardar la promoción' }
  }
}
