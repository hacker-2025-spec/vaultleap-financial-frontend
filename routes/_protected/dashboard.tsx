import { createFileRoute } from '@tanstack/react-router'
import { NewDashboardPage } from '@/views/NewDashboardPage/NewDashboardPage'
import { ensureCustomerExists } from '@/utils/routeGuards'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
  beforeLoad: async ({ context: { queryClient } }: { context: any }) => {
    return ensureCustomerExists(queryClient, 'Dashboard')
  },
})

function Dashboard() {
  return <NewDashboardPage />
}
