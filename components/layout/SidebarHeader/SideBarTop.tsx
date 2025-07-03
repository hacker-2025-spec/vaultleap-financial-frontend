'use client'

import { SidebarHeader } from '@/components/ui/sidebar'
import Logo from '@/components/features/logo/components/Logo'
import { useUserCustomerDetails } from '@/api/user/userQueries'

export const SideBarTop = () => {
  const { data: userData } = useUserCustomerDetails()

  // Get customer type from the customer object, with fallback to 'individual'
  const customerType = userData?.customer?.type || 'individual'

  // Capitalize the first letter for display
  const displayType = customerType.charAt(0).toUpperCase() + customerType.slice(1)

  return (
    <SidebarHeader className="mb-8 p-6">
      <div className="flex items-center gap-4">
        <div>
          <Logo height={40} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-primary-gradient">VaultLeap</span>
          <span className="text-xs text-muted-foreground opacity-80">{displayType}</span>
        </div>
      </div>
    </SidebarHeader>
  )
}
