import { BridgeKYCEntity, VirtualAccountEntity } from '@klydo-io/getrewards-backend-api'
import { CustomerInfo, KYCVerificationStatus } from '../directVaultCreator/directVaultCreator.types'

export enum VirtualAccountCreatorStages {
  PROVIDE_INFO = 'PROVIDE_INFO',
  KYC = 'KYC',
  CONFIRM = 'CONFIRM',
}

// Update resetStore reducer when adding new fields to the store
export type VirtualAccountCreator = {
  currentStage: VirtualAccountCreatorStages
  stagesList: VirtualAccountCreatorStages[]
  nextStepLoading: boolean
  kycVerificationStatus: KYCVerificationStatus
  retryingKYC: boolean
  bridgeKYCEntity: BridgeKYCEntity | null
  customerInfo: CustomerInfo | null
  initializedCurrentCreationStage: boolean
  virtualAccount: VirtualAccountEntity | null
}
