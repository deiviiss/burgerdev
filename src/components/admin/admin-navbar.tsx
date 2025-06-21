'use client'

import { motion } from 'framer-motion'
import { LucideFolderDown, Sandwich } from 'lucide-react'
import Link from 'next/link'
import { ButtonLogout } from '@/components/auth/ButtonLogout'
import { Button } from '@/components/ui/button'

export function NavbarAdmin() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1"
          >
            <Sandwich className="w-6 h-6 text-primary" />
            <Link href="/" className="text-xl font-bold text-primary">
              {companyName}
            </Link>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild >
              <Link href="/admin/resources">
                <LucideFolderDown className="h-5 w-5" />
                <span className="hidden sm:inline">Recursos</span>
              </Link>
            </Button>

            <ButtonLogout name="Salir" />
          </div>
        </div>
      </div>
    </header>
  )
}
