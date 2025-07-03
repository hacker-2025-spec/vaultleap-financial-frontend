import React from 'react'
import { ArrowDown, ArrowUp, RefreshCw, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCurrencyPreferences } from '@/stores/settingsStore'
import { formatTransactionDate } from '@/utils/formatTransactionDate'
import { TransactionPopover } from '@/components/ui/transaction-popover'
import type { Transaction } from '@/components/features/transactions/MainTransactionsWidget/MainTransactionsWidget.types'
import { TransactionItemType } from '@/client'

export const WalletTransactionItem = ({
  type,
  amount,
  senderAddress,
  recipientAddress,
  date,
  hash,
  link,
  title,
  description,
  currency,
  recipientName,
  senderName,
  source,
}: Transaction) => {
  const currencyPreferences = useCurrencyPreferences()

  const isSent = type === TransactionItemType.PAYMENT_SENT
  const isReceived = [
    TransactionItemType.PAYMENT_RECEIVED,
    TransactionItemType.FUNDS_RECEIVED,
    TransactionItemType.FUNDS_SCHEDULED,
    TransactionItemType.PAYMENT_SUBMITTED,
    TransactionItemType.IN_REVIEW,
  ].includes(type)

  const getCurrencyLabel = () => {
    if (currency) return currency.split(' ')[0]
    return currencyPreferences === 'EUR' ? 'EURC' : 'USDC'
  }

  const getBridgeIcon = () => {
    const wrapperClass = 'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-sm'
    const sizeClass = 'w-3.5 h-3.5 rounded-sm'

    let bgColor = 'bg-gray-300'
    let animate = ''

    switch (type) {
      case TransactionItemType.FUNDS_SCHEDULED:
        bgColor = 'bg-red-500'
        animate = 'animate-pulse'
        break
      case TransactionItemType.PAYMENT_SUBMITTED:
        bgColor = 'bg-orange-400'
        animate = 'animate-pulse'
        break
      case TransactionItemType.FUNDS_RECEIVED:
      case TransactionItemType.PAYMENT_RECEIVED:
        bgColor = 'bg-green-500'
        break
    }

    return (
      <div className={wrapperClass}>
        <div className={cn(sizeClass, bgColor, animate)} />
      </div>
    )
  }

  const getIcon = () => {
    const bgColor = isSent ? 'bg-red-100' : 'bg-green-100'
    const iconColor = isSent ? 'text-red-500' : 'text-green-600'
    const Icon = isSent ? ArrowUp : ArrowDown

    return (
      <div className={cn('w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center', bgColor)}>
        <Icon className={cn('w-5 h-5', iconColor)} />
      </div>
    )
  }

  const getTitle = () => {
    if (isSent) return recipientName || title
    if (isReceived) return senderName || title
    return title || 'Transaction'
  }

  const getSubtitle = () => {
    if (isSent) return 'Sent by you'
    if (isReceived) return 'Received by you'
    return description || ''
  }

  const getAmountColor = () => {
    if (isSent) return 'text-red-500'
    if (isReceived) return 'text-green-500'
    return 'text-gray-700'
  }

  const getAmountPrefix = () => {
    if (isSent) return '-'
    if (isReceived) return '+'
    return ''
  }

  const transactionData: Transaction = {
    title,
    description,
    amount,
    type,
    date,
    hash,
    link,
    recipientAddress,
    senderAddress,
    currency,
    recipientName,
    senderName,
    source,
  }

  return (
    <TransactionPopover transaction={transactionData} currencyLabel={getCurrencyLabel()}>
      <div className="flex flex-col gap-2 sm:flex-row items-center rounded-xl bg-white hover:bg-gray-50 transition cursor-pointer px-4 py-3 mb-1 w-full">
        <div className="flex items-center justfy-between gap-3 min-w-0 w-full flex-1 sm:mr-4">
          {source === 'bridge' ? getBridgeIcon() : getIcon()}
          <div className="flex flex-col min-w-0 flex-1 gap-1">
            <p className="text-sm font-medium text-gray-900 truncate">{getTitle()}</p>
            <p className="text-xs text-gray-500">
              {getSubtitle()}
              {date && <span className="text-gray-400 ml-1">• {formatTransactionDate(date)}</span>}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full sm:w-fit px-2">
          <div className={cn('text-sm font-semibold flex-shrink-0 whitespace-nowrap', getAmountColor())}>
            {getAmountPrefix()}
            {amount?.toFixed(2)} {getCurrencyLabel()}
          </div>
          {hash && link && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                window.open(link, '_blank')
              }}
              className="h-8 w-8 text-gray-400 hover:text-gray-600 ml-2"
            >
              <ExternalLinkIcon size={16} />
            </Button>
          )}
        </div>
      </div>
    </TransactionPopover>
  )
}

export interface WalletTransactionItemProps extends Transaction {}
