'use server'

import { prisma } from '@/lib/prisma'

export const getProductById = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!product) return { ok: false, message: 'Producto no encontrado' }

    return product
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return { ok: false, message: 'Error al obtener el producto' }
  }
}
