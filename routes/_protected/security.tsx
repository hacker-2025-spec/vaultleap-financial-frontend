import { createFileRoute } from '@tanstack/react-router'
import { ensureCustomerExists } from '@/utils/routeGuards'

export const Route = createFileRoute('/_protected/security')({
  component: Security,
  beforeLoad: async ({ context: { queryClient } }: { context: any }) => {
    return ensureCustomerExists(queryClient, 'Security')
  },
})

function Security() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Security</h1>
      <p className="text-gray-600">Security settings and options will be available here.</p>
    </div>
  )
}
