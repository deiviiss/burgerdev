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
      {
        events.length === 0
          ? (
            <p className="text-center text-muted-foreground">No hay eventos registrados.</p>)
          : (<>
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
            <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
              {/* Previous button */}
              {page > 1 && (
                <Link href={`/admin/events?page=${page - 1}`}>
                  <Button variant="outline" size="sm">Anterior</Button>
                </Link>
              )}

              {/* First page and ellipsis */}
              {(() => {
                const showPages = 5
                const halfShow = Math.floor(showPages / 2)
                let startPage = Math.max(1, page - halfShow)
                const endPage = Math.min(totalPages, startPage + showPages - 1)

                if (endPage - startPage + 1 < showPages) {
                  startPage = Math.max(1, endPage - showPages + 1)
                }

                const pages = []

                if (startPage > 1) {
                  pages.push(
                    <Link key={1} href={'/admin/events?page=1'}>
                      <Button
                        variant={page === 1 ? 'default' : 'outline'}
                        size="sm"
                        className="min-w-[40px]"
                      >
                        1
                      </Button>
                    </Link>
                  )
                  if (startPage > 2) {
                    pages.push(
                      <span key="ellipsis1" className="px-2 text-muted-foreground">...</span>
                    )
                  }
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <Link key={i} href={`/admin/events?page=${i}`}>
                      <Button
                        variant={page === i ? 'default' : 'outline'}
                        size="sm"
                        className="min-w-[40px]"
                      >
                        {i}
                      </Button>
                    </Link>
                  )
                }

                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis2" className="px-2 text-muted-foreground">...</span>
                    )
                  }
                  pages.push(
                    <Link key={totalPages} href={`/admin/events?page=${totalPages}`}>
                      <Button
                        variant={page === totalPages ? 'default' : 'outline'}
                        size="sm"
                        className="min-w-[40px]"
                      >
                        {totalPages}
                      </Button>
                    </Link>
                  )
                }

                return pages
              })()}

              {/* Next button */}
              {page < totalPages && (
                <Link href={`/admin/events?page=${page + 1}`}>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </Link>
              )}
            </div>
          </>)
      }
    </main >
  )
}
