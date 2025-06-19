'use server'

import { prisma } from '@/lib/prisma'

export const getCategoryById = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    const category = await prisma.category.findUnique({
      where: { id }
    })

    if (!category) return { ok: false, message: 'Categoría no encontrada' }

    return category
  } catch (error) {
    console.error('Error fetching category by ID:', error)
    return { ok: false, message: 'Error al obtener la categoría' }
  }
}
