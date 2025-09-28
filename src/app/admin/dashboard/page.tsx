import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { getStats } from '@/actions/analitycs/get-stats'
import DashboardMetrics from '@/components/admin/dashboard-metrics'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const rawStats = await getStats()
  const stats = {
    uniqueVisits: rawStats.uniqueVisits ?? 0,
    productsAddedToCart: rawStats.productsAddedToCart ?? 0,
    pickupOrders: rawStats.pickupOrders ?? 0,
    deliveryOrders: rawStats.deliveryOrders ?? 0,
    completedOrders: rawStats.completedOrders ?? 0,
    activeUsers: rawStats.activeUsers ?? 0,
    paymentMethods: rawStats.paymentMethods ?? [],
    topProducts: rawStats.topProducts ?? []
  }

  return (
    <main className="max-w-7xl mx-auto container px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <IoStatsChart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <Link href="/admin">
          <Button variant="outline" size="sm" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al Panel
          </Button>
        </Link>
      </div>

      <p className="text-muted-foreground mb-8">
        Métricas y estadísticas de tu negocio
      </p>

      <Suspense fallback={<div>Cargando métricas...</div>}>
        <DashboardMetrics stats={stats} />
      </Suspense>
    </main>
  )
}
