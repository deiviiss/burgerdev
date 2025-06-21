'use server'

import { prisma } from '@/lib/prisma'
import { type Order } from '@/lib/types'

export async function getOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!orders) return []

    return orders
  } catch (error) {
    return []
  }
}
