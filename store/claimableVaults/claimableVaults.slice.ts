import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { ActionsType, RequestStatus } from '../store.types'
import { ClaimableVaults, ClaimableVaultsState, ClaimableVaultType } from './claimableVaults.types'

export const initialClaimableVaultsSliceState: ClaimableVaultsState = {
  fetchVaultKeysStatus: RequestStatus.Idle,
  vaultKeys: [],
  fetchVaultStatus: RequestStatus.Idle,
  vault: {
    projectName: '',
    ownerEmail: '',
    ownerName: '',
    adminWalletAddress: '',
    roles: [],
    userId: '',
    vaultFeePercentage: 0,
    id: '',
    shareholderManagerAddress: '',
    watching: true,
    vaultFundsStatistics: [],
  }
}

export const claimableVaultsSlice = createSlice({
  reducers: {
    fetchVaultKeys: (state, _action: PayloadAction<string>) => {
      state.fetchVaultKeysStatus = RequestStatus.Loading
      state.fetchVaultStatus = RequestStatus.Loading
    },
    fetchVaultKeysSuccess: (state, action: PayloadAction<ClaimableVaults[]>) => {
      state.fetchVaultKeysStatus = RequestStatus.Succeeded
      state.vaultKeys = action.payload
    },
    fetchVaultKeysFailure: (state) => {
      state.fetchVaultKeysStatus = RequestStatus.Failed
      state.fetchVaultStatus = RequestStatus.Failed
    },
    fetchVault: (state, _action: PayloadAction<{ id: string, tokenId: string }>) => {
      state.fetchVaultStatus = RequestStatus.Loading
      state.vault = {
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }
    },
    fetchVaultSuccess: (state, action: PayloadAction<ClaimableVaultType>) => {
      state.fetchVaultStatus = RequestStatus.Succeeded
      state.vault = action.payload
    },
    fetchVaultFailed: (state) => {
      state.fetchVaultStatus = RequestStatus.Failed
      state.vault = {
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }
    },
    resetVaultKeys: (state) => {
      state = initialClaimableVaultsSliceState
      return state
    },
  },
  name: StoreKeys.ClaimableVaults,
  initialState: initialClaimableVaultsSliceState,
})

export const claimableVaultsActions = claimableVaultsSlice.actions
export const claimableVaultsReducer = claimableVaultsSlice.reducer
export type ClaimableVaultsActions = ActionsType<typeof claimableVaultsActions>
