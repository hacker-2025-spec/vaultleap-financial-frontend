import { BridgeKYCEntity, VirtualAccountEntity } from '@klydo-io/getrewards-backend-api'
import { CustomerInfo, KYCVerificationStatus } from '../directVaultCreator/directVaultCreator.types'
import { bridgeCreatorStagesList } from './virtualAccountCreator'
import { VirtualAccountCreator, VirtualAccountCreatorStages } from './virtualAccountCreator.types'

export class VirtualAccountCreatorState implements VirtualAccountCreator {
  currentStage: VirtualAccountCreatorStages = VirtualAccountCreatorStages.PROVIDE_INFO
  stagesList: VirtualAccountCreatorStages[] = bridgeCreatorStagesList
  kycVerificationStatus: KYCVerificationStatus = KYCVerificationStatus.NOT_STARTED
  nextStepLoading: boolean = false
  retryingKYC: boolean = false
  bridgeKYCEntity: BridgeKYCEntity | null = null
  customerInfo: CustomerInfo | null = null
  initializedCurrentCreationStage: boolean = false
  virtualAccount: VirtualAccountEntity | null = null
}
