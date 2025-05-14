import { Suspense } from "react"
import AdminTabs from "@/components/admin/admin-tabs"
import AdminHeader from "@/components/admin/admin-header"
import Loading from "../loading"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      <div className="bg-white rounded-lg shadow-md p-6">
        <Suspense fallback={<Loading />}>
          <AdminTabs />
        </Suspense>
      </div>
    </div>
  )
}
