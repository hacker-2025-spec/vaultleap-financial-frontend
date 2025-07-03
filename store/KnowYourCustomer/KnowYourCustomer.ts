import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import type { ActionsType } from '../store.types'
import { BridgeKYCEntity } from '@klydo-io/getrewards-backend-api'
import { CustomerInfo } from '../directVaultCreator/directVaultCreator.types'

export enum VaultType {
  DIRECT = 'DIRECT',
  VIRTUAL = 'VIRTUAL',
}

export enum KYCVerificationStatus {
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
}

export enum KYCVerificationServerStatus {
  NOT_STARTED = "not_started",
  PENDING = "pending",
  INCOMPLETE = "incomplete",
  AWAITING_UBO = "awaiting_ubo",
  MANUAL_REVIEW = "manual_review",
  UNDER_REVIEW = "under_review",
  REJECTED = "rejected",
  APPROVED = "approved",
}

export enum TOSStatus {
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
}

export enum TOSServerStatus {
  PENDING = "pending",
  APPROVED = "approved",
}

type KYCState = {
  kycVerificationStatus: KYCVerificationStatus
  tosStatus: TOSStatus
  retryingKYC: boolean
  bridgeKYCEntity?: BridgeKYCEntity
  customerInfo?: CustomerInfo
  isPolling: boolean
  isTosPolling: boolean
  pollingInterval: number
  vaultType?: VaultType
  localTosAccepted: boolean
}

const initialState: KYCState = {
  kycVerificationStatus: KYCVerificationStatus.NOT_STARTED,
  tosStatus: TOSStatus.NOT_STARTED,
  retryingKYC: false,
  bridgeKYCEntity: undefined,
  customerInfo: undefined,
  isPolling: false,
  isTosPolling: false,
  pollingInterval: 10000, // 10 seconds by default
  vaultType: undefined,
  localTosAccepted: false
}

const slice = {
  name: StoreKeys.KnowYourCustomer,
  initialState,
  reducers: {
    resetKYCState: () => initialState,
    setKYCVerificationStatus: (state: KYCState, { payload }: PayloadAction<KYCVerificationStatus>) => {
      state.kycVerificationStatus = payload
    },
    setRetryingKYC: (state: KYCState) => {
      state.retryingKYC = true
    },
    clearRetryingKYC: (state: KYCState) => {
      state.retryingKYC = false
    },
    setBridgeKYCEntity: (state: KYCState, { payload }: PayloadAction<BridgeKYCEntity | undefined>) => {
      state.bridgeKYCEntity = payload
    },
    setCustomerInfo: (state: KYCState, { payload }: PayloadAction<CustomerInfo | undefined>) => {
      state.customerInfo = payload
    },
    setPolling: (state: KYCState, { payload }: PayloadAction<boolean>) => {
      state.isPolling = payload
    },
    setPollingInterval: (state: KYCState, { payload }: PayloadAction<number>) => {
      state.pollingInterval = payload
    },
    setVaultType: (state: KYCState, { payload }: PayloadAction<VaultType>) => {
      state.vaultType = payload
    },
    setTOSStatus: (state: KYCState, { payload }: PayloadAction<TOSStatus>) => {
      state.tosStatus = payload
    },
    setTosPolling: (state: KYCState, { payload }: PayloadAction<boolean>) => {
      state.isTosPolling = payload
    },
    setLocalTosAccepted: (state: KYCState, { payload }: PayloadAction<boolean>) => {
      state.localTosAccepted = payload
    },
    confirm: (_: KYCState, __: PayloadAction<{ inquiryId: string }>) => {},
    startPolling: () => {},
    startTosPolling: () => {},
    retry: () => {},
    stopPolling: () => {},
    stopTosPolling: () => {},
    init: () => {},
    checkKycStatus: () => {},
    checkTosStatus: () => {}
  },
}

export const knowYourCustomerSlice = createSlice(slice)
export const knowYourCustomerActions = knowYourCustomerSlice.actions
export const knowYourCustomerReducer = knowYourCustomerSlice.reducer
export type KnowYourCustomerActions = ActionsType<typeof knowYourCustomerActions>