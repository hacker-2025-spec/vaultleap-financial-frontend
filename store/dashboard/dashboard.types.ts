import { VaultDto } from '@klydo-io/getrewards-backend-api'
import { RequestStatus } from '../store.types'

export type VaultDetails = VaultDto
export interface IDashboardState {
  sendFundsModalInfo: null | {
    vaultId: string
  }
  vaultDetailsInfoModal: null | {
    vaultId: string
  }
  vaultsDetailsCollection: Record<string, VaultDetails>
  fetchVaultDetailsStatus: RequestStatus
}
