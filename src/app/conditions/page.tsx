"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const conditions = [
  {
    title: "1. Uso del Menú Digital (Demostración)",
    items: [
      "Este sitio web permite visualizar un menú digital de demostración y simular un pedido que será enviado por WhatsApp.",
      "El pedido generado no corresponde a una compra real, y no será procesado por ningún negocio.",
      "El mensaje generado incluye productos de ejemplo y debe ser enviado manualmente por el usuario.",
      "El objetivo de esta demostración es mostrar cómo funcionaría el sistema en un caso real.",
    ],
  },
  {
    title: "2. Modificación de Pedidos",
    items: [
      "Si el usuario modifica el mensaje generado (como cambiar productos, precios o cantidades), se pierde la validez del proceso de demostración.",
      "La experiencia completa solo se garantiza si el mensaje enviado coincide con el generado por el sistema.",
    ],
  },
  {
    title: "3. Responsabilidad Limitada",
    items: [
      "Este sitio no garantiza la entrega de productos ni la confirmación de ningún pedido realizado durante la demostración.",
      "La demo es solo una herramienta visual e interactiva para mostrar el funcionamiento del menú digital.",
      "El servicio puede estar sujeto a interrupciones técnicas o fallas temporales fuera de nuestro control.",
    ],
  }
]

export default function CompleteConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className="sticky top-0 z-20 w-full border-b bg-background"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container flex h-16 items-center px-4 md:px-6">
          <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2 text-primary">
              <ArrowLeft className="h-4 w-4" />
              Volver a inicio
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto max-w-3xl space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Términos y Condiciones
                </motion.h1>
                <motion.p
                  className="text-muted-foreground md:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Consulta las condiciones de uso del menú digital
                </motion.p>
              </div>

              <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                {conditions.map((section, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <motion.h2 className="text-xl font-semibold text-primary mb-2" whileHover={{ x: 5 }}>
                      {section.title}
                    </motion.h2>
                    <motion.ul className="list-disc pl-6 space-y-2 text-foreground">
                      {section.items.map((item, idx) => (
                        <motion.li key={idx} variants={itemVariants} whileHover={{ x: 5 }}>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="flex justify-center pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.8 }}>
                <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/" className="text-primary hover:text-primary/80 flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la página principal
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
