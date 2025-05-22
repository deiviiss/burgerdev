'use server'

import { z } from "zod";
import { generateUniqueShortId } from "@/actions/generate-unique-short-id";

// Zod schema for order creation
const createOrderSchema = z.object({
  id: z.string().optional(),
  phone: z.string().min(8, "Phone must be at least 8 characters").optional(),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  shortId: z.string(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"])
});

// Simulate order creation (in-memory)
export const createUpdateOrder = async (formData: FormData) => {
  try {
    const generatedShortId = await generateUniqueShortId()
    const data = Object.fromEntries(formData)
    const dataToParse = {
      ...data,
      shortId: generatedShortId
    }

    const orderParsed = createOrderSchema.safeParse(dataToParse);

    if (!orderParsed.success) {
      return {
        ok: false,
        message: 'Datos inválidos',
      }
    }

    const { phone, address, shortId, status, id } = orderParsed.data

    //TODO: Check if order exists with de id
    //TODO: Saving to database

    const order = {
      shortId: `#${shortId}`,
      phone: phone ? phone : null,
      address: address ? address : null,
      status,
      createdAt: new Date(),
    };

    return {
      ok: true,
      message: "Pedido creado con éxito",
      order
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.errors[0].message,
      }
    }

    return {
      ok: false,
      message: "Ocurrió un error inesperado, por favor intente de nuevo",
    }
  }
}