import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectCreatorManagerState = createSelector([selectReducer(StoreKeys.DirectVaultCreator)], (state) => state)

const selectCurrentStage = createSelector([selectCreatorManagerState], (state) => state.currentStage)
const selectStagesList = createSelector([selectCreatorManagerState], (state) => state.stagesList)
const selectStagesLength = createSelector([selectCreatorManagerState], (state) => state.stagesList.length)

const selectCurrentStageIndex = createSelector([selectCurrentStage, selectStagesList], (currentStage, stagesList) => {
  return stagesList.findIndex((stage) => stage === currentStage)
})

const selectIsNextStepLoading = createSelector([selectCreatorManagerState], (state) => state.nextStepLoading)
const selectKYCVerificationStatus = createSelector([selectCreatorManagerState], (state) => state.kycVerificationStatus)
const selectIsRetryingKYC = createSelector([selectCreatorManagerState], (state) => state.retryingKYC)

const selectBridgeKYCEntity = createSelector([selectCreatorManagerState], (state) => state.bridgeKYCEntity)
const selectCustomerInfo = createSelector([selectCreatorManagerState], (state) => state.customerInfo)
const selectUserBankingInfo = createSelector([selectCreatorManagerState], (state) => state.userBankingAccounts)
const selectSelectedBankingInfo = createSelector([selectCreatorManagerState], (state) => state.selectedBankingInfo)

const selectTOSLink = createSelector([selectBridgeKYCEntity], (bridgeKYCEntity) => bridgeKYCEntity?.tos_link)

const selectInitializedCurrentCreationStage = createSelector([selectCreatorManagerState], (state) => state.initializedCurrentCreationStage)
const selectCreatedLiqAddressInfo = createSelector([selectCreatorManagerState], (state) => state.createdLiqAddressInfo)

export const directVaultCreatorSelectors = {
  selectStagesList,
  selectCurrentStage,
  selectStagesLength,
  selectCurrentStageIndex,
  selectIsNextStepLoading,
  selectKYCVerificationStatus,
  selectIsRetryingKYC,
  selectBridgeKYCEntity,
  selectTOSLink,
  selectInitializedCurrentCreationStage,
  selectCustomerInfo,
  selectUserBankingInfo,
  selectSelectedBankingInfo,
  selectCreatedLiqAddressInfo,
}
