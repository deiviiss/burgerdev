"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useCartStore } from "@/store"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 },
  },
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)
    // Simulate a small delay for the animation
    setTimeout(() => {
      addToCart(product)
      setIsLoading(false)
      toast.success(`${product.name} agregado al carrito`, {
        position: "bottom-right",
      })
    }, 300)
  }

  return (
    <motion.div className="bg-card dark:border dark:border-primary rounded-lg shadow-md overflow-hidden" variants={cardVariants} whileHover="hover">
      <div className="relative h-48">
        <Image
          src={product.image || "/placeholder.svg?height=200&width=300"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        {product.description && <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            size="sm"
            className="bg-primary hover:bg-primary/80"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Agregar
          </Button>

          <p className="text-base font-bold text-primary">${product.price}</p>
        </div>
      </div>
    </motion.div>
  )
}
