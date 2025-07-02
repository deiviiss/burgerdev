import { Facebook, Instagram } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const socialMap = {
  whatsapp: {
    icon: FaWhatsapp,
    hoverClass: 'hover:bg-green-600'
  },
  facebook: {
    icon: Facebook,
    hoverClass: 'hover:bg-blue-600'
  },
  instagram: {
    icon: Instagram,
    hoverClass: 'hover:bg-pink-600'
  }
}

export function getSocialLinks(social: Record<string, string | null | undefined>) {
  return Object.entries(social || {})
    .filter(([_, href]) => !!href)
    .map(([key, href]) => {
      const normalizedKey = key.toLowerCase()
      return {
        id: normalizedKey,
        icon: socialMap[normalizedKey as keyof typeof socialMap]?.icon,
        hoverClass: socialMap[normalizedKey as keyof typeof socialMap]?.hoverClass,
        href: href ?? '#'
      }
    })
    .filter(link => !!link.icon)
}
