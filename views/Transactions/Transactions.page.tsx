'use client'

import React, { useState } from 'react'
import { Search, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react'
import { MainHeader } from '@/components/features/dashboard/MainHeader/MainHeader'
import { SubSection } from '@/components/layout/SubSection/SubSection'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Mock transaction data - would be replaced with actual API data
const mockTransactions = [
  {
    id: '1',
    title: 'Payment to John Doe',
    amount: 500,
    type: 'sent',
    date: 'Apr 23, 2023',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  },
  {
    id: '2',
    title: 'Payment from Alice Smith',
    amount: 750,
    type: 'received',
    date: 'Apr 22, 2023',
    address: '0x8B76f8c4d5f5a8f5e7d4c3b2a1',
  },
  {
    id: '3',
    title: 'Currency conversion',
    amount: 300,
    type: 'converted',
    date: 'Apr 21, 2023',
    address: '0x9F12c4d5f5a8f5e7d4c3b2a1',
  },
  {
    id: '4',
    title: 'Payment to Bob Johnson',
    amount: 250.5,
    type: 'sent',
    date: 'Apr 20, 2023',
    address: '0x5A76f8c4d5f5a8f5e7d4c3b2a1',
  },
  {
    id: '5',
    title: 'Payment from Charlie Brown',
    amount: 1000,
    type: 'received',
    date: 'Apr 19, 2023',
    address: '0x3B76f8c4d5f5a8f5e7d4c3b2a1',
  },
  {
    id: '6',
    title: 'Payment to David Miller',
    amount: 75.25,
    type: 'sent',
    date: 'Apr 18, 2023',
    address: '0x2C76f8c4d5f5a8f5e7d4c3b2a1',
  },
  {
    id: '7',
    title: 'Payment from Eve Wilson',
    amount: 300,
    type: 'received',
    date: 'Apr 17, 2023',
    address: '0x1D76f8c4d5f5a8f5e7d4c3b2a1',
  },
  {
    id: '8',
    title: 'Currency conversion',
    amount: 150,
    type: 'converted',
    date: 'Apr 16, 2023',
    address: '0x0E76f8c4d5f5a8f5e7d4c3b2a1',
  },
]

const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const TransactionsPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState<'all' | 'received' | 'sent' | 'converted'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Received', value: 'received' },
    { label: 'Sent', value: 'sent' },
    { label: 'Converted', value: 'converted' }
  ]

  // Use the filter parameter to fetch only the relevant transactions
  const { data: transactions = [], isLoading } = useFilteredTransactions(filterValue)
  
  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => {
    return searchQuery === '' ||
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.from && transaction.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.to && transaction.to.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  return (
    <>
      <MainHeader />
      <SubSection title="Transactions">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 px-5 py-4">
            <CardTitle className="text-lg">Transaction History</CardTitle>
            <div className="relative max-w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 w-full"
              />
            </div>
          </CardHeader>

          <div className="flex flex-row gap-2.5 p-3 px-6 border-b border-border/10">
            {FILTERS.map(filter => (
              <Button
                key={filter.label}
                variant={filterValue === filter.value ? "default" : "outline"}
                size="sm"
                className="rounded-full text-xs font-medium"
                onClick={() => setFilterValue(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="flex-grow">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center p-6 border-b border-border/10 hover:bg-muted/20 transition-colors"
                >
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full mr-4
                    ${transaction.type === 'sent'
                      ? 'bg-red-100 text-red-500'
                      : transaction.type === 'received'
                        ? 'bg-green-100 text-green-500'
                        : 'bg-purple-100 text-purple-500'
                    }
                  `}>
                    {transaction.type === 'sent'
                      ? <ArrowUp className="h-5 w-5" />
                      : transaction.type === 'received'
                        ? <ArrowDown className="h-5 w-5" />
                        : <RefreshCw className="h-5 w-5" />
                    }
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-base font-medium">
                      {transaction.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {transaction.type === 'sent' ? 'to ' : transaction.type === 'received' ? 'from ' : ''}
                      {formatAddress(transaction.address)} • {transaction.date}
                    </p>
                  </div>

                  <span className={`
                    font-semibold
                    ${transaction?.type === 'sent'
                      ? 'text-red-500'
                      : transaction?.type === 'received'
                        ? 'text-green-500'
                        : 'text-purple-500'
                    }
                  `}>
                    {transaction?.type === 'sent' ? '-' : transaction.type === 'received' ? '+' : ''}
                    ${transaction?.amount?.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No transactions found
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <CardFooter className="border-t border-border/10 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={page === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </CardFooter>
          )}
        </Card>
      </SubSection>
    </>
  )
}

export default TransactionsPage
