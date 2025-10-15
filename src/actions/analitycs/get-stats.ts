'use server'

import { prisma } from '@/lib/prisma'

export async function getStats() {
  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 7)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  try {
    // Get all events for calculations
    const events = await prisma.eventLog.findMany({
      include: {
        product: true
      },
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })

    // Calculate metrics
    const uniqueVisits = events.filter(e => e.type === 'visit_menu').length
    const productsAddedToCart = events.filter(e => e.type === 'add_to_cart').length
    const pickupOrders = events.filter(e => e.type === 'form_pickup_completed').length
    const deliveryOrders = events.filter(e => e.type === 'form_delivery_completed').length
    const completedOrders = pickupOrders + deliveryOrders

    // Get unique visitors by checking unique metadata.userAgent + createdAt combinations
    const activeUsers = new Set(
      events
        .filter(e => e.type === 'visit_menu')
        .map(e => {
          const metadata = e.metadata as { userAgent?: string }
          return `${metadata.userAgent}-${e.createdAt.toISOString().split('T')[0]}`
        })
    ).size

    // Calculate payment methods stats
    const paymentMethodsStats = events.filter(e => e.type === 'form_pickup_completed' || e.type === 'form_delivery_completed').reduce<Record<string, { count: number, total: number }>>((acc, event) => {
      const metadata = event.metadata as { payment?: string }
      const method = metadata.payment || ''

      if (!acc[method]) {
        acc[method] = { count: 0, total: 0 }
      }
      acc[method].count += 1
      acc[method].total += 1
      return acc
    }, {})

    const paymentMethods = Object.entries(paymentMethodsStats)
      .map(([method, stats]) => ({
        method,
        count: stats.count,
        percentage: (stats.count / completedOrders) * 100
      }))
      .sort((a, b) => b.count - a.count)

    // Calculate top products added to cart
    const productCounts = events.filter(e => e.type === 'add_to_cart' && e.product).reduce<Record<string, number>>((acc, event) => {
      const productName = event.product?.name || ''
      acc[productName] = (acc[productName] || 0) + 1
      return acc
    }, {})

    const topProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    return {
      uniqueVisits,
      productsAddedToCart,
      pickupOrders,
      deliveryOrders,
      completedOrders,
      activeUsers,
      paymentMethods,
      topProducts
    }
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    return {
      uniqueVisits: 0,
      productsAddedToCart: 0,
      cartAbandonment: 0,
      completedOrders: 0,
      activeUsers: 0,
      conversionRate: 0,
      topProducts: [],
      averageCartSize: 0
    }
  }
}
