import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCategoryPromotion } from '@/actions/categories/get-category-promotion'
import { prisma } from '@/lib/prisma'

// Validation schema for event logging
const eventLogSchema = z.object({
  type: z.string(), // Event type
  productId: z.string().optional(), // Related product ID (optional)
  categoryId: z.string().optional(), // Related category ID (optional)
  metadata: z.any().optional() // Additional details (optional)
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = eventLogSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.errors }, { status: 400 })
    }

    const { type, productId, metadata, categoryId } = parsed.data
    const categoryPromotion = await getCategoryPromotion()

    if (!categoryPromotion) {
      return {
        ok: false,
        message: 'No se encontró la categoría de promociones'
      }
    }

    const event = await prisma.eventLog.create({
      data: {
        type,
        productId: categoryId?.toString() !== categoryPromotion.id ? productId : undefined,
        promotionId: categoryId?.toString() === categoryPromotion.id ? productId : undefined,
        metadata
      }
    })

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error('Error al registrar evento:', error)
    // Here you can decide if you want to send a generic error or more details
    return NextResponse.json({ error: 'Error al registrar el evento', details: error }, { status: 500 })
  }
}
