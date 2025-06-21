'use server'

import { revalidatePath } from 'next/cache'
import { deleteImageFromCloudinary } from './delete-image-from-cloudinary'
import { getProductById } from './get-product-by-id'
import { prisma } from '@/lib/prisma'

export const deleteProduct = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    const product = await getProductById(id)

    await prisma.$transaction(async (tx) => {
      await tx.productOption.deleteMany({
        where: {
          productId: id
        }
      })

      await tx.product.delete({ where: { id } })

      return { ok: true, message: 'Producto y opciones eliminados correctamente' }
    })

    revalidatePath('/admin/products')

    if (('image' in product)) {
      const { ok } = await deleteImageFromCloudinary(product.image as string)
      if (!ok) {
        return { ok: true, message: 'Producto eliminado correctamente, cloudinary no pudo eliminar la imagen' }
      }
    }

    return { ok: true, message: 'Producto eliminado' }
  } catch (error) {
    return { ok: false, message: 'Error al eliminar el producto' }
  }
}
