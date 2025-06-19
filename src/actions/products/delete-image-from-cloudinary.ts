'use server'

import { z } from 'zod'
import { v2 as cloudinary } from "cloudinary";

const imageSchema = z.string().url("Invalid image URL");

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteImageFromCloudinary = async (imageUrl: string) => {
  if (!imageUrl || imageUrl.trim() === "") {
    return {
      ok: true,
      message: "No image to delete"
    };
  }

  const imageParsed = imageSchema.safeParse(imageUrl);

  if (!imageParsed.success) {
    return {
      ok: false,
      message: 'Error validating image'
    }
  }

  const image = imageParsed.data

  const parts = image.split('/');
  const publicIdWithExtension = parts.slice(-3).join('/');
  const publicId = publicIdWithExtension.split('.').slice(0, -1).join('.')

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'not found') {
      return {
        ok: true,
        message: 'La imagen no existe en Cloudinary'
      }
    }

    if (result.result !== 'ok') {
      return {
        ok: false,
        message: 'Error al eliminar la imagen de Cloudinary'
      }
    }

    return {
      ok: true,
      message: 'Imagen eliminada correctamente de Cloudinary'
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary', error)
    return {
      ok: false,
      message: 'Error al eliminar la imagen de Cloudinary, por favor contacta con soporte'
    }
  }
}
