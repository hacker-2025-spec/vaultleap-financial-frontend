import React from 'react'
import { SAGA_TRANSACTION_STATUS, TAvailableTransactionStages, TRANSACTION_TYPES } from '@/store/transaction/transaction.types'

export type TransactionModalContainerProps = React.HTMLAttributes<HTMLDivElement>

export type TransactionModalComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  currentProcessedTransactionType: TRANSACTION_TYPES
  currentProcessedTransactionStage: TAvailableTransactionStages | null
  currentProcessedTransactionStages: TAvailableTransactionStages[]
  currentProcessedTransactionRemainingStages: TAvailableTransactionStages[]
  currentProcessedTransactionStatus: SAGA_TRANSACTION_STATUS
  error: string | null
  handleCloseModal: () => void
}
