'use server'

import { z } from "zod";
import { generateUniqueShortId } from "@/actions/generate-unique-short-id";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@/lib/types";

// Zod schema for order creation
const createOrderSchema = z.object({
  id: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  totalPrice: z.number().min(0, "El total no puede ser negativo"),
  comment: z.string().optional(),
  items: z.array(
    z.object({
      itemId: z.string(),
      categoryId: z.string(),
      quantity: z.number().min(1),
      unitPrice: z.number().min(0),
    })
  ).min(1, "Debe haber al menos un producto en el pedido")
});

const PROMO_CATEGORY_ID = "8"

export const createUpdateOrder = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const dataParsed = {
    ...data,
    status: data.status as OrderStatus,
    totalPrice: parseFloat(data.totalPrice.toString()),
    items: JSON.parse(formData.get("items") as string) as {
      itemId: string
      categoryId: string
      quantity: number
      unitPrice: number
    }[]
  }

  const orderParsed = createOrderSchema.safeParse(dataParsed);

  if (!orderParsed.success) {
    return {
      ok: false,
      message: 'Datos inválidos',
    }
  }

  const { address, status, totalPrice, comment, items, id } = orderParsed.data

  try {
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
        message: "Pedido actualizado con éxito",
        order: orderUpdated
      }
    }

    const generatedShortId = await generateUniqueShortId()

    const order = await prisma.order.create({
      data: {
        shortId: generatedShortId,
        totalPrice,
        address: address ? address : '',
        status: 'PENDING',
        createdAt: new Date(),
      }
    })

    await prisma.orderItem.createMany({
      data: items.map((item) => ({
        orderId: order.id,
        productId: item.categoryId?.toString() !== PROMO_CATEGORY_ID
          ? item.itemId
          : undefined,
        promotionId: item.categoryId?.toString() === PROMO_CATEGORY_ID
          ? item.itemId
          : undefined,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });

    return {
      ok: true,
      message: "Pedido creado con éxito",
      order
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.errors[0].message,
      }
    }

    return {
      ok: false,
      message: "Ocurrió un error inesperado, por favor intente de nuevo",
    }
  }
}