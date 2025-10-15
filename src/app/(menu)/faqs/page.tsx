'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const faqSections = [
  {
    title: 'Costo',
    question: '¿Cuánto cuesta el menú digital con esta versión?',
    answer: 'El costo es **$1,999 MXN** por un **pago único**, incluye todo lo que mostramos: menú, carrito, pedido por WhatsApp, link y QR activos, y el mapa para que el cliente indique su ubicación.'
  },
  {
    title: 'Implementación / Tiempo de entrega',
    question: '¿Cuánto tarda en estar listo el menú?',
    answer: 'Normalmente se entrega en 3 **a 5 días hábiles** después de recibir toda la información de productos, imágenes y datos del negocio.'
  },
  {
    title: 'Soporte y mantenimiento',
    question: '¿Incluye soporte después de entregarlo?',
    answer: 'Incluye **soporte básico** para la implementación y dudas iniciales. Si necesitan cambios o mejoras futuras, se puede cotizar aparte.'
  },
  {
    title: 'Funcionalidades',
    question: '¿Se pueden agregar más cosas después?',
    answer: 'Sí, pero cada funcionalidad extra se cotiza de forma **adicional**. Esto garantiza que tu menú actual funcione siempre de manera estable.'
  },
  {
    title: 'Cuenta y despliegue',
    question: '¿Dónde estará alojado el menú?',
    answer: 'Se despliega en **su propia cuenta de Vercel**. Hacemos toda la configuración y luego se le entregan las credenciales para que puedan acceder.'
  },
  {
    title: 'Migraciones o cambios futuros',
    question: '¿Qué pasa si quiero actualizar algo más adelante?',
    answer: 'Cada menú es independiente. Si quieres migrar a nuevas funcionalidades, se puede hacer mediante un **upgrade o actualización paga**.'
  }
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className="sticky top-0 z-20 w-full border-b bg-background"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
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
                  Preguntas Frecuentes
                </motion.h1>
                <motion.p
                  className="text-muted-foreground md:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Resolvemos las dudas más comunes sobre nuestro menú digital
                </motion.p>
              </div>

              <motion.div className="space-y-6">
                {faqSections.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-secondary bg-background p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h2 className="text-xl font-semibold text-primary mb-2">{faq.title}</h2>
                    <h3 className="text-lg font-medium text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex justify-center pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
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
