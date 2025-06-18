import Link from "next/link"
import { Clock, Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { getPhoneNumberMenu } from "@/actions/get-phone-number-menu";


export async function Footer() {
  const googleMapsUrl = "https://maps.app.goo.gl/qAFDqDNZvYqwkaDG7"
  const phoneNumber = await getPhoneNumberMenu()
  const whatsappUrl = `https://wa.me/${phoneNumber?.replace(/\D/g, "")}`

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">Burger Dev</h3>
            <p className="text-gray-300">Lo bueno se comparte... y se pide por WhatsApp</p>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horarios</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Horarios de Atención:</p>
                  <p className="text-gray-300 text-sm">Jueves a Martes</p>
                  <p className="text-gray-300 text-sm">10:00 AM - 6:00 PM</p>
                  <p className="text-red-300 text-sm">Cerrado los Miércoles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ubicación</h3>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <Link
                href={googleMapsUrl}
                target="_blank" rel="noopener noreferrer"
              >
                <p className="text-gray-300 font-medium">Ubicación:</p>
                <span
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm text-left"
                >
                  Calle José María Iglesias
                  <br />
                  Presidentes de México
                  <br />
                  San Francisco de Campeche, Campeche
                </span>
              </Link>
            </div>
          </div>

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
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://http://mitiendaenlinea.shop/"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-700 hover:bg-blue-400 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-gray-300 font-medium">Contáctanos:</p>
              <p className="text-gray-300">info@burgerdev.com</p>
              <Link
                href={`tel:${phoneNumber}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 hover:text-green-400 transition-colors">
                  981 125 0049
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 pb-8 text-center text-gray-300 relative">

          <p>© {new Date().getFullYear()} Burger Dev. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
