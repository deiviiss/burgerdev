import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import { NavbarAdmin } from '@/components/admin/admin-navbar'

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const userSession = await getUserSessionServer()

  if (!userSession) {
    redirect('/')
  }

  return (
    <>
      <NavbarAdmin />
      <div className='mb-10'>
        {children}
      </div>
    </>
  )
}
