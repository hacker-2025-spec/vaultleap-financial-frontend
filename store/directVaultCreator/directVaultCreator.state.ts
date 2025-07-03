import { BridgeKYCEntity, LiquidationAddressEntity } from '@klydo-io/getrewards-backend-api'
import { bridgeCreatorStagesList } from './directVaultCreator'
import {
  CustomerInfo,
  DirectVaultBankingInfo,
  DirectVaultCreator,
  DirectVaultCreatorStages,
  KYCVerificationStatus,
} from './directVaultCreator.types'

export class DirectVaultCreatorState implements DirectVaultCreator {
  currentStage: DirectVaultCreatorStages = DirectVaultCreatorStages.PROVIDE_INFO
  stagesList: DirectVaultCreatorStages[] = bridgeCreatorStagesList
  nextStepLoading: boolean = false
  kycVerificationStatus: KYCVerificationStatus = KYCVerificationStatus.NOT_STARTED
  retryingKYC: boolean = false
  bridgeKYCEntity: BridgeKYCEntity | undefined = undefined
  customerInfo: CustomerInfo | undefined = undefined
  userBankingAccounts: DirectVaultBankingInfo[] | null = null
  selectedBankingInfo: DirectVaultBankingInfo | null = null
  initializedCurrentCreationStage: boolean = false
  vaultCreationFinished: boolean = false
  createdLiqAddressInfo: LiquidationAddressEntity | undefined = undefined
}
