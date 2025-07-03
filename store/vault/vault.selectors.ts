import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.Vault)], (state) => state)

const selectIsReady = createSelector([selectState], (state) => state.isReady)
const selectIsLoading = createSelector([selectState], (state) => state.isLoading)
const selectHasError = createSelector([selectState], (state) => state.hasError)

const selectStateData = createSelector([selectState], (state) => state.data)

const selectSummaryData = createSelector([selectStateData], (state) => ({
  id: state.id,
  vaultAddress: state.vaultAddress,
  projectName: state.projectName,
  vaultRoles: state.roles,
  isTaxFormsEnabled: Boolean(state.taxFormEnabled),
  isProfitSwitchActive: Boolean(state.profitSwitchName),
  profitSwitchAmount: state.profitSwitchAmount,
  klydoFee: state.vaultFeePercentage,
  ownerEmail: state.ownerEmail,
}))

const selectIsLoaded = createSelector([selectStateData], (state) => Boolean(state.id))
const selectIsTaxFormsEnabled = createSelector([selectStateData], (state) => Boolean(state.taxFormEnabled))

const selectVaultId = createSelector([selectStateData], (state) => state.id)
const selectVaultAddress = createSelector([selectStateData], (state) => state.vaultAddress)

export const vaultSelectors = {
  selectState,
  selectIsReady,
  selectIsLoading,
  selectHasError,
  selectStateData,
  selectVaultId,
  selectVaultAddress,
  selectSummaryData,
  selectIsTaxFormsEnabled,
  selectIsLoaded,
}
