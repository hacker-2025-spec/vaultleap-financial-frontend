import { useWalletConfig } from '@/hooks/useWalletConfig.ts'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getTransactionItemsOptions, getTransactionItemsInfiniteOptions } from '@/client/@tanstack/react-query.gen.ts'
import { TransactionItemType, type TransactionItemResponseDto } from '@/client/index.ts'
import type { Transaction } from '@/components/features/transactions/MainTransactionsWidget/MainTransactionsWidget.types.ts'

export const transactionQueryKeys = {
  all: ['transactions'] as const,
}
const transformTransactionItem =
  (getExplorerUrl: (txHash: string) => string) =>
  (item: TransactionItemResponseDto): Transaction => {
    // Extract recipient information from receiverUser or senderUser objects
    const getRecipientInfo = (item: TransactionItemResponseDto) => {
      const recipientName = item.receiverUser?.name ?? item.receiverUser?.email ?? undefined
      const recipientAddress = item.receiverUser?.destinationAddress
      return { recipientName, recipientAddress }
    }

    const getSenderInfo = (item: TransactionItemResponseDto) => {
      const senderName = item.senderUser?.name ?? item.senderUser?.email ?? item.senderName
      const senderAddress = item.senderUser?.destinationAddress

      return { senderName, senderAddress }
    }

    const { recipientName, recipientAddress } = getRecipientInfo(item)
    const { senderName, senderAddress } = getSenderInfo(item)

    const getTransactionTitle = (item: TransactionItemResponseDto): string => {
      const description = item.description || ''

      switch (item.type) {
        case TransactionItemType.FUNDS_RECEIVED:
        case TransactionItemType.IN_REVIEW:
          if (senderName) {
            return `${senderName}`.trim()
          }
          return description ?? 'Funds Received'

        case TransactionItemType.PAYMENT_RECEIVED:
          return description ?? `Payment Received`

        case TransactionItemType.PAYMENT_SUBMITTED:
          return description ?? `Payment Submitted`
        case 'refund':
          return `Refund  from ${senderName}`
        default:
          return description || 'Transaction'
      }
    }
    const getTransactionDescription = (item: TransactionItemResponseDto): string => {
      switch (item.type) {
        case 'funds_received':
          return ``
        case TransactionItemType.PAYMENT_SENT:
          return `Sent`
        case 'refund':
          return `Refund`
        default:
          return ''
      }
    }

    return {
      title: getTransactionTitle(item),
      description: getTransactionDescription(item),
      amount: item.amount,
      link: getExplorerUrl(item.hash ?? ''),
      type: item.type,
      date: new Date(item.occurredAt).toISOString(), // Convert timestamp to ISO string
      currency: item.currency,
      recipientAddress,
      senderAddress,
      senderName,
      recipientName,
      hash: item.hash,
      source: item.source,
    } as Transaction
  }

interface TransactionFilters {
  virtualAccountId?: string
  type?: 'funds_received' | 'funds_sent'
  source?: 'bridge' | 'alchemy'
  currency?: string
  startDate?: string
  endDate?: string
  limit?: number
  cursor?: string
}

export const useTransactionItems = (options: TransactionFilters = {}) => {
  const queryOptions = {
    query: {
      ...options,
      limit: options.limit || 30, // Default to 10 items for the widget
    },
  }
  const { chain } = useWalletConfig()

  const getExplorerUrl = (txHash: string) => {
    if (!chain) return ''
    const explorerUrls: Record<number, string> = {
      8453: 'https://basescan.org',
      84532: 'https://sepolia.basescan.org',
    }
    const explorerUrl = explorerUrls[chain.id]
    return explorerUrl ? `${explorerUrl}/tx/${txHash}` : ''
  }

  const query = useQuery({
    ...getTransactionItemsOptions(queryOptions),
    select: (data) => {
      return {
        ...data,
        transactions: data.items.map(transformTransactionItem(getExplorerUrl)),
      }
    },
  })

  return {
    ...query,
    transactions: query.data?.transactions || [],
    count: query.data?.count || 0,
    limit: query.data?.limit || 0,
    nextCursor: query.data?.nextCursor,
  }
}

// Infinite query hook for paginated transactions
export const useInfiniteTransactionItems = (options: Omit<TransactionFilters, 'cursor'> = {}) => {
  const { chain } = useWalletConfig()

  const getExplorerUrl = (txHash: string) => {
    if (!chain) return ''
    const explorerUrls: Record<number, string> = {
      8453: 'https://basescan.org',
      84532: 'https://sepolia.basescan.org',
    }
    const explorerUrl = explorerUrls[chain.id]
    return explorerUrl ? `${explorerUrl}/tx/${txHash}` : ''
  }

  const queryOptions = {
    query: {
      ...options,
      limit: options.limit || 30,
    },
  }

  const query = useInfiniteQuery({
    ...getTransactionItemsInfiniteOptions(queryOptions),
    getNextPageParam: (lastPage) => {
      // Handle both string and object cursor types
      const cursor = lastPage.nextCursor
      if (typeof cursor === 'string') {
        return cursor || undefined
      }
      return cursor ? JSON.stringify(cursor) : undefined
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      transactions: data.pages.flatMap((page) => page.items.map(transformTransactionItem(getExplorerUrl))),
    }),
  })

  return {
    ...query,
    transactions: query.data?.transactions || [],
    hasNextPage: true,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  }
}

// Hook specifically for the main transactions widget
export const useMainTransactionsWidget = () => {
  return useTransactionItems({
    limit: 30, // Show only 5 recent transactions in the widget
  })
}
