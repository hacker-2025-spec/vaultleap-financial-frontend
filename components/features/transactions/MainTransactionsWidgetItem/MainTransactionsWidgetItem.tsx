import { MainTransactionsWidgetItemProps } from './MainTransactionsWidgetItem.types'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyPreferences } from '@/stores/settingsStore'
import { cva, type VariantProps } from 'class-variance-authority'
import { formatWidgetRelativeTime } from '@/utils/formatTransactionDate'
import { TransactionItemType } from '@/client'

const transactionItemVariants = cva(
  'flex flex-row justify-between items-center rounded-lg hover:bg-gray-50 transition-colors duration-200',
  {
    variants: {
      variant: {
        widget: 'py-5 px-3',
        table: 'py-4 px-4 border-b border-gray-100 hover:bg-gray-50',
      },
    },
    defaultVariants: {
      variant: 'widget',
    },
  }
)

interface TransactionItemProps extends MainTransactionsWidgetItemProps, VariantProps<typeof transactionItemVariants> {}

export default function MainTransactionWidgetItem(props: TransactionItemProps) {
  const { variant = 'widget', ...tx } = props
  const currencyPreferences = useCurrencyPreferences()

  const isSent = tx.type === TransactionItemType.PAYMENT_SENT
  const isReceived =
    tx.type === TransactionItemType.PAYMENT_RECEIVED ||
    TransactionItemType.FUNDS_SCHEDULED ||
    TransactionItemType.PAYMENT_SUBMITTED ||
    TransactionItemType.FUNDS_RECEIVED ||
    TransactionItemType.IN_REVIEW

  const getCurrencyLabel = () => {
    if (tx.currency) return tx.currency.split(' ')[0]
    return currencyPreferences === 'EUR' ? 'EURC' : 'USDC'
  }

  const getIcon = () => {
    const iconColor = isSent ? 'text-red-500' : 'text-green-600'
    const Icon = isSent ? ArrowUp : ArrowDown
    const bgColor = isSent ? 'bg-red-100' : 'bg-green-100'

    return (
      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', bgColor)}>
        <Icon className={cn('w-4 h-4', iconColor)} />
      </div>
    )
  }

  const getTitle = () => {
    if (isSent) return tx.recipientName || tx.title
    if (isReceived) return tx.senderName || tx.title
    return tx.title || 'Transaction'
  }

  const getSubtitle = () => {
    if (isSent) return 'Sent by you'
    if (isReceived) return 'Received by you'
    return tx.description || ''
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

  const getBridgeIcon = () => {
    const sizeClass = 'w-3.5 h-3.5' // smaller but visible
    const wrapperClass = 'w-8 h-8 flex items-center justify-center rounded-sm'

    let bgColor = 'bg-gray-300'
    let animate = ''
    switch (tx.type) {
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
      default:
        bgColor = 'bg-gray-300'
    }

    return (
      <div className={wrapperClass}>
        <div className={cn(sizeClass, 'rounded-sm', bgColor, animate)} />
      </div>
    )
  }

  return (
    <div className={transactionItemVariants({ variant })}>
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
        {tx.source === 'bridge' ? getBridgeIcon() : getIcon()}
        <div className="flex flex-col min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{getTitle()}</p>
          <p className="text-xs text-gray-500">
            {getSubtitle()}
            {tx.date && <span className="text-gray-400 ml-1">• {formatWidgetRelativeTime(tx.date)}</span>}
          </p>
        </div>
      </div>
      <div className={cn('text-sm font-semibold flex-shrink-0 whitespace-nowrap', getAmountColor())}>
        {getAmountPrefix()}
        {tx.amount} {getCurrencyLabel()}
      </div>
    </div>
  )
}
