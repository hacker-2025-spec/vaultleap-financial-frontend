import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.Dashboard)], (state) => state)

const selectSendFundsModalInfo = createSelector([selectState], (state) => state.sendFundsModalInfo)
const selectVaultDetailsModalInfo = createSelector([selectState], (state) => state.vaultDetailsInfoModal)
const selectFetchVaultDetailsStatus = createSelector([selectState], (state) => state.fetchVaultDetailsStatus)
const selectVaultDetailsById = (id: string) => createSelector([selectState], (state) => state.vaultsDetailsCollection[id])

export const dashboardSelectors = {
  selectSendFundsModalInfo,
  selectVaultDetailsModalInfo,
  selectVaultDetailsById,
  selectFetchVaultDetailsStatus,
}
