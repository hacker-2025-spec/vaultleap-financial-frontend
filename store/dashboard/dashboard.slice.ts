import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { DashboardState } from './dashboard.state'
import { IDashboardState, VaultDetails } from './dashboard.types'
import { ActionsType, RequestStatus } from '../store.types'
import { VaultUserRole } from '../user/user.types'

export const initailState: IDashboardState = {
  ...new DashboardState(),
}

export const dashboardSlice = createSlice({
  reducers: {
    openSendFundsModal(state, action: PayloadAction<{ vaultId: string }>) {
      state.sendFundsModalInfo = action.payload
    },
    closeSendFundsModal(state) {
      state.sendFundsModalInfo = null
    },
    openVaultDetailsInfoModal(state, action: PayloadAction<{ vaultId: string }>) {
      state.vaultDetailsInfoModal = action.payload
    },
    closeVaultDetailsInfoModal(state) {
      state.vaultDetailsInfoModal = null
    },
    addVaultDetails(state, action: PayloadAction<VaultDetails>) {
      state.vaultsDetailsCollection[action.payload.id] = action.payload
    },
    deleteVaultDetailsById(state, action: PayloadAction<VaultDetails['id']>) {
      delete state.vaultsDetailsCollection[action.payload]
    },
    fetchVaultDetails(state, _: PayloadAction<{ id: string; role: VaultUserRole }>) {
      state.fetchVaultDetailsStatus = RequestStatus.Loading
    },
    fetchVaultDetailsSuccess(state) {
      state.fetchVaultDetailsStatus = RequestStatus.Succeeded
    },
    fetchVaultDetailsFailed(state) {
      state.fetchVaultDetailsStatus = RequestStatus.Failed
    },
  },
  name: StoreKeys.App,
  initialState: initailState,
})

export const dashboardActions = dashboardSlice.actions
export const dashboardReducer = dashboardSlice.reducer
export type DashboardActions = ActionsType<typeof dashboardActions>
