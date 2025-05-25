import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { SidebarCart } from "@/components/sidebar-cart"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import { Providers } from "@/components/providers/Providers"
import "./globals.css"
import { ToogleDarkMode } from "@/components/dark-mode/toogle-dark-mode/ToogleDarkMode"
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Burger Dev",
  description: "Burger Dev es un menú digital moderno, diseñado para ofrecer una experiencia interactiva y sencilla a tus clientes.",
  keywords: [
    "menú digital",
    "hamburgueserías",
    "burgers",
    "burger dev",
    "menú interactivo",
    "experiencia del cliente",
    "digital menu",
    "restaurant menu",
    "food delivery",
  ],
  authors: [
    {
      name: "David Hilera",
      url: "https://davidhilera.dev",
    },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <SidebarCart />
          {children}
          <ToogleDarkMode />
          <ScrollToTop />
          <Toaster position="bottom-right" richColors />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
