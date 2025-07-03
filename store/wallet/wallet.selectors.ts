import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'
import { walletEntityAdapter } from './wallet.slice'

const selectState = createSelector([selectReducer(StoreKeys.Wallet)], (state) => state)

const selectFetchWalletsStatus = createSelector([selectState], (state) => state.fetchWalletsStatus)
const selectCheckingWalletStatus = createSelector([selectState], (state) => state.checkingWalletStatus)
const selectWalletStatus = createSelector([selectState], (state) => state.walletStatus)
const selectAllWallets = createSelector([selectState], (state) => walletEntityAdapter.getSelectors().selectAll(state))

export const walletSelectors = {
  selectAllWallets,
  selectWalletStatus,
  selectFetchWalletsStatus,
  selectCheckingWalletStatus,
}
