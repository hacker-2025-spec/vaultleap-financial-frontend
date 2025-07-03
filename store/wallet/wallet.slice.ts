import { WALLET_STATUS, WalletDto } from '@klydo-io/getrewards-backend-api'
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { type ActionsType, RequestStatus } from '../store.types'
import { WalletState } from './wallet.types'
import { WalletStatusesState } from './wallet.state'

export const walletEntityAdapter = createEntityAdapter({
  selectId: (wallet: WalletDto) => wallet.address,
  sortComparer: (a, b) => a.address.localeCompare(b.address),
})

export const initialWalletSliceState: WalletState = walletEntityAdapter.getInitialState({ ...new WalletStatusesState() })

export const walletSlice = createSlice({
  reducers: {
    fetchUserWallets: () => {},
    fetchUserWalletsFailure: (state) => {
      state.fetchWalletsStatus = RequestStatus.Failed
    },
    fetchUserWalletsSuccess: (state, action: PayloadAction<WalletDto[]>) => {
      walletEntityAdapter.setAll(state, action.payload)
      state.fetchWalletsStatus = RequestStatus.Succeeded
    },
    resetWalletStatus: (state) => {
      state.checkingWalletStatus = RequestStatus.Idle
      state.walletStatus = undefined
    },
    checkWalletStatus: (state, __: PayloadAction<Pick<WalletDto, 'address' | 'walletType'>>) => {
      state.checkingWalletStatus = RequestStatus.Loading
      state.walletStatus = undefined
    },
    checkWalletStatusSuccess: (state, action: PayloadAction<WALLET_STATUS>) => {
      state.checkingWalletStatus = RequestStatus.Succeeded
      state.walletStatus = action.payload
    },
    saveUserWallet: (_, __: PayloadAction<Pick<WalletDto, 'address' | 'walletType'>>) => {},
    saveUserWalletSuccess: (state, action: PayloadAction<WalletDto>) => {
      state.checkingWalletStatus = RequestStatus.Idle
      walletEntityAdapter.addOne(state, action.payload)
    },
  },
  name: StoreKeys.Wallet,
  initialState: initialWalletSliceState,
})

export const walletActions = walletSlice.actions
export const walletReducer = walletSlice.reducer
export type WalletActions = ActionsType<typeof walletActions>
