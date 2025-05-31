"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Promotion, Product } from "@/lib/types"
import { savePromotion, deletePromotion, applyPromotion } from "@/lib/data"
import { PlusCircle, Pencil, Trash2, Save, X, Calendar } from "lucide-react"
import { getPromotions } from "@/actions/get-promotions"
import { getProducts } from "@/actions/get-products"
import Loading from "@/app/loading"

export default function PromotionsTab() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const emptyPromotion: Promotion = {
    id: "",
    name: "",
    description: "",
    discountPercentage: 10,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
    promoPrice: 0,
    originalPrice: 0,
    image: "",
    categoryId: "",
    createdAt: new Date(),
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const promotionsData = await getPromotions()
        const productsData = await getProducts()
        setPromotions(promotionsData)
        setProducts(productsData)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAddNew = () => {
    setCurrentPromotion({ ...emptyPromotion, id: Date.now().toString() })
    setIsEditing(true)
  }

  const handleEdit = (promotion: Promotion) => {
    setCurrentPromotion({ ...promotion })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setCurrentPromotion(null)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!currentPromotion) return

    // Validación básica
    if (!currentPromotion.name || !currentPromotion.discountPercentage) {
      alert(
        "Por favor completa los campos obligatorios: Nombre, Porcentaje de descuento y selecciona al menos un producto",
      )
      return
    }

    try {
      await savePromotion(currentPromotion)

      // Aplicar la promoción a los productos
      if (currentPromotion.isActive) {
        await applyPromotion(currentPromotion)
      }

      // Actualizar la lista local
      const updatedPromotions = [...promotions]
      const index = updatedPromotions.findIndex((p) => p.id === currentPromotion.id)

      if (index >= 0) {
        updatedPromotions[index] = currentPromotion
      } else {
        updatedPromotions.push(currentPromotion)
      }

      setPromotions(updatedPromotions)
      setCurrentPromotion(null)
      setIsEditing(false)

      // Recargar los productos para ver los cambios de precio
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error("Error al guardar la promoción:", error)
      alert("Ocurrió un error al guardar la promoción")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta promoción?")) return

    try {
      await deletePromotion(id)
      setPromotions(promotions.filter((p) => p.id !== id))

      // Recargar los productos para ver los cambios de precio
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error("Error al eliminar la promoción:", error)
      alert("Ocurrió un error al eliminar la promoción")
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lista de Promociones</h2>
            <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/80">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden md:inline  ml-2">
                Nueva Promoción
              </span>
            </Button>
          </div>

          {promotions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No hay promociones. ¡Agrega una nueva!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3">Nombre</th>
                    <th className="text-left p-3">Descuento</th>
                    <th className="text-left p-3">Fechas</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-right p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((promotion) => {
                    const isActive =
                      promotion.isActive &&
                      new Date(promotion.startDate) <= new Date() &&
                      new Date(promotion.endDate) >= new Date()

                    return (
                      <tr key={promotion.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{promotion.name}</td>
                        <td className="p-3">{promotion.discountPercentage}%</td>
                        <td className="p-3">
                          <div className="text-sm">
                            <div>Inicio: {new Date(promotion.startDate).toLocaleDateString()}</div>
                            <div>Fin: {new Date(promotion.endDate).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${isActive ? "bg-green-100 text-green-800" : "bg-muted text-gray-800"}`}
                          >
                            {isActive ? "Activa" : "Inactiva"}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(promotion)}
                            className="text-blue-500 hover:text-blue-700 mr-1"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(promotion.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {currentPromotion?.id === emptyPromotion.id ? "Nueva Promoción" : "Editar Promoción"}
            </h2>
            <Button variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre de la Promoción *</Label>
                <Input
                  id="name"
                  value={currentPromotion?.name || ""}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion!, name: e.target.value })}
                  placeholder="Nombre de la promoción"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={currentPromotion?.description || ""}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion!, description: e.target.value })}
                  placeholder="Descripción de la promoción"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="discountPercentage">Porcentaje de Descuento *</Label>
                <Input
                  id="discountPercentage"
                  type="number"
                  min="1"
                  max="100"
                  value={currentPromotion?.discountPercentage || ""}
                  onChange={(e) =>
                    setCurrentPromotion({
                      ...currentPromotion!,
                      discountPercentage: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="10"
                />
              </div>

              {/* <div>
                <Label htmlFor="discountCode">Código de Descuento (opcional)</Label>
                <Input
                  id="discountCode"
                  value={currentPromotion?.discountCode || ""}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion!, discountCode: e.target.value })}
                  placeholder="PROMO10"
                />
              </div> */}

              {/* Añadir campo de imagen en el formulario de promociones */}
              <div>
                <Label htmlFor="image">URL de la Imagen</Label>
                <Input
                  id="image"
                  value={currentPromotion?.image || ""}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion!, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="startDate">Fecha de Inicio *</Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    value={currentPromotion?.startDate ? new Date(currentPromotion.startDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentPromotion({ ...currentPromotion!, startDate: new Date(e.target.value) })}
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <Label htmlFor="endDate">Fecha de Fin *</Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    value={currentPromotion?.endDate ? new Date(currentPromotion.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentPromotion({ ...currentPromotion!, endDate: new Date(e.target.value) })}
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={currentPromotion?.isActive || false}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion!, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary/80 focus:ring-primary"
                />
                <Label htmlFor="active">Promoción Activa</Label>
              </div>
            </div>
          </div>

          {/* <div className="mt-6">
            <Label>Selecciona los productos para esta promoción *</Label>
            <div className="mt-2 border rounded-md p-4 max-h-60 overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-muted-foreground">No hay productos disponibles</p>
              ) : (
                <div className="space-y-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`product-${product.id}`}
                        checked={currentPromotion?.productIds.includes(product.id) || false}
                        onChange={() => handleProductSelection(product.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary/80 focus:ring-primary"
                      />
                      <label htmlFor={`product-${product.id}`} className="ml-2 block text-sm">
                        {product.name} - ${product.price.toFixed(2)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/80">
              <Save className="h-4 w-4 mr-2" />
              Guardar Promoción
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
