'use server';

import { prisma } from '@/lib/prisma';

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!orders) return []

    return orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}
