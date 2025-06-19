'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { deleteImageFromCloudinary } from '../products/delete-image-from-cloudinary'
import { getPromotionById } from '@/actions/promotions/get-promotion-by-id'

export const deletePromotion = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    const promo = await getPromotionById(id)

    if (!promo) {
      return { ok: false, message: 'No se pudo encontrar la promoción' }
    }

    const promoDeleted = await prisma.promotion.delete({ where: { id } })

    if (!promoDeleted) {
      return { ok: false, message: 'No se pudo eliminar la promoción' }
    }

    revalidatePath('/admin/promotions')

    if (('image' in promo)) {
      const { ok } = await deleteImageFromCloudinary(promo.image)
      if (!ok) {
        return { ok: true, message: 'Producto eliminado correctamente, cloudinary no pudo eliminar la imagen' }
      }
    }

    return { ok: true, message: 'Promoción eliminada' }
  } catch (error) {
    return { ok: false, message: 'Error al eliminar la promoción' }
  }
}
