'use server'

import { prisma } from '@/lib/prisma'
import { type Branch } from '@/lib/types'

export async function getBranches(): Promise<Branch[]> {
  try {
    const branchesData = await prisma.branch.findMany({})

    const branches = branchesData.map((branch) => ({
      ...branch,
      social: branch.social as Record<string, string | null> | undefined // casted because the type of social is Json
    }
    ))

    if (!branches) return []

    return branches
  } catch (error) {
    console.error('Error fetching branches:', error)
    return []
  }
}
