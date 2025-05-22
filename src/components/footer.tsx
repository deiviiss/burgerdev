import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Burger Dev</h3>
            <p className="text-gray-300">Lo bueno se comparte... y se pide por WhatsApp. </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-card transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Administración
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

          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
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
                href="#"
                className="bg-gray-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Contáctanos:</p>
              <p className="text-gray-300">info@burgerdev.com</p>
              <p className="text-gray-300">981 125 0049</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Burger Dev. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
