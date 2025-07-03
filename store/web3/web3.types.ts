import { RequestStatus } from '../store.types'

export interface Web3 {
  transferVaultKeysStatus: RequestStatus
  transferVaultKeysError?: string
  claimFundsStatus: RequestStatus
  claimFundsError?: string
  withdrawFundsStatus: RequestStatus
  withdrawFundsError?: string
}

export type TUpdateStatusPayload = {
  status: RequestStatus
  error?: string
}
