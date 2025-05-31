"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTab from "./products-tab"
import CategoriesTab from "./categories-tab"
import PromotionsTab from "./promotions-tab"
import OrdersTab from "./orders-tab"

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("products")
  console.log('activeTab', activeTab)

  return (
    <Tabs defaultValue="orders" onValueChange={setActiveTab} className="px-2">
      <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 h-auto pt-5 pb-0">
        <TabsTrigger value="orders">Pedidos</TabsTrigger>
        <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="categories">Categorías</TabsTrigger>
        <TabsTrigger value="promotions">Promociones</TabsTrigger>
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

      <TabsContent value="orders">
        <OrdersTab />
      </TabsContent>
    </Tabs>
  )
}
