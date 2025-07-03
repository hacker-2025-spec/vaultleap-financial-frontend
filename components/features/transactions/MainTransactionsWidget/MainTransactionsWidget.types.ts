import { TransactionItemType } from '@/client'

export interface Transaction {
  title: string
  hash: string
  link: string
  amount: number
  source: 'bridge' | 'alchemy'
  type: TransactionItemType
  date?: string // ISO date string for tooltip display
  currency?: string // Currency from API (e.g., 'USD', 'USDC', 'EURC')
  recipientName?: string // Name or email of recipient/sender
  recipientAddress?: string // Destination address for tooltip
  senderName?: string
  senderAddress?: string
  description?: string // Transaction description
}
