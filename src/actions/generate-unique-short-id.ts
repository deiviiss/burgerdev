'use server'
// import { prisma } from '@/lib/prisma'

export const generateUniqueShortId = async (): Promise<string> => {

  const generate = () => {
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    const datePart = new Date().getSeconds().toString().padStart(2, '0') // something a bit more dynamic than just the last 2 digits of the timestamp
    return `${randomPart}${datePart}`
  }

  for (let i = 0; i < 5; i++) {
    const shortId = generate()
    // const exists = await prisma.order.findUnique({ where: { shortId } })

    const exists = false
    if (!exists) return shortId
  }

  throw new Error('No se pudo generar un shortId único después de varios intentos')
}
