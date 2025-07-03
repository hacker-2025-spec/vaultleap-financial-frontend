'use client'

import { VaultDetails } from '@/store/dashboard/dashboard.types'
import { userSelectors } from '@/store/user/user.selectors'
import { useSelector } from 'react-redux'

// Helper function to format number with commas
const format = (value?: string) => (value ? (Number(value) / 1000000).toFixed(2) : 0)

interface Props {
  vault: Pick<VaultDetails, 'claimable' | 'totalPaid' | 'roles'>
}

export const VaultDetailsModalSummarySection = ({ vault }: Props) => {
  const email = useSelector(userSelectors.selectUserEmail)
  const totalIncome = vault.roles.find((role) => role.emails[0] === email)?.totalIncome

  const items = [
    { label: 'Total Funded', value: vault.totalPaid, color: 'text-foreground' },
    { label: 'Total Income', value: totalIncome, color: 'text-foreground' },
    { label: 'Pending Claims', value: vault.claimable, color: 'text-amber-500' },
  ].filter(item => item.value)

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-3 bg-muted/50 sm:bg-transparent p-0 sm:p-0 rounded-lg overflow-hidden">
      {items.map((item) => (
        <li
          key={item.label}
          className="p-2 sm:p-3 bg-muted/50 rounded-none sm:rounded-lg flex sm:flex-col items-center sm:items-start justify-between border-b sm:border-0 border-border/20 last:border-0 gap-1"
        >
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className={`text-sm sm:text-lg font-semibold ${item.color}`}>
            ${format(item.value)}
          </span>
        </li>
      ))}
    </ul>
  )
}
