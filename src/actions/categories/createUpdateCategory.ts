'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  image: z.string().url('La URL de la imagen no es válida').optional().nullable()
})

export const createUpdateCategory = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const parsed = categorySchema.safeParse(data)

  if (!parsed.success) {
    return { ok: false, message: 'Datos inválidos' }
  }

  const { id, name, image } = parsed.data

  try {
    const category = id
      ? await prisma.category.update({ where: { id }, data: { name, image: image ?? undefined } })
      : await prisma.category.create({ data: { name, image: image ?? undefined } })

    revalidatePath('/admin')
    revalidatePath('/')

    return { ok: true, message: id ? 'Categoría actualizada' : 'Categoría creada', category }
  } catch (error) {
    return { ok: false, message: 'Error al guardar la categoría' }
  }
}
