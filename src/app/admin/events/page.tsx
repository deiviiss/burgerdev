// Admin page to view registered events
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { IoPersonSharp } from 'react-icons/io5'
import { TbDashboard } from 'react-icons/tb'
import { getEvents } from '@/actions/analitycs/get-events'
import { Button } from '@/components/ui/button'

// searchParams can come as an optional prop, default to empty object
export default async function EventsPage({ searchParams = {} }: { searchParams?: Record<string, string> }) {
  const page = Number(searchParams.page) || 1
  const { events, totalPages } = await getEvents({ page })

  return (
    <main className="max-w-7xl mx-auto container px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Registro de eventos</h1>
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al Menú
          </Button>
        </Link>
      </div>

      <p className="text-muted-foreground">Aquí puedes ver todos los eventos registrados en el sistema.</p>

      <div className="flex w-full justify-end gap-2 my-6">
        <Link href="/admin/dashboard" aria-disabled>
          <Button variant="secondary" size="sm" className="flex items-center">
            <TbDashboard className='w-3 h-3' />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin">
          <Button variant="secondary" size="sm" className="flex items-center">
            <IoPersonSharp className='w-3 h-3' />
            Admin
          </Button>
        </Link>
      </div>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-primary">
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Producto</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => {
            return (
              <tr key={e.id}>
                <td className="p-2 border">{new Date(e.createdAt).toLocaleString()}</td>
                <td className="p-2 border">{e.type}</td>
                <td className="p-2 border">{e.product?.name || e.promotion?.name || ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex gap-2 mt-4 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/events?page=${i + 1}`}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-primary' : 'bg-secondary'}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </main >
  )
}
