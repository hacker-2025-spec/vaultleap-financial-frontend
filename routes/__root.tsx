import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthProvider } from '@/components/providers/AuthHandler'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      {import.meta.env.MODE === 'development' && <TanStackRouterDevtools />}
    </AuthProvider>
  )
}
