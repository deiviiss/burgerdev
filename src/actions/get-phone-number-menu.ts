'use server'
import prisma from '@/lib/prisma'

export async function getPhoneNumberMenu() {
  try {
    const phoneNumberDB = await prisma.phoneNumberMenu.findFirst({
      where: {
        isActive: true
      }
    })

    const phoneNumber = phoneNumberDB?.number || null

    if (!phoneNumber) {
      return null
    }

    return phoneNumber
  } catch (error) {
    console.error('Error fetching phone number:', error)
    return null
  }
}