'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export const deleteCategory = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    await prisma.category.delete({ where: { id } })

    revalidatePath('/admin/categories')

    return { ok: true, message: 'Categoría eliminada' }
  } catch (error) {
    return { ok: false, message: 'Error al eliminar la categoría' }
  }
}
