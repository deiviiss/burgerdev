'use server'

import prisma from "@/lib/prisma"
import { Promotion } from "@/lib/types"

export async function getPromotions(): Promise<Promotion[]> {
  try {
    const promotions = await prisma.promotion.findMany({})

    return promotions
  } catch (error) {
    console.error("Error al obtener promociones:", error)
    return []
  }
}