'use server'

import { prisma } from '@/lib/prisma'
import { type EventLog } from '@/lib/types'

const EVENT_TYPE_LABELS: Record<string, string> = {
  visit_menu: 'Visita al menú',
  add_to_cart: 'Agregó al carrito',
  order_completed: 'Pedido completado',
  form_delivery_completed: 'Formulario de entrega completado',
  form_pickup_completed: 'Formulario para recoger completado',
  view_resume: 'Vista de resumen',
  click_whatsapp: 'Click en WhatsApp',
  view_product: 'Vista de producto'
}

export async function getEvents({ page }: { page: number }): Promise<{ events: EventLog[], totalPages: number }> {
  const PAGE_SIZE = 20
  const skip = (page - 1) * PAGE_SIZE
  try {
    const [events, total] = await Promise.all([
      prisma.eventLog.findMany({
        include: {
          product: true,
          promotion: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: PAGE_SIZE
      }),
      prisma.eventLog.count()
    ])

    const totalPages = Math.ceil(total / PAGE_SIZE)

    const safeEvents = events.map(e => ({
      ...e,
      metadata:
        e.metadata && typeof e.metadata === 'object' && !Array.isArray(e.metadata)
          ? e.metadata
          : {},
      type: EVENT_TYPE_LABELS[e.type] ?? e.type
    }))

    return { events: safeEvents, totalPages }
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    return { events: [], totalPages: 0 }
  }
}
