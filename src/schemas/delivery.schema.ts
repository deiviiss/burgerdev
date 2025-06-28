import { z } from 'zod'

export const deliverySchema = z.object({
  address: z.string().min(1, 'La dirección es obligatoria'),
  reference: z.string().min(1, 'La referencia es obligatoria'),
  receiverName: z.string().min(1, 'El nombre es obligatorio'),
  receiverPhone: z.string().min(1, 'El teléfono es obligatorio'),
  paymentMethod: z.string().min(1, 'El método de pago es obligatorio')
})
