import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import type { ActionsType } from '../store.types'
import { DirectVaultCreatorState } from './directVaultCreator.state'
import {
  ConfirmKYCDocumentsData,
  DirectVaultCreatorStages,
  KYCVerificationStatus,
  LiquidationAddressCreationData,
  CustomerInfo,
  type DirectVaultCreator,
  CustomerInfoFormData,
  BankInfoFormData,
  DirectVaultBankingInfo,
} from './directVaultCreator.types'
import { BridgeKYCEntity, LiquidationAddressEntity } from '@klydo-io/getrewards-backend-api'

const initState: DirectVaultCreator = { ...new DirectVaultCreatorState() }

const slice = {
  name: StoreKeys.DirectVaultCreator,
  initialState: initState,
  reducers: {
    setCurrentStage: (state: DirectVaultCreator, action: PayloadAction<DirectVaultCreatorStages>) => {
      state.currentStage = action.payload
    },
    resetStore: (state: DirectVaultCreator) => {
      state.currentStage = initState.currentStage
      state.stagesList = initState.stagesList
      state.bridgeKYCEntity = initState.bridgeKYCEntity
      state.kycVerificationStatus = initState.kycVerificationStatus
      state.nextStepLoading = initState.nextStepLoading
      state.retryingKYC = initState.retryingKYC
      state.customerInfo = initState.customerInfo
      state.initializedCurrentCreationStage = initState.initializedCurrentCreationStage
      state.createdLiqAddressInfo = initState.createdLiqAddressInfo
      state.userBankingAccounts = initState.userBankingAccounts
    },
    setNextStepLoading: (state: DirectVaultCreator) => {
      state.nextStepLoading = true
    },
    clearNextStepLoading: (state: DirectVaultCreator) => {
      state.nextStepLoading = false
    },
    setKYCVerificationStatus: (state: DirectVaultCreator, { payload }: PayloadAction<KYCVerificationStatus>) => {
      state.kycVerificationStatus = payload
    },
    setRetryingKYC: (state: DirectVaultCreator) => {
      state.retryingKYC = true
    },
    clearRetryingKYC: (state: DirectVaultCreator) => {
      state.retryingKYC = false
    },
    setBridgeKYCEntity: (state: DirectVaultCreator, { payload }: PayloadAction<BridgeKYCEntity | undefined>) => {
      state.bridgeKYCEntity = payload
    },
    setInitializedCurrentCreationStage: (state: DirectVaultCreator) => {
      state.initializedCurrentCreationStage = true
    },
    clearInitializedCurrentCreationStage: (state: DirectVaultCreator) => {
      state.initializedCurrentCreationStage = false
    },
    setCustomerInfo: (state: DirectVaultCreator, { payload }: PayloadAction<CustomerInfo>) => {
      state.customerInfo = payload
    },
    setUserBankingAccounts: (state: DirectVaultCreator, { payload }: PayloadAction<DirectVaultBankingInfo[]>) => {
      state.userBankingAccounts = payload
    },
    setCreatedLiqAddressInfo: (state: DirectVaultCreator, { payload }: PayloadAction<LiquidationAddressEntity>) => {
      state.createdLiqAddressInfo = payload
    },
    finishPersonalInfoForm: (_: DirectVaultCreator, __: PayloadAction<CustomerInfoFormData & { isNew?: boolean }>) => {},
    confirmKYCDocuments: (_: DirectVaultCreator, __: PayloadAction<ConfirmKYCDocumentsData>) => {},
    // KYC functionality has been moved to the KnowYourCustomer store
    createBankingInfo: (_: DirectVaultCreator, __: PayloadAction<BankInfoFormData>) => {},
    selectBankinInfo: (state: DirectVaultCreator, { payload }: PayloadAction<DirectVaultBankingInfo | null>) => {
      state.selectedBankingInfo = payload
      state.currentStage = DirectVaultCreatorStages.LIQUIDATION_ADDRESS
    },
    finishLiquidationAddressCreation: (_: DirectVaultCreator, __: PayloadAction<LiquidationAddressCreationData>) => {},
    initCurrentCreationStage: () => {},
  },
}

export const directVaultCreatorSlice = createSlice(slice)
export const directVaultCreatorActions = directVaultCreatorSlice.actions
export const directVaultCreatorReducer = directVaultCreatorSlice.reducer
export type DirectVaultCreatorActions = ActionsType<typeof directVaultCreatorActions>
