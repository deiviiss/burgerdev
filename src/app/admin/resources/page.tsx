'use client'

import { motion } from 'framer-motion'
import { FileDown, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Variants for container animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

// Variants for child element animations
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function ContractPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-6 md:py-8 lg:py-10 flex justify-center">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto max-w-3xl space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Recursos
                </motion.h1>
                <motion.p
                  className="text-gray-500 md:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Recursos del menú digital
                </motion.p>
              </div>

              <motion.div
                className="rounded-lg border bg-card p-6 shadow-sm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-xl font-semibold mb-4">Archivos disponibles</h2>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center justify-between border-b pb-4"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="font-medium">Menú QR</p>
                        <p className="text-sm text-gray-500">Image - 245 KB</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild variant="outline" size="sm" className="gap-1">
                        <a href="/resources/menu-qr.jpg" download className="no-underline">
                          <FileDown className="h-4 w-4" />
                          Descargar
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between border-b pb-4"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="font-medium">Código QR</p>
                        <p className="text-sm text-gray-500">PDF - 13.1 KB</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild variant="outline" size="sm" className="gap-1">
                        <a href="/resources/qr-code.png" download className="no-underline">
                          <FileDown className="h-4 w-4" />
                          Descargar
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between border-b pb-4"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="font-medium">QR mesas 1 y 2</p>
                        <p className="text-sm text-muted-foreground">PDF - 222 KB</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild variant="outline" size="sm" className="gap-1">
                        <a href="/resources/mesa-qr-1-y-2.pdf" download className="no-underline">
                          <FileDown className="h-4 w-4" />
                          Descargar
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* <motion.div
                className="rounded-lg border bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold mb-4">Subir contrato firmado</h2>
                <div className="space-y-4">
                  <motion.div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
                    whileHover={{ borderColor: "#bae6fd", backgroundColor: "#f0f9ff" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-1">
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-10 w-10 text-gray-400"
                        whileHover={{ scale: 1.2, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </motion.svg>
                      <p className="text-sm text-gray-500">
                        Arrastra y suelta tu archivo aquí o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-gray-400">Soporta: PDF, JPG, PNG (Max. 10MB)</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">Subir documento</Button>
                  </motion.div>
                </div>
              </motion.div> */}

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild>
                    <Link href="/admin" className="flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Volver
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
