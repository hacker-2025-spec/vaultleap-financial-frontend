import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VaultsCreationStatusDto, VaultsCreatorDto } from '@klydo-io/getrewards-backend-api'

import { StoreKeys } from '@/store/store.keys'
import { ActionsType } from '@/store/store.types'

import { VaultsState } from './vaults.state'
import { IVaultsState, type Vaults } from './vaults.types'

export const initialVaultsSliceState: IVaultsState = {
  ...new VaultsState(),
}

export const vaultsSlice = createSlice({
  reducers: {
    fetchVaultsData: (state, __: PayloadAction<string>) => {
      state.isLoading = true
    },
    fetchVaultsDataSuccess: (state, action: PayloadAction<Vaults>) => {
      state.isReady = true
      state.isLoading = false
      state.data = action.payload
    },
    createVaults: (_, __: PayloadAction<{ address: string, isPremium: boolean }>) => {},
    createVaultsSuccess: (state, action: PayloadAction<VaultsCreatorDto>) => {
      state.data = action.payload
    },
    fetchVaultsCreationStatus: (_) => {},
    updateVaultsCreationStatus: (state, action: PayloadAction<VaultsCreationStatusDto>) => {
      state.data.creationStatus = action.payload.status
    },
  },
  name: StoreKeys.Vaults,
  initialState: initialVaultsSliceState,
})

export const vaultsActions = vaultsSlice.actions
export const vaultsReducer = vaultsSlice.reducer
export type VaultsActions = ActionsType<typeof vaultsActions>