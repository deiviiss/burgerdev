import { Suspense } from "react"
import Loading from "./loading"
import { PromotionBanner } from "@/components/promotion-banner"
import { ProductList } from "@/components/product-list"
import { SidebarCategories } from "@/components/sidebar-categories"
import { getProducts } from "@/actions/get-products"
import { getCategories } from "@/actions/get-categories"
import { getPromotions } from "@/actions/get-promotions"

export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories()
  const promotions = await getPromotions()

  return (
    <>
      <div className="md:hidden block">
        <SidebarCategories categories={categories} />
      </div>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-primary-gradient py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Menú</h1>
            <p className="text-xl mb-6">Deliciosos productos a un solo clic de distancia</p>
          </div>
        </section>

        {/* Featured Promotions */}
        <section className="py-6 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Promociones Destacadas</h2>
            <PromotionBanner promotions={promotions} />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar with categories */}
            <div className="md:w-1/4">
              <div className="sticky top-20 hidden md:block">
                <SidebarCategories categories={categories} />
              </div>
            </div>

            {/* Main content with products */}
            <div className="md:w-3/4">
              <Suspense fallback={<Loading />}>
                <ProductList products={products} categories={categories} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
