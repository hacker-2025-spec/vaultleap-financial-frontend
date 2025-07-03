'use client'

import React, { useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { TransactionModalComponent } from './TransactionModal.component'
import type { TransactionModalContainerProps } from './TransactionModal.types'
import { useIsTransactionModalOpen, useUserActions } from '@/stores/userStore'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import { TRANSACTION_STATUS, TRANSACTION_TYPES } from '@/types/transaction'
import { useTransactionItems } from '@/api/transactions/index.ts'

export const TransactionModalContainer: React.FC<TransactionModalContainerProps> = (props) => {
  const isModalOpen = useIsTransactionModalOpen()
  const { setTransactionModalOpen } = useUserActions()

  // Get customer details to fetch transactions
  const { data: userData } = useUserCustomerDetails()

  // Fetch transaction items using the new API
  const { transactions, isLoading, error } = useTransactionItems({
  })

  // Mock transaction state - replace with real transaction state management when available
  const transactionState = {
    currentProcessedTransaction: TRANSACTION_TYPES.CREATE_VAULT,
    currentStage: null,
    allStages: [],
    remainingStages: [],
    status: TRANSACTION_STATUS.IDLE,
    error: error?.message || null,
  }

  const canOpenModal = isModalOpen

  const handleCloseModal = () => setTransactionModalOpen(false)

  useEffect(() => {
    if (canOpenModal) {
      document.body.style.width = '100vw'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [canOpenModal])

  return (
    <Dialog open={canOpenModal} onOpenChange={(open) => !open && handleCloseModal()}>
      <DialogContent className="p-0 border-none bg-transparent max-w-none overflow-y-auto max-h-screen">
        <TransactionModalComponent
          {...props}
          currentProcessedTransactionType={transactionState.currentProcessedTransaction!}
          currentProcessedTransactionStage={transactionState.currentStage}
          currentProcessedTransactionStages={transactionState.allStages}
          currentProcessedTransactionRemainingStages={transactionState.remainingStages}
          currentProcessedTransactionStatus={transactionState.status}
          error={transactionState.error}
          handleCloseModal={handleCloseModal}
          transactions={transactions}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
