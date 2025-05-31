"use client"

import { useState, useMemo, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Filter, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getOrders } from "@/actions/orders/get-orders"
import { Order } from "@/lib/types"
import Loading from "@/app/loading"
import { toast } from "sonner"

// Status translation and badge variants
const statusMap: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive" }> = {
  PENDING: { label: "Pendiente", variant: "secondary" },
  IN_PROGRESS: { label: "En Proceso", variant: "default" },
  DELIVERED: { label: "Entregado", variant: "outline" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
}

export default function OrdersTab() {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await getOrders();

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [])

  // Filter orders based on search query and status filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Filter by customer name
      const nameMatch = order.User?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery

      // Filter by status
      const statusMatch = statusFilter === "ALL" || order.status === statusFilter

      return nameMatch && statusMatch
    })
  }, [searchQuery, statusFilter, orders])

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  // Handle page changes
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es })
    } catch (error) {
      return "Fecha inválida"
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(true)
    try {
      // TODO: Implement updateOrderStatus server action
      // await updateOrderStatus(orderId, newStatus)

      // Optimistic update - update local state immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus as Order["status"] } : order)),
      )
      setEditingOrderId(null)
      toast.success('Estado del pedido actualizado correctamente', {
        position: 'bottom-right'
      })

    } catch (error) {
      console.error("Error updating order status:", error)
      // TODO: Show error toast
    } finally {
      setUpdatingStatus(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Card className="bg-muted">
      <CardHeader className="px-2 sm:px-6">
        <CardTitle>Gestión de Pedidos</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre de cliente..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
              className="pl-8"
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value)
                setCurrentPage(1) // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filtrar por estado" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos los estados</SelectItem>
                <SelectItem value="PENDING">Pendiente</SelectItem>
                <SelectItem value="IN_PROGRESS">En Proceso</SelectItem>
                <SelectItem value="DELIVERED">Entregado</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.shortId}</TableCell>
                    <TableCell>{order.User?.name || "PENDIENTE"}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {editingOrderId === order.id ? (
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value)}
                          disabled={updatingStatus}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pendiente</SelectItem>
                            <SelectItem value="IN_PROGRESS">En Proceso</SelectItem>
                            <SelectItem value="DELIVERED">Entregado</SelectItem>
                            <SelectItem value="CANCELLED">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant={statusMap[order.status].variant}>{statusMap[order.status].label}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(order.createdAt.toISOString())}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingOrderId(editingOrderId === order.id ? null : order.id)}
                        disabled={updatingStatus}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar estado</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron pedidos con los filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} de{" "}
              {filteredOrders.length} pedidos
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">Primera página</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>
              <div className="text-sm font-medium">
                Página {currentPage} de {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Página siguiente</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Última página</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
