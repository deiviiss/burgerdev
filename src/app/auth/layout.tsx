import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session?.user) {
    redirect('/admin')
  }

  return (
    <div className='flex flex-col items-center justify-start h-screen mt-4 sm:mt-1 p-1 sm:p-5'>
      <div className=" w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inicio de Sesión</h1>
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className='hidden md:block'>Volver al Menú</span>
          </Button>
        </Link>
      </div>
      {children}
    </div>
  )
}
