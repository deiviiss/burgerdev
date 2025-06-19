export interface ProductOption {
  id?: string;
  productId: string;
  name: string;
  price: number;
  type: "size" | "ingredient" | "variable";
  quantity: number;
  isAvailable: boolean;
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  createdAt: Date
  options?: ProductOption[]
  groupedOptions?: Record<string, ProductOption[]>
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
  categoryId: string
  createdAt: Date
}

export type CartItemPayload = {
  itemId: string
  categoryId: string
  quantity: number
  unitPrice: number
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export type User = {
  id: string
  name: string
  email: string
  phoneNumber: string
  role: Role
  password: string
  createdAt: Date
}

export type PhoneNumberMenu = {
  id: string
  label: string
  number: string
  isActive: boolean
  createdAt: Date
}