import { Clock, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { getBranches } from '@/actions/branches/get-branches'
import { getSocialLinks } from '@/lib/socialLinks'
import { formatPhoneNumber } from '@/lib/utils'

export async function Footer() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME
  const branches = await getBranches()

  const socialLinks = getSocialLinks(branches[0].social ?? {})

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-300">{branches[0].slogan}</p>
          </div>
          {/* Branches */}
          {
            branches.map((branch) => (
              <div key={branch.id}>
                <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <Link href={branch.urlMap || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <span className="text-gray-300 text-sm whitespace-pre-line">
                      {branch.address}
                    </span>
                  </Link>
                </div>
                {branch.hours && (
                  <div className="flex items-start gap-2 mb-2">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm whitespace-pre-line">
                      {branch.hours}
                    </span>
                  </div>
                )}
                <p className="text-red-300 text-sm mb-2">Cerrado los {branch.dayOff}</p>
                {branch.phone && (
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="h-4 w-4 text-gray-400" />
                    <Link
                      href={`https://wa.me/+521${branch.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      {formatPhoneNumber(branch.phone)}
                    </Link>
                  </div>
                )}
              </div>
            ))
          }

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-gray-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              {
                socialLinks
                  .filter(link => !!link.href) // ⚠ only if it has a valid href
                  .map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-gray-700 ${link.hoverClass} p-2 rounded-full transition-colors`}
                      aria-label={link.id}
                    >
                      <link.icon className="h-5 w-5" />
                    </Link>
                  ))
              }
            </div>

            <div className="mt-4">
              <p className="text-gray-300 font-medium">Contáctanos:</p>
              <Link
                href={`tel:${branches[0].phone}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 hover:text-green-400 transition-colors">
                  {formatPhoneNumber(branches[0].phone)}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 pb-8 text-center text-gray-300 relative">
          <div className="flex items-center gap-1"
          >
            <Link href="/" className="absolute right-3 -top-36 sm:-top-72 md:-top-40 md:right-5 lg:right-20 lg:-top-48 text-3xl sm:text-4xl font-bold text-primary flex items-center gap-1">
              <Image
                src="/images/logo.webp"
                alt={`${companyName} logo`}
                width={180}
                height={180}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <p>© {new Date().getFullYear()} {companyName} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
