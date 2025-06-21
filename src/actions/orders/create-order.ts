'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getCategoryPromotion } from '@/actions/categories/get-category-promotion'
import { generateUniqueShortId } from '@/actions/orders/generate-unique-short-id'
import { prisma } from '@/lib/prisma'
import { type OrderStatus } from '@/lib/types'
import { orderSchema } from '@/schemas/order.schema'

export const createUpdateOrder = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const dataParsed = {
    ...data,
    status: data.status as OrderStatus,
    totalPrice: typeof data.totalPrice === 'string' ? parseFloat(data.totalPrice) : 0,
    items: JSON.parse(formData.get('items') as string) as Array<{
      itemId: string
      categoryId: string
      quantity: number
      unitPrice: number
    }>
  }

  const orderParsed = orderSchema.safeParse(dataParsed)

  if (!orderParsed.success) {
    return {
      ok: false,
      message: 'Datos inválidos'
    }
  }

  const { address, status, totalPrice, comment, items, id } = orderParsed.data

  try {
    const categoryPromotion = await getCategoryPromotion()

    if (!categoryPromotion) {
      return {
        ok: false,
        message: 'No se encontró la categoría de promociones'
      }
    }

    if (id) {
      const orderUpdated = await prisma.order.update({
        where: {
          id
        },
        data: {
          address,
          totalPrice,
          comment,
          status: status as OrderStatus
        }
      })

      revalidatePath(`/admin/orders/${id}`)

      return {
        ok: true,
        message: 'Pedido actualizado con éxito',
        order: orderUpdated
      }
    }

    const generatedShortId = await generateUniqueShortId()

    const order = await prisma.order.create({
      data: {
        shortId: generatedShortId,
        totalPrice,
        address: address || '',
        status: 'PENDING',
        createdAt: new Date()
      }
    })

    await prisma.orderItem.createMany({
      data: items.map((item) => ({
        orderId: order.id,
        productId: item.categoryId?.toString() !== categoryPromotion.id
          ? item.itemId
          : undefined,
        promotionId: item.categoryId?.toString() === categoryPromotion.id
          ? item.itemId
          : undefined,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    })

    return {
      ok: true,
      message: 'Pedido creado con éxito',
      order
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.errors[0].message
      }
    }

    return {
      ok: false,
      message: 'Ocurrió un error inesperado, por favor intente de nuevo'
    }
  }
}
