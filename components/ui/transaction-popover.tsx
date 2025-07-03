import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ClipboardCopy, ExternalLink as ExternalLinkIcon, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatTransactionDate } from '@/utils/formatTransactionDate'
import { pushNotification } from '@/utils/toast'
import type { Transaction } from '@/components/features/transactions/MainTransactionsWidget/MainTransactionsWidget.types'

interface TransactionPopoverProps {
  transaction: Transaction
  children: React.ReactNode
  currencyLabel: string
}

// Global state to track open popovers
let currentOpenPopover: string | null = null
const popoverCallbacks = new Set<(id: string | null) => void>()

const usePopoverState = (id: string) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const callback = (openId: string | null) => {
      if (openId !== id) {
        setIsOpen(false)
      }
    }
    popoverCallbacks.add(callback)
    return () => {
      popoverCallbacks.delete(callback)
    }
  }, [id])

  const handleOpenChange = (open: boolean) => {
    if (open) {
      currentOpenPopover = id
      popoverCallbacks.forEach(callback => callback(id))
      setIsOpen(true)
    } else {
      if (currentOpenPopover === id) {
        currentOpenPopover = null
      }
      setIsOpen(false)
    }
  }

  return { isOpen, handleOpenChange }
}

export const TransactionPopover: React.FC<TransactionPopoverProps> = ({
  transaction,
  children,
  currencyLabel
}) => {
  const popoverId = `transaction-${transaction.hash || transaction.date || Math.random()}`
  const { isOpen, handleOpenChange } = usePopoverState(popoverId)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleCopy = async (value: string, type: 'address' | 'hash') => {
    try {
      await navigator.clipboard.writeText(value)
      console.log("copied")
      if (type === 'address') {
        pushNotification('Address Copied!', { variant: 'success' })
      } else {
        pushNotification('Transaction Hash Copied!', { variant: 'success' })
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }

    // Set a 500ms delay before opening
    const timeout = setTimeout(() => {
      handleOpenChange(true)
    }, 500)

    setHoverTimeout(timeout)
  }

  const handleMouseLeave = () => {
    // Clear the timeout if mouse leaves before delay completes
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    // Close immediately when mouse leaves
    handleOpenChange(false)
  }

  const getAvatarContent = (userProfileName: string) => {
    return userProfileName?.charAt(0).toUpperCase() || '?'
  }



  const displayAddress = transaction.recipientAddress || transaction.senderAddress || ''
  const transactionAvatar = transaction.type === 'sent' ? transaction.recipientName : transaction.senderName

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="bottom"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="space-y-4">
          {/* Header with Avatar and Title */}
          <div className="flex items-start gap-3">
            <Avatar className="w-12 h-12 flex-shrink-0  rounded-full">
              <AvatarFallback className="text-white text-lg font-semibold bg-blue-500">
                {transactionAvatar ? getAvatarContent(transactionAvatar) : <User className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-900 truncate leading-loose">
                {transaction.title || `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Transaction`}
              </span>
              <p className="text-sm text-gray-500">
                {transaction.type === 'sent' ? 'Sent by you' : transaction.type === 'received' ? 'Received by you' : 'Converted by you'}
              </p>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3">
            {/* Amount */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Amount:</span>
              <span className={cn(
                'font-semibold',
                transaction.type === 'sent' ? 'text-red-500' : transaction.type === 'received' ? 'text-green-500' : 'text-gray-700'
              )}>
                {transaction.type === 'sent' ? '-' : '+'}
                {transaction.amount} {currencyLabel}
              </span>
            </div>

            {/* Address */}
            {displayAddress && (
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-700">
                  {transaction.type === 'sent' ? 'To:' : 'From:'}
                </span>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <span className="text-xs font-mono text-gray-600 truncate flex-1">
                    {displayAddress}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(displayAddress, 'address')}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <ClipboardCopy size={12} />
                  </Button>
                </div>
              </div>
            )}

            {/* Transaction Hash */}
            {transaction.hash && (
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Transaction Hash:</span>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <span className="text-xs font-mono text-gray-600 truncate flex-1">
                    {transaction.hash}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(transaction.hash!, 'hash')}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <ClipboardCopy size={12} />
                  </Button>
        
                </div>
              </div>
            )}

            {/* Date */}
            {transaction.date && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Date:</span>
                <span className="text-sm text-gray-600">
                  {formatTransactionDate(transaction.date)}
                </span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {transaction.link && (
            <div className="pt-2 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(transaction.link, '_blank')}
                className="w-full"
              >
                <ExternalLinkIcon size={14} className="mr-2" />
                View on Explorer
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}
