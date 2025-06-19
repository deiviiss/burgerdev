import { Navbar } from "@/components/navbar"
import { SidebarCart } from "@/components/sidebar-cart"
import { Footer } from "@/components/footer"

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <SidebarCart />
      {children}
      <Footer />
    </>
  )
}
