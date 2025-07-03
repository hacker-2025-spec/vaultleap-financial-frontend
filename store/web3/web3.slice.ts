import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import type { ActionsType } from '../store.types'

import type { TUpdateStatusPayload, Web3 } from './web3.types'
import { Web3State } from './web3.state'

export const initialWeb3SliceState: Web3 = {
  ...new Web3State(),
}

export const web3Slice = createSlice({
  reducers: {
    claimFundsTrigger: () => {},
    transferVaultKeysTrigger: () => {},
    withdrawFundsTrigger: () => {},
    updateClaimFundsStatus: (state, { payload }: PayloadAction<TUpdateStatusPayload>) => {
      state.claimFundsStatus = payload.status
      state.claimFundsError = payload.error
    },
    updateTransferVaultKeysStatus: (state, { payload }: PayloadAction<TUpdateStatusPayload>) => {
      state.transferVaultKeysStatus = payload.status
      state.transferVaultKeysError = payload.error
    },
    updateWithdrawFundsStatus: (state, { payload }: PayloadAction<TUpdateStatusPayload>) => {
      state.withdrawFundsStatus = payload.status
      state.withdrawFundsError = payload.error
    },
  },
  name: StoreKeys.Web3,
  initialState: initialWeb3SliceState,
})

export const web3Actions = web3Slice.actions
export const web3Reducer = web3Slice.reducer
export type Web3Actions = ActionsType<typeof web3Actions>
