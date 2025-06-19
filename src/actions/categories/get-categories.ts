'use server'

import { prisma } from "@/lib/prisma";
import { Category } from "@/lib/types"

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          not: "Promociones"
        }
      }
    })

    if (!categories) return []

    return categories
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return []
  }
}