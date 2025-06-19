"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTab from "./products-tab"
import CategoriesTab from "./categories-tab"
import PromotionsTab from "./promotions-tab"

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <Tabs defaultValue="products" onValueChange={setActiveTab} className="px-2">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 mb-6 h-auto pt-5 pb-0">
        <TabsTrigger className="hover:bg-primary/10" value="products">Productos</TabsTrigger>
        <TabsTrigger className="hover:bg-primary/10" value="categories">Categorías</TabsTrigger>
        <TabsTrigger className="hover:bg-primary/10" value="promotions">Promociones</TabsTrigger>
      </TabsList>

      <TabsContent value="products">
        <ProductsTab />
      </TabsContent>

      <TabsContent value="categories">
        <CategoriesTab />
      </TabsContent>

      <TabsContent value="promotions">
        <PromotionsTab />
      </TabsContent>
    </Tabs>
  )
}
