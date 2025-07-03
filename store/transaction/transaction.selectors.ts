import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.Transaction)], (state) => state)

const selectIsModalOpen = createSelector([selectState], (state) => state.isModalOpen)
const selectCurrentProcessedTransaction = createSelector([selectState], (state) => state.currentProcessedTransaction)
const selectCurrentProcessedTransactionStage = createSelector([selectState], (state) => state.currentStage)
const selectCurrentProcessedTransactionStages = createSelector([selectState], (state) => state.allStages)
const selectCurrentProcessedTransactionRemainingStages = createSelector([selectState], (state) => state.reaminingStages)
const selectCurrentProcessedTransactionStatus = createSelector([selectState], (state) => state.sagaTransactionStatus)
const selectError = createSelector([selectState], (state) => state.error)

export const transactionSelectors = {
  selectIsModalOpen,
  selectCurrentProcessedTransaction,
  selectCurrentProcessedTransactionStage,
  selectCurrentProcessedTransactionStages,
  selectCurrentProcessedTransactionRemainingStages,
  selectCurrentProcessedTransactionStatus,
  selectError,
}
