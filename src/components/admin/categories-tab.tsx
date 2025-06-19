"use client"

import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@/lib/types"
import { PlusCircle, Pencil, Trash2, Save, X, FolderOpen } from "lucide-react"
import { getCategories } from "@/actions/categories/get-categories"
import Loading from "@/app/loading"
import { createUpdateCategory } from "@/actions/categories/createUpdateCategory"
import { toast } from "sonner"
import { deleteCategory } from "@/actions/categories/delete-category-by-id"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { categorySchema } from "@/schemas/category.schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: currentCategory?.name || ""
    }
  })

  useEffect(() => {
    if (currentCategory) {
      form.reset({ name: currentCategory.name })
    }
  }, [currentCategory, form])

  // Load data on mount
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
    setCurrentCategory(null)
    form.reset({ name: "" }) // clear input field
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

  const handleDelete = async (id: string) => {
    if (!categoryToDelete) return
    setIsSubmitting(true)

    try {
      const { ok, message } = await deleteCategory(id)

      if (!ok) {
        toast.error(message || "No se pudo eliminar la categoría")
        setIsSubmitting(false)
        return
      }

      toast.success(message || "Categoría eliminada correctamente")
      const updated = await getCategories()
      setCategories(updated)
      setIsSubmitting(false)
      setShowDeleteModal(false)
      setCategoryToDelete(null)
    } catch (error) {
      console.error("Error al eliminar la categoría:", error)
      toast.error("Ocurrió un error al eliminar la categoría")
    }
  }

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", values.name)

    // If we're editing an existing category
    if (currentCategory?.id) {
      formData.append("id", currentCategory.id)
    }

    const { ok, message } = await createUpdateCategory(formData)

    if (!ok) {
      toast.error(message || "No se pudo guardar la categoría")
      setIsSubmitting(false)
      return
    }

    toast.success(message || "Categoría guardada correctamente")
    setIsSubmitting(false)
    setIsEditing(false)
    setCurrentCategory(null)

    // Optional: update the list with the new data from the server
    const updated = await getCategories()
    setCategories(updated)
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
            <div className="text-center py-8 text-muted-foreground">No hay categorías. ¡Agrega una nueva!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-orange-500" />
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category)} className="flex-1">
                        <Pencil className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCategoryToDelete(category)
                          setShowDeleteModal(true)
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="pb-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {currentCategory ? "Editar Categoría" : "Nueva Categoría"}
            </h2>
            <Button variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de la Categoría *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nombre de la categoría"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/80">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Categoría
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}


      {/* delete modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar esta categoría?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Si cuenta con productos asociados, no se podrá eliminar.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="font-semibold text-lg">{categoryToDelete?.name}</p>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={isSubmitting}
              onClick={() => handleDelete(categoryToDelete?.id || "")}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
