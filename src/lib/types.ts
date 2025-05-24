export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  image: string | null
}

export interface Promotion {
  id: string
  name: string
  description: string
  discountPercentage: number
  originalPrice: number
  promoPrice: number
  image: string
  isActive: boolean
  startDate: Date
  endDate: Date
  categoryId: string
  createdAt: Date
}

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  id: string
  orderId: string
  productId?: string
  promotionId?: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  shortId: string
  name: string
  phoneNumber: string
  items: OrderItem[]
  totalPrice: number
  status: OrderStatus
  address: string
  comment?: string
  createdAt: string
}

export type CartItemPayload = {
  itemId: string
  categoryId: string
  quantity: number
  unitPrice: number
}