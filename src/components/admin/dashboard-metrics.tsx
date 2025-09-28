'use client'

import { IoEyeOutline, IoPeopleOutline } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface DashboardMetricsProps {
  stats: {
    uniqueVisits: number
    productsAddedToCart: number
    pickupOrders: number
    deliveryOrders: number
    completedOrders: number
    activeUsers: number
    paymentMethods: Array<{
      method: string
      count: number
      percentage: number
    }>
    topProducts: Array<{
      name: string
      count: number
    }>
  }
}

export default function DashboardMetrics({ stats }: DashboardMetricsProps) {
  return (
    <div className="space-y-8">
      {/* Primary Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visitas Únicas
            </CardTitle>
            <IoEyeOutline className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueVisits}</div>
            <p className="text-xs text-muted-foreground">
              Total de visitas al menú
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos Agregados
            </CardTitle>
            <LuShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productsAddedToCart}</div>
            <p className="text-xs text-muted-foreground">
              Total de items agregados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos para Recoger
            </CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pickupOrders}</div>
            <p className="text-xs text-muted-foreground">
              Para recoger en local
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos a Domicilio
            </CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0l-3-3m3 3l-3 3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveryOrders}</div>
            <p className="text-xs text-muted-foreground">
              Enviados a domicilio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Usuarios Activos</CardTitle>
            <CardDescription>Total de usuarios únicos hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <IoPeopleOutline className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{stats.activeUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Métodos de Pago</CardTitle>
            <CardDescription>Distribución por método de pago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.paymentMethods.map((payment, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">{payment.method}</span>
                    <span className="text-sm text-muted-foreground">
                      ({payment.count} {payment.count === 1 ? 'pedido' : 'pedidos'})
                    </span>
                  </div>
                  <span className="font-bold">{payment.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Más Agregados</CardTitle>
          <CardDescription>Los productos más populares en carritos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="text-muted-foreground">{product.count} veces</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
