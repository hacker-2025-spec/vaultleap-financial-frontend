import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import LayoutWithSidebar from '@/components/layout/LayoutWithSidebar'
import { getMe } from '@/client/index'
import { Loading } from '@/components/layout/Loader/Loading.tsx'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
  pendingComponent: () => <Loading />,
  loader: async ({ context: { queryClient } }: { context: any }) => {
    try {
      // Ensure customer data is fetched and available before allowing access
      
          const response = await getMe()
        const customerData = response.data
      
      if (!customerData) {
        console.log('Protected route: No customer data found, redirecting to landing page')
        throw redirect({ to: '/' })
      }

      return { customerData }
    } catch (error) {
      console.error('Protected route: Failed to load customer data', error)
      throw redirect({ to: '/' })
    }
  },
})

function ProtectedLayout() {
  // Route loader ensures customer data is available before this component renders
  // No need for additional authentication checks here

  return (
    <LayoutWithSidebar>
      <Outlet />
    </LayoutWithSidebar>
  )
}
