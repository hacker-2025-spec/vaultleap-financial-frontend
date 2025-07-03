'use client'

import { VaultDetails } from '@/store/dashboard/dashboard.types'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  vault: Pick<VaultDetails, 'roles'>
}

export const VaultDetailsModalRecipientsSection = ({ vault }: Props) => {
  return (
    <ScrollArea className="h-[150px] w-full rounded-md">
      <ul className="w-full">
        {vault.roles.map((role) => (
          <li
            key={role.shareHolderRoleAddress}
            className="p-2 sm:p-3 flex justify-between items-center border-b border-border/20 last:border-b-0"
          >
            <div>
              <div className="font-medium text-sm">{role.name}</div>
              <div className="text-xs text-muted-foreground">{role.emails[0]}</div>
            </div>
            <div className="text-sm font-medium">{role.sharePercentage}%</div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
