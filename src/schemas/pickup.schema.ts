import { z } from 'zod'

export const pickupSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  paymentMethod: z.string().min(1, 'El método de pago es obligatorio')
})
