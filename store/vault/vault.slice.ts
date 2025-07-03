import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import  { ActionsType } from '../store.types'

import { IVaultState } from './vault.types'
import { VaultState } from './vault.state'
import { TRANSACTION_STATUS, VaultDto } from '@klydo-io/getrewards-backend-api'

export const initialVaultSliceState: IVaultState = {
  ...new VaultState(),
}

export const vaultSlice = createSlice({
  reducers: {
    fetchVaultData: (state, __: PayloadAction<string>) => {
      state.isLoading = true
    },
    fetchVaultDataSuccess: (state, action: PayloadAction<VaultDto>) => {
      state.isReady = false
      state.isLoading = false
      state.data = action.payload
    },
    createVault: (_, __: PayloadAction<{ address: string, isPremium: boolean }>) => {},
    createSelfManagedVault: (_, __: PayloadAction<{ address: string, isPremium: boolean }>) => {},
    createSelfManagedVaultSuccess: (state, action: PayloadAction<VaultDto>) => {
      state.data = action.payload
    },
    createVaultSuccess: (state, action: PayloadAction<VaultDto>) => {
      state.data = action.payload
    },
    fetchVaultCreationStatus: (_) => {},
    fetchSelfManagedVaultCreationStatus: () => {},
    fetchSelfManagedVaultCreationStatusById: (_, __: PayloadAction<{ vaultId: string }>) => {},
    updateVaultCreationStatus: (state, payload: PayloadAction<{ status: TRANSACTION_STATUS }>) => {
      state.data.transactionStatus = payload.payload.status
    },
    updateSelfManagedVaultCreationStatus: (
      state,
      payload: PayloadAction<{ status: TRANSACTION_STATUS, info?: { a?: string, p?: string }}>
    ) => {
      state.data.transactionStatus = payload.payload.status
    }
  },
  name: StoreKeys.Vault,
  initialState: initialVaultSliceState,
})

export const vaultActions = vaultSlice.actions
export const vaultReducer = vaultSlice.reducer
export type VaultActions = ActionsType<typeof vaultActions>
