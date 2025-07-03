import { EntityState } from '@reduxjs/toolkit'
import { WalletDto, WALLET_STATUS } from '@klydo-io/getrewards-backend-api'

import { RequestStatus } from '../store.types'

export interface WalletStatuses {
  fetchWalletsStatus: RequestStatus
  checkingWalletStatus: RequestStatus
  walletStatus?: WALLET_STATUS | undefined
}

export type WalletState = WalletStatuses & EntityState<WalletDto, string>
