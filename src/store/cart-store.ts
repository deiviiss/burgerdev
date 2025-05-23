import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/types"

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.product.id === product.id)

        if (existingItem) {
          const updatedCart = cart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
          set({ cart: updatedCart })
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] })
        }
      },

      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) })
      },

      updateQuantity: (productId: string, quantity: number) => {
        set({
          cart: get().cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().cart.reduce((total, item) => {
          const price = item.product.price
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
