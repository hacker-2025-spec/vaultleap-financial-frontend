import { RequestStatus } from '../store.types'
import type { WalletStatuses } from './wallet.types'

export class WalletStatusesState implements WalletStatuses {
  fetchWalletsStatus: RequestStatus = RequestStatus.Idle
  checkingWalletStatus: RequestStatus = RequestStatus.Idle
  walletStatus = undefined
}
