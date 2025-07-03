import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { VaultUserRole } from '@/store/user/user.types'

import { StoreKeys } from '../store.keys'
import type { ActionsType } from '../store.types'
import { TransactionState } from './transaction.state'
import { TransactionStagesList, TRANSACTION_TYPES, type Transaction, SAGA_TRANSACTION_STATUS } from './transaction.types'
import { VaultDto } from '@klydo-io/getrewards-backend-api'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'

export const initialTransactionSliceState: Transaction = {
  ...new TransactionState(),
}

export const transactionSlice = createSlice({
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true
      return state
    },
    closeModal: (state) => {
      state.isModalOpen = false
      return state
    },
    processVaultCreation: (state, __: PayloadAction<{ config: UnitedWalletConfig; router: AppRouterInstance; isPremium: boolean }>) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.CREATE_VAULT
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.CREATE_VAULT]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.CREATE_VAULT]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processVaultsCreation: (state, { payload: { isSingleVault } }: PayloadAction<{ config: UnitedWalletConfig; router: AppRouterInstance; isPremium: boolean, isSingleVault?: boolean }>) => {
      const transactionType = isSingleVault 
        ? TRANSACTION_TYPES.CREATE_VAULTS_SINGLE 
        : TRANSACTION_TYPES.CREATE_VAULTS

      state.currentProcessedTransaction = transactionType
      state.allStages = TransactionStagesList[transactionType]
      state.reaminingStages = TransactionStagesList[transactionType]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processClaimVaultKeys: (
      state,
      __: PayloadAction<{ router: AppRouterInstance; config: UnitedWalletConfig; privateKey: string; address: string, isNew: boolean }>
    ) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.CLAIM_VAULT_KEY
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.CLAIM_VAULT_KEY]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.CLAIM_VAULT_KEY]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processReclaimVaultKeys: (state, __: PayloadAction<{ router: AppRouterInstance; config: UnitedWalletConfig; address: string }>) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.RECLAIM_VAULT_KEY
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.RECLAIM_VAULT_KEY]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.RECLAIM_VAULT_KEY]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processSendFundsToVault: (
      state,
      __: PayloadAction<{
        router?: AppRouterInstance
        amount: number
        config: UnitedWalletConfig
        vaultAddress: string
        vaultId: string
        refresh?: boolean
        note?: string
      }>
    ) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.SEND_FUNDS_TO_VAULT
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.SEND_FUNDS_TO_VAULT]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.SEND_FUNDS_TO_VAULT]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processClaimUSDC: (state, __: PayloadAction<{ config: UnitedWalletConfig; tokenId: number; tokenAddress: string; role?: VaultUserRole, isNew?: boolean }>) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.CLAIM_REWARD
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.CLAIM_REWARD]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.CLAIM_REWARD]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processTransferVaultKey: (
      state,
      __: PayloadAction<{ config: UnitedWalletConfig; tokenId: number; tokenAddress: string; transferAddress: string }>
    ) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.TRANSFER_VAULT
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.TRANSFER_VAULT]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.TRANSFER_VAULT]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processWithdrawUSDC: (state, __: PayloadAction<{ config: UnitedWalletConfig; amount: number; transferAddress: string, isNew?: boolean }>) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.WITHDRAW_USDC
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.WITHDRAW_USDC]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.WITHDRAW_USDC]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processSelfManagedVaultCreation: (
      state,
      __: PayloadAction<{ config: UnitedWalletConfig; router: AppRouterInstance; isPremium: boolean }>
    ) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.CREATE_SELF_MANAGED_VAULT
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.CREATE_SELF_MANAGED_VAULT]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.CREATE_SELF_MANAGED_VAULT]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    processClaimSelfManagedVaultKeys: (
      state,
      __: PayloadAction<{ vault: VaultDto, config: UnitedWalletConfig }>
    ) => {
      state.currentProcessedTransaction = TRANSACTION_TYPES.CLAIM_SELF_MANAGED_VAULT_KEYS
      state.allStages = TransactionStagesList[TRANSACTION_TYPES.CLAIM_SELF_MANAGED_VAULT_KEYS]
      state.reaminingStages = TransactionStagesList[TRANSACTION_TYPES.CLAIM_SELF_MANAGED_VAULT_KEYS]
      state.error = null
      state.sagaTransactionStatus = SAGA_TRANSACTION_STATUS.IDLE
      state.isModalOpen = true
    },
    nextStage: (state) => {
      if (state.sagaTransactionStatus === SAGA_TRANSACTION_STATUS.PENDING && state.reaminingStages.length > 0) {
        state.currentStage = state.reaminingStages.shift() || null
      }
    },
    changeSagaTransactionStatus: (state, action: PayloadAction<SAGA_TRANSACTION_STATUS>) => {
      state.sagaTransactionStatus = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  name: StoreKeys.Transaction,
  initialState: initialTransactionSliceState,
})

export const transactionActions = transactionSlice.actions
export const transactionReducer = transactionSlice.reducer
export type TransactionActions = ActionsType<typeof transactionActions>
