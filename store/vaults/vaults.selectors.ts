import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.Vaults)], (state) => state)

const selectIsReady = createSelector([selectState], (state) => state.isReady)
const selectIsLoading = createSelector([selectState], (state) => state.isLoading)
const selectHasError = createSelector([selectState], (state) => state.hasError)

const selectStateData = createSelector([selectState], (state) => state.data)

const selectVaultsId = createSelector([selectStateData], (state) => state.id)

const selectSummaryData = createSelector([selectStateData], (state) => ({
  vaults: state.vaults
}))

export const vaultsSelectors = {
  selectState,
  selectIsReady,
  selectHasError,
  selectVaultsId,
  selectIsLoading,
  selectStateData,
  selectSummaryData
}