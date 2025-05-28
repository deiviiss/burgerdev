"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Trash2, MessageCircle } from "lucide-react"
import { useUiStore, useCartStore } from "@/store"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { createUpdateOrder } from "@/actions/create-order"
import { CartItemPayload, OrderStatus } from "@/lib/types"

export function SidebarCart() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  const [showSafariModal, setShowSafariModal] = useState(false)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const { isSideCartOpen, closeSideCart } = useUiStore()
  const { cart, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCartStore()

  // Close sidebar with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSideCart()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeSideCart])

  const handleWhatsAppCheckout = async () => {
    const data = new FormData()
    data.append("status", "PENDING" as OrderStatus)
    data.append("totalPrice", getSubtotal().toString())

    // Format items for form submission
    const items = cart.map<CartItemPayload>((item) => {
      const { categoryId, price, id } = item.product

      return {
        itemId: id,
        categoryId,
        quantity: item.quantity,
        unitPrice: price,
      }
    })
    data.append("items", JSON.stringify(items))

    const { ok, order } = await createUpdateOrder(data)

    if (!ok) {
      toast.error("Error al crear el pedido, intente de nuevo!", {
        position: "bottom-right",
      })
      return
    }

    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER // Business phone number
    let message = "🛒 *Nuevo Pedido*\n\n"

    // Add products to message
    cart.forEach((item) => {
      const price = item.product.price
      message += `*${item.quantity}x* ${item.product.name} - $${price.toFixed(2)}\n`
    })

    message += `\n*Total:* $${getSubtotal().toFixed(2)}\n`
    message += `\n*Código de verificación:* BD-${order?.shortId}\n\n`
    message += "¡Gracias por tu pedido! Por favor, presiona el botón de enviar mensaje para continuar."

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    if (!isSafari) {
      // Open WhatsApp with message
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")

      // Close sidebar after sending order
      closeSideCart()
    } else {
      setShowSafariModal(true)
      setPendingMessage(`https://wa.me/${phoneNumber}?text=${encodedMessage}`)
    }

  }

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId)
    toast.error(`${productName} eliminado del carrito`, {
      position: "bottom-right",
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast.error("Carrito vaciado", {
      position: "bottom-right",
    })
  }

  return (
    <>
      {/* Background overlay */}
      <AnimatePresence>
        {isSideCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeSideCart}
          />
        )}
      </AnimatePresence>

      {/* Cart sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[350px] bg-card shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          isSideCartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-semibold">Tu Carrito</h2>
            </div>
            <button
              onClick={closeSideCart}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingBag className="h-16 w-16 mb-4 opacity-30" />
                <p className="text-center">Tu carrito está vacío</p>
                <Button variant="link" className="mt-2 text-primary" onClick={closeSideCart}>
                  Continuar comprando
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <motion.li
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3 border-b pb-4"
                  >
                    {/* Product image */}
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="text-muted-foreground  hover:text-primary w-6 h-6 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="mx-2 w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-muted-foreground hover:text-primary w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and remove button */}
                    <div className="flex flex-col items-end">
                      <span className="font-medium text-sm">
                        ${((item.product.price) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="text-destructive/70 hover:text-destructive mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Summary and action buttons */}
          {cart.length > 0 && (
            <div className="border-t p-4">
              {/* Summary */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <Button onClick={handleWhatsAppCheckout} className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Pedir por WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="w-full text-destructive border-destructive bg-background hover:bg-destructive/10 hover:text-black dark:hover:text-destructive
                  "
                >
                  Vaciar carrito
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Safari modal */}
      {showSafariModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center space-y-4">
            <h3 className="text-lg font-semibold">Confirmar pedido</h3>
            <p className="text-sm text-muted-foreground">
              Tu pedido fue creado. Presiona el botón para abrir WhatsApp y enviarlo.
            </p>
            <div className="flex flex-col gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  if (pendingMessage) window.open(pendingMessage, "_blank")
                  setShowSafariModal(false)
                  setPendingMessage(null)
                  closeSideCart()
                }}
              >
                Enviar por WhatsApp
              </Button>
              <Button variant="outline" onClick={() => setShowSafariModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
