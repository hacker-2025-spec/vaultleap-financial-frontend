import { DirectVaultCreatorStages } from './directVaultCreator.types'

export const bridgeCreatorStagesList: DirectVaultCreatorStages[] = [
  DirectVaultCreatorStages.PROVIDE_INFO,
  DirectVaultCreatorStages.KYC,
  DirectVaultCreatorStages.BANK_ACCOUNT,
  DirectVaultCreatorStages.LIQUIDATION_ADDRESS,
] 

export const stagesDescriptions: Record<DirectVaultCreatorStages, string> = {
  [DirectVaultCreatorStages.PROVIDE_INFO]: 'Provide info',
  [DirectVaultCreatorStages.KYC]: 'KYC',
  [DirectVaultCreatorStages.BANK_ACCOUNT]: 'Bank Account',
  [DirectVaultCreatorStages.LIQUIDATION_ADDRESS]: 'Create Liquidation Address'
}