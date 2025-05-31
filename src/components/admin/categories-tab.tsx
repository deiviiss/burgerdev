"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Category } from "@/lib/types"
import { saveCategory, deleteCategory } from "@/lib/data"
import { PlusCircle, Pencil, Trash2, Save, X } from "lucide-react"
import { getCategories } from "@/actions/get-categories"
import Loading from "@/app/loading"

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const emptyCategory: Category = {
    id: "",
    name: "",
    image: ""
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAddNew = () => {
    setCurrentCategory({ ...emptyCategory, id: Date.now().toString() })
    setIsEditing(true)
  }

  const handleEdit = (category: Category) => {
    setCurrentCategory({ ...category })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setCurrentCategory(null)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!currentCategory) return

    // Validación básica
    if (!currentCategory.name) {
      alert("Por favor ingresa un nombre para la categoría")
      return
    }

    try {
      await saveCategory(currentCategory)

      // Actualizar la lista local
      const updatedCategories = [...categories]
      const index = updatedCategories.findIndex((c) => c.id === currentCategory.id)

      if (index >= 0) {
        updatedCategories[index] = currentCategory
      } else {
        updatedCategories.push(currentCategory)
      }

      setCategories(updatedCategories)
      setCurrentCategory(null)
      setIsEditing(false)
    } catch (error) {
      console.error("Error al guardar la categoría:", error)
      alert("Ocurrió un error al guardar la categoría")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta categoría? Esto podría afectar a los productos asociados."))
      return

    try {
      await deleteCategory(id)
      setCategories(categories.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Error al eliminar la categoría:", error)
      alert("Ocurrió un error al eliminar la categoría")
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
            <h2 className="text-xl font-semibold">Lista de Categorías</h2>
            <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/80">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden md:inline ml-2">
                Nueva Categoría
              </span>
            </Button>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-8 text-muted">No hay categorías. ¡Agrega una nueva!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3">Nombre</th>
                    <th className="text-right p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-muted">
                      <td className="p-3">{category.name}</td>
                      <td className="p-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          className="text-blue-500 hover:text-blue-700 mr-1"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {currentCategory?.id === emptyCategory.id ? "Nueva Categoría" : "Editar Categoría"}
            </h2>
            <Button variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre de la Categoría *</Label>
                <Input
                  id="name"
                  value={currentCategory?.name || ""}
                  onChange={(e) => setCurrentCategory({ ...currentCategory!, name: e.target.value })}
                  placeholder="Nombre de la categoría"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/80">
                <Save className="h-4 w-4 mr-2" />
                Guardar Categoría
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
