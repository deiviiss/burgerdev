'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { productSchema } from '@/schemas/product.schema'

export const createUpdateProduct = async (formData: FormData) => {
  const rawData = Object.fromEntries(formData)

  const data = {
    ...rawData,
    price: rawData.price ? Number(rawData.price) : 0,
    isAvailable: rawData.isAvailable === 'true',
    options: rawData.options ? JSON.parse(formData.get('options') as string) : []
  }

  const parsed = productSchema.safeParse(data)

  if (!parsed.success) {
    return { ok: false, message: 'Datos inválidos' }
  }

  const { id, name, description, price, image, categoryId, isAvailable, options } = parsed.data

  try {
    const product = id
      ? await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          image,
          categoryId,
          isAvailable,
          options: {
            deleteMany: {},
            createMany: {
              data: options || []
            }
          }
        }
      })
      : await prisma.product.create({
        data: {
          name,
          description: description || '',
          price,
          image,
          categoryId,
          isAvailable,
          options: {
            createMany: {
              data: options || []
            }
          }
        }
      })

    revalidatePath('/admin')
    revalidatePath('/')

    return { ok: true, message: id ? 'Producto actualizado' : 'Producto creado', product }
  } catch (error) {
    return { ok: false, message: 'Error al guardar el producto' }
  }
}
