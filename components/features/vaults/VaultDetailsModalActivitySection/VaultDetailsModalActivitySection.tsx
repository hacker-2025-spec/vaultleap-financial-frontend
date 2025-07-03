'use client'

import { VaultDetails } from '@/store/dashboard/dashboard.types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'

const transactions = [
  {
    id: 1,
    title: 'Vault Funded',
    amount: 500.0,
    type: 'deposit',
    date: '2 days ago',
  },
  {
    id: 2,
    title: 'Claim by Sarah Johnson',
    amount: -175.0,
    type: 'withdrawal',
    date: '3 days ago',
  },
  {
    id: 3,
    title: 'Vault Funded',
    amount: 1000.0,
    type: 'deposit',
    date: '1 week ago',
  },
]

interface Props {
  vault: VaultDetails
}

export const VaultDetailsModalActivitySection = ({ vault: _vault }: Props) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <ScrollArea className="h-[150px] w-full">
        <ul className="w-full">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="p-2.5 border-b border-border/20 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-0.5">
                <div className="flex items-center gap-1.5">
                  {transaction.amount >= 0 ? (
                    <ArrowDownCircle className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <ArrowUpCircle className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span className="font-medium text-sm">{transaction.title}</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground pl-5">{transaction.date}</div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
