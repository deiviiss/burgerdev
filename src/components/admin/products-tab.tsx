"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Product, Category, ProductOption } from "@/lib/types"
import { PlusCircle, Pencil, Trash2, Save, X, Trash, Plus, Tag } from "lucide-react"
import ImageUpload from "@/components/image-upload"
import { getProducts } from "@/actions/products/get-products"
import { getCategories } from "@/actions/categories/get-categories"
import { useForm } from "react-hook-form"
import { productSchema } from "@/schemas/product.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createUpdateProduct } from "@/actions/products/create-update-product"
import { toast } from "sonner"
import Loading from "@/app/loading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { deleteProduct } from "@/actions/products/delete-product-by-id"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { deleteImageFromCloudinary } from "@/actions/products/delete-image-from-cloudinary"
import { DialogDescription } from "@radix-ui/react-dialog"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BsCash } from "react-icons/bs";

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [newOption, setNewOption] = useState<Partial<ProductOption>>({ name: "", price: 0, isAvailable: false, type: "size" })
  const placeholderNewOption =
    newOption.type === 'size'
      ? 'Ej: Grande, Mediana...'
      : newOption.type === 'ingredient'
        ? 'Ej: Extra queso, tomate, lechuga...'
        : newOption.type === 'variable'
          ? 'Precio a confirmar por WhatsApp'
          : newOption.type === 'note'
            ? 'Sin cebolla, sin tomate, sin lechuga...'
            : 'Escribe una opción...';


  const [showDeleteOptionsModal, setShowDeleteOptionsModal] = useState(false)
  const [optionToDeleteIndex, setOptionToDeleteIndex] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      price: currentProduct?.price || 0,
      image: currentProduct?.image,
      categoryId: currentProduct?.categoryId || "",
      isAvailable: currentProduct?.isAvailable || true,
      options: currentProduct?.options || []
    }
  })

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getProducts()
        const categoriesData = await getCategories()
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Reset form on product change
  useEffect(() => {
    if (currentProduct) {
      form.reset({
        name: currentProduct?.name,
        description: currentProduct?.description,
        price: currentProduct?.price,
        image: currentProduct?.image,
        categoryId: currentProduct?.categoryId,
        isAvailable: currentProduct?.isAvailable,
        options: currentProduct?.options || []
      })
    }
  }, [currentProduct, form])

  const handleAddNew = () => {
    setCurrentProduct(null)
    setIsEditing(true)

    form.reset({
      name: "",
      description: "",
      price: 0,
      image: "",
      categoryId: "",
      isAvailable: true,
      options: []
    })
  }

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product })
    setIsEditing(true)
    setSelectedImage(null)
  }

  const handleCancel = () => {
    setCurrentProduct(null)
    setNewOption({ name: "", price: 0, isAvailable: true, type: "size" })
    setIsEditing(false)
    setSelectedImage(null)
  }

  // Functions to manage product options
  const addOption = () => {
    if (!newOption.name?.trim() || !newOption.type) {
      toast.error("El nombre es requerido.")
      return
    }

    const newOpt: ProductOption = {
      name: newOption.name?.trim() || '',
      price: newOption.price || 0,
      isAvailable: newOption.isAvailable || true,
      quantity: 0,
      productId: currentProduct?.id || '',
      type: newOption.type || 'size'
    }

    const current = form.getValues("options") || []
    form.setValue("options", [...current, newOpt])
    setNewOption({ name: "", price: 0, isAvailable: true, type: "size" })
    toast.success("Opción agregada correctamente")
  }

  const updateOption = (index: number, field: keyof ProductOption, value: any) => {
    const options = form.getValues("options") || []

    const updated = [...options]
    updated[index] = {
      ...updated[index],
      [field]: value
    }
    form.setValue("options", updated)
  }

  const removeOption = (index: number) => {
    const current = form.getValues("options") || []
    const updated = [...current]
    updated.splice(index, 1)
    form.setValue("options", updated)
  }

  const handleDelete = async (productId: string) => {
    if (!productToDelete) return
    setIsSubmitting(true)

    try {
      const { ok, message } = await deleteProduct(productId)

      if (!ok) {
        toast.error(message || "No se pudo eliminar el producto")
        return
      }

      toast.success(message || "Producto eliminado correctamente")

      const updated = await getProducts()
      setProducts(updated)
      setIsSubmitting(false)
      setShowDeleteModal(false)
      setProductToDelete(null)
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
      toast.error("Ocurrió un error al eliminar el producto")
    }
  }

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    setIsSubmitting(true)

    if (!selectedImage && !values.image) {
      toast.error("La imagen es obligatoria")
      setIsSubmitting(false)
      return
    }

    let imageUrl = values.image

    if (selectedImage) {
      const formDataImage = new FormData()
      formDataImage.append("image", selectedImage)

      try {
        const res = await fetch("/api/upload-product-image", {
          method: "POST",
          body: formDataImage,
        })

        const data = await res.json()

        if (!data.ok) {
          toast.error(data.message || "Error al subir la imagen")
          setIsSubmitting(false)
          return
        }

        imageUrl = data.url

        if (currentProduct?.image) {
          const { ok, message } = await deleteImageFromCloudinary(currentProduct.image)
          if (!ok) {
            toast.error(message || "Error al eliminar la imagen anterior")
            setIsSubmitting(false)
            return
          }
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error)
        toast.error("Error inesperado al subir la imagen")
        setIsSubmitting(false)
        return
      }
    }

    const updatedValues = {
      ...values,
      image: imageUrl
    }

    const formData = new FormData()
    formData.append("name", updatedValues.name)
    formData.append("description", updatedValues?.description)
    formData.append("price", updatedValues.price.toString()) // Convert number to string
    formData.append("image", updatedValues.image)
    formData.append("categoryId", updatedValues.categoryId)
    formData.append("isAvailable", updatedValues.isAvailable.toString())
    formData.append("options", JSON.stringify(updatedValues.options))

    // If we're editing an existing product
    if (currentProduct?.id) {
      formData.append("id", currentProduct.id)
    }

    const { ok, message } = await createUpdateProduct(formData)

    if (!ok) {
      toast.error(message || "No se pudo guardar el producto")
      setIsSubmitting(false)
      return
    }

    toast.success(message || "Producto guardado correctamente")
    setIsSubmitting(false)
    setIsEditing(false)
    setCurrentProduct(null)

    const updated = await getProducts()
    setProducts(updated)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {!isEditing
        ?
        (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lista de Productos</h2>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
                <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/80">
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">
                    Nuevo Producto
                  </span>
                </Button>
              </div>
            </div>

            {products.length === 0
              ? (
                <div className="text-center py-8 text-muted-foreground">No hay productos. ¡Agrega uno nuevo!</div>
              )
              :
              (
                <>
                  {
                    products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">No hay productos que coincidan con tu búsqueda.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                          products.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map((product) => {
                            const category = categories.find((c) => c.id === product.categoryId)
                            const hasOptions = product.options && product.options.length > 0

                            return (
                              <Card key={product.id} className="overflow-hidden">
                                <div className="relative h-48">
                                  <Image
                                    src={product.image || "/placeholder.svg?height=200&width=300"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute top-2 right-2 flex gap-1">
                                    <Badge variant={product.isAvailable ? "default" : "secondary"} className="text-xs">
                                      {product.isAvailable ? "Activo" : "Inactivo"}
                                    </Badge>
                                    {hasOptions && (
                                      <Badge variant="secondary" className="text-xs">
                                        {product.options?.length} opciones
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <CardHeader className="pb-3">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Tag className="h-3 w-3 text-gray-500" />
                                        <span className="text-sm text-gray-600">{category?.name || "Sin categoría"}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                  {product.description && (
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                  )}

                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                      <BsCash className="h-4 w-4 text-green-600" />
                                      <span className="text-lg font-bold">{product.price > 0 ? product.price.toFixed(2) : 'Precio en opciones'}</span>
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="flex-1">
                                      <Pencil className="h-4 w-4 mr-1" />
                                      Editar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setProductToDelete(product)
                                        setShowDeleteModal(true)
                                      }}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })
                        }
                      </div>
                    )
                  }
                </>
              )}
          </>
        )
        :
        (
          <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {currentProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <Button variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre del producto"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción del producto"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría *</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange} disabled={isSubmitting} defaultValue={field.value} key={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio *</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              min={'0'}
                              step={'0.01'}
                              {...field}
                              onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                              placeholder='Precio del producto'
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <>
                          <ImageUpload
                            nameImage="del Producto"
                            value={field.value}
                            previewFile={selectedImage}
                            onChange={(file) => {
                              // If there's no image, I'll leave.If there's an image, I'll continue.
                              setSelectedImage(file)
                              // string dummy value to pass validation
                              form.setValue("image", file ? "upload_pending" : "", { shouldValidate: true })
                            }}
                          />
                          <FormMessage />
                        </>
                      )}
                    />

                    {/* Product Options Section */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-4">Opciones del Producto</h3>

                        {/* Existing Options */}
                        {(form.watch("options") || []).length > 0 && (
                          <div className="space-y-3 mb-4">
                            <h4 className="text-sm font-medium text-foreground">Opciones existentes:</h4>
                            {(form.watch("options") || []).map((option, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-primary/10">
                                <div className="flex-1">
                                  <Input
                                    value={option.name}
                                    onChange={(e) => updateOption(index, "name", e.target.value)}
                                    placeholder="Nombre de la opción"
                                    disabled={isSubmitting}
                                    className="mb-2"
                                  />
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={option.price}
                                    onChange={(e) => updateOption(index, "price", Number.parseFloat(e.target.value) || 0)}
                                    placeholder="Precio"
                                    disabled={isSubmitting}
                                  />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={option.isAvailable}
                                      onCheckedChange={(checked) => updateOption(index, "isAvailable", checked)}
                                      disabled={isSubmitting}
                                    />
                                    <Label className="text-xs">Disponible</Label>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setOptionToDeleteIndex(index)
                                      setShowDeleteOptionsModal(true)
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={isSubmitting}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )

                        }

                        {/* Add New Option */}
                        <div className="border rounded-lg p-4 bg-primary/10 flex flex-col gap-y-2">
                          <h4 className="text-sm font-medium text-foreground mb-3">Agregar nueva opción:</h4>

                          {/* select option type */}
                          <Select
                            value={newOption.type}
                            onValueChange={(value) => setNewOption({ ...newOption, type: value as "size" | "ingredient" | "variable" })}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="w-1/2">
                              <SelectValue placeholder="Elige una opción..." />
                            </SelectTrigger>
                            <SelectContent>

                              <SelectItem value={"size"}>
                                Tamaño
                              </SelectItem>
                              <SelectItem value={"ingredient"}>
                                Ingrediente
                              </SelectItem>
                              <SelectItem value={"variable"}>
                                Variable
                              </SelectItem>
                              <SelectItem value={"note"}>
                                Nota
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {/* select option data */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* option name */}
                            <div>
                              <Label htmlFor="optionName" className="text-xs">
                                Nombre
                              </Label>
                              <Input
                                id="optionName"
                                value={newOption.name}
                                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                                placeholder={placeholderNewOption}
                                disabled={isSubmitting}
                              />
                            </div>
                            {/* option price */}
                            <div>
                              <Label htmlFor="optionPrice" className="text-xs">
                                Precio
                              </Label>
                              <Input
                                id="optionPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={newOption.price}
                                onChange={(e) =>
                                  setNewOption({ ...newOption, price: Number.parseFloat(e.target.value) || 0 })
                                }
                                placeholder="0.00"
                                disabled={isSubmitting}
                              />
                            </div>
                            {/* add option button */}
                            <div className="flex items-end">
                              <Button
                                type="button"
                                onClick={addOption}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                                disabled={isSubmitting}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar
                              </Button>
                            </div>
                          </div>
                          {/* switch to enable/disable option */}
                          <div className="flex items-center space-x-2 mt-3">
                            <Switch
                              checked={newOption.isAvailable}
                              onCheckedChange={(checked) => setNewOption({ ...newOption, isAvailable: checked })}
                              disabled={isSubmitting}
                            />
                            <Label className="text-sm">Opción disponible</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="isAvailable"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2 flex items-center space-x-2 pt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                            disabled={isSubmitting}
                          />
                          <FormLabel>Producto Activo</FormLabel>
                        </FormItem>
                      )}
                    />

                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/80"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Producto
                  </Button>
                </div>
              </form>
            </Form>

          </div >
        )
      }

      {/* delete modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar este producto?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Se eliminará el producto y todas las opciones asociadas.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="font-semibold text-lg">{productToDelete?.name}</p>
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
              onClick={() => handleDelete(productToDelete?.id || "")}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* delete options modal */}
      <Dialog open={showDeleteOptionsModal} onOpenChange={setShowDeleteOptionsModal}>
        <DialogContent className="max-w-sm bg-muted">
          <DialogHeader>
            <DialogTitle>¿Eliminar esta opción?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Se eliminará la opción del producto.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="font-semibold text-lg">{optionToDeleteIndex !== null && form.watch("options")?.[optionToDeleteIndex]?.name}
            </p>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteOptionsModal(false)
                setOptionToDeleteIndex(null)
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (optionToDeleteIndex !== null) {
                  removeOption(optionToDeleteIndex)
                  setOptionToDeleteIndex(null)
                  setShowDeleteOptionsModal(false)
                  toast.success("Opción eliminada correctamente")
                }
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
