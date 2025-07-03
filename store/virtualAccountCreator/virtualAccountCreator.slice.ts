import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import type { ActionsType } from '../store.types'
import { VirtualAccountCreatorStages, VirtualAccountCreator } from './virtualAccountCreator.types'
import {
  BridgeKYCEntity,
  CreateVirtualAccountDto,
  VirtualAccountEntity,
} from '@klydo-io/getrewards-backend-api'
import { VirtualAccountCreatorState } from './virtualAccountCreator.state'
import {
  KYCVerificationStatus,
  CustomerInfo,
  CustomerInfoFormData,
  ConfirmKYCDocumentsData,
} from '../directVaultCreator/directVaultCreator.types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const initState = { ...new VirtualAccountCreatorState() }

const slice = {
  name: StoreKeys.VirtualAccountCreator,
  initialState: initState,
  reducers: {
    setCurrentStage: (state: VirtualAccountCreator, action: PayloadAction<VirtualAccountCreatorStages>) => {
      state.currentStage = action.payload
    },
    resetStore: (state: VirtualAccountCreator) => {
      state.currentStage = initState.currentStage
      state.stagesList = initState.stagesList
      state.bridgeKYCEntity = initState.bridgeKYCEntity
      state.kycVerificationStatus = initState.kycVerificationStatus
      state.nextStepLoading = initState.nextStepLoading
      state.retryingKYC = initState.retryingKYC
      state.customerInfo = initState.customerInfo
      state.initializedCurrentCreationStage = initState.initializedCurrentCreationStage
    },
    setNextStepLoading: (state: VirtualAccountCreator) => {
      state.nextStepLoading = true
    },
    clearNextStepLoading: (state: VirtualAccountCreator) => {
      state.nextStepLoading = false
    },
    setKYCVerificationStatus: (state: VirtualAccountCreator, { payload }: PayloadAction<KYCVerificationStatus>) => {
      state.kycVerificationStatus = payload
    },
    setRetryingKYC: (state: VirtualAccountCreator) => {
      state.retryingKYC = true
    },
    clearRetryingKYC: (state: VirtualAccountCreator) => {
      state.retryingKYC = false
    },
    setBridgeKYCEntity: (state: VirtualAccountCreator, { payload }: PayloadAction<BridgeKYCEntity | null>) => {
      state.bridgeKYCEntity = payload
    },
    setInitializedCurrentCreationStage: (state: VirtualAccountCreator) => {
      state.initializedCurrentCreationStage = true
    },
    clearInitializedCurrentCreationStage: (state: VirtualAccountCreator) => {
      state.initializedCurrentCreationStage = false
    },
    setCustomerInfo: (state: VirtualAccountCreator, { payload }: PayloadAction<CustomerInfo>) => {
      state.customerInfo = payload
    },
    // setCreateVirtualAccountInfo: (state: VirtualAccountCreator, { payload }: PayloadAction<CreateBridgeVirtualAccountDto>) => {
    //   state.virtualAccountForm = payload
    //   state.currentStage = VirtualAccountCreatorStages.CONFIRM
    // },
    setVirtualAccount: (state: VirtualAccountCreator, { payload }: PayloadAction<VirtualAccountEntity>) => {
      state.virtualAccount = payload
    },
    createVirtualAccount: (_: VirtualAccountCreator, __: PayloadAction<CreateVirtualAccountDto & { router?: AppRouterInstance }>) => {},
    finishPersonalInfoForm: (_: VirtualAccountCreator, __: PayloadAction<CustomerInfoFormData>) => {},
    confirmKYCDocuments: (_: VirtualAccountCreator, __: PayloadAction<ConfirmKYCDocumentsData>) => {},
    // KYC functionality has been moved to the KnowYourCustomer store
    initCurrentCreationStage: () => {},
  },
}

export const virtualAccountCreatorSlice = createSlice(slice)
export const virtualAccountCreatorActions = virtualAccountCreatorSlice.actions
export const virtualAccountCreatorReducer = virtualAccountCreatorSlice.reducer
export type VirtualAccountCreatorActions = ActionsType<typeof virtualAccountCreatorActions>
