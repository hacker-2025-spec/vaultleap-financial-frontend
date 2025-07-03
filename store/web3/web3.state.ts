import { RequestStatus } from '../store.types'
import type { Web3 } from './web3.types'

export class Web3State implements Web3 {
  claimFundsStatus: RequestStatus = RequestStatus.Idle
  claimFundsError: string = ''
  transferVaultKeysStatus: RequestStatus = RequestStatus.Idle
  transferVaultKeysError: string = ''
  withdrawFundsStatus: RequestStatus = RequestStatus.Idle
  withdrawFundsError: string = ''
}
