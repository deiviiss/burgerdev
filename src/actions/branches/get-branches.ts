'use server'

import { prisma } from '@/lib/prisma'
import { type Branch } from '@/lib/types'

export async function getBranches(): Promise<Branch[]> {
  try {
    const branches = await prisma.branch.findMany({})

    if (!branches) return []

    return branches
  } catch (error) {
    console.error('Error fetching branches:', error)
    return []
  }
}
