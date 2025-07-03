import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router'

import Header from '@/components/features/landing-new/components/Header'
import LandingFooter from '@/components/features/landing-new/components/LandingFooter'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {


  return (
    <div className="min-h-screen relative bg-gradient-to-b from-primary-50 to-white text-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  )
}
