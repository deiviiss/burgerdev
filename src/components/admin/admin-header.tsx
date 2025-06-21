import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminHeader() {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al Menú
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground">Gestiona tus productos, categorías y promociones</p>
    </div>
  )
}
