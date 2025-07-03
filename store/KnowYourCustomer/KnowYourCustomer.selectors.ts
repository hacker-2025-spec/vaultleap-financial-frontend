import { createSelector } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.KnowYourCustomer)], (state) => state)

// Transform the status to avoid identity function warning
export const selectKycVerificationStatus = createSelector([selectState], (state) => {
  return state.kycVerificationStatus || 'NOT_STARTED'
})
// Transform the status to avoid identity function warning
export const selectTosStatus = createSelector([selectState], (state) => {
  return state.tosStatus || 'NOT_STARTED'
})
// Transform boolean to avoid identity function warning
export const selectIsKycRetrying = createSelector([selectState], (state) => {
  return !!state.retryingKYC
})

// Transform the entity to avoid identity function warning
export const selectBridgeKYCEntity = createSelector([selectState], (state) => {
  return state.bridgeKYCEntity ? { ...state.bridgeKYCEntity } : null
})

// Transform the info to avoid identity function warning
export const selectCustomerInfo = createSelector([selectState], (state) => {
  return state.customerInfo ? { ...state.customerInfo } : null
})

// Transform boolean to avoid identity function warning
export const selectIsPolling = createSelector([selectState], (state) => {
  return !!state.isPolling
})

// Transform boolean to avoid identity function warning
export const selectIsTosPolling = createSelector([selectState], (state) => {
  return !!state.isTosPolling
})

// Transform number to avoid identity function warning
export const selectPollingInterval = createSelector([selectState], (state) => {
  return state.pollingInterval || 0
})

// Transform string to avoid identity function warning
export const selectVaultType = createSelector([selectState], (state) => {
  return state.vaultType || ''
})

// Transform boolean to avoid identity function warning
export const selectLocalTosAccepted = createSelector([selectState], (state) => {
  return !!state.localTosAccepted
})

// Get the TOS link from the bridgeKYCEntity
export const selectTosLink = createSelector([selectState], (state) => {
  return state.bridgeKYCEntity?.tos_link || ''
})

export const knowYourCustomerSelectors = {
  selectKycVerificationStatus,
  selectTosStatus,
  selectIsKycRetrying,
  selectBridgeKYCEntity,
  selectCustomerInfo,
  selectIsPolling,
  selectIsTosPolling,
  selectPollingInterval,
  selectVaultType,
  selectLocalTosAccepted,
  selectTosLink
}
