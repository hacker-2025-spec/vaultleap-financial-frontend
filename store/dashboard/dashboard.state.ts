import { RequestStatus } from '../store.types'
import { IDashboardState } from './dashboard.types'

export class DashboardState implements IDashboardState {
  sendFundsModalInfo = null
  vaultDetailsInfoModal = null
  vaultsDetailsCollection = {}
  fetchVaultDetailsStatus = RequestStatus.Idle
}
