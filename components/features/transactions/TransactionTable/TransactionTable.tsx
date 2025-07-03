import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import MainTransactionWidgetItem from '../MainTransactionsWidgetItem/MainTransactionsWidgetItem'
import { Transaction } from '../MainTransactionsWidget/MainTransactionsWidget.types'

interface TransactionTableProps {
  transactions: Transaction[]
  isLoading?: boolean
}

interface GroupedTransactions {
  [date: string]: Transaction[]
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, isLoading }) => {
  const groupedTransactions = useMemo(() => {
    const groups: GroupedTransactions = {}

    transactions.forEach((transaction) => {
      // Format the date from the transaction's date field
      let dateKey = 'Unknown Date'

      if (transaction.date) {
        try {
          const transactionDate = new Date(transaction.date)
          if (!isNaN(transactionDate.getTime())) {
            // Format as "7 Jun 2025" style
            dateKey = transactionDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          }
        } catch (error) {
          console.error('Error parsing transaction date:', error)
        }
      }

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(transaction)
    })

    return groups
  }, [transactions])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-gray-500">Loading transactions...</div>
      </div>
    )
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6 px-8">
        {/* Transaction Groups */}
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
            <div key={date}>
              {/* Date Header */}
              <h3 className="text-gray-600 text-sm font-medium mb-4">{date}</h3>

              {/* Transactions for this date */}
              <div className="space-y-0">
                {dateTransactions.map((transaction, index) => (
                  <MainTransactionWidgetItem key={index} {...transaction} variant="table" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && !isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">No transactions found</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TransactionTable
