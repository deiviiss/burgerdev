'use server';

import prisma from '@/lib/prisma';

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        User: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}
