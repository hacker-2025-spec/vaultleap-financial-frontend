import { VirtualAccountCreatorStages } from './virtualAccountCreator.types'

export const bridgeCreatorStagesList: VirtualAccountCreatorStages[] = [
  VirtualAccountCreatorStages.PROVIDE_INFO,
  VirtualAccountCreatorStages.KYC,
  VirtualAccountCreatorStages.CONFIRM,
] 

export const stagesDescriptions: Record<VirtualAccountCreatorStages, string> = {
  [VirtualAccountCreatorStages.PROVIDE_INFO]: 'Provide info',
  [VirtualAccountCreatorStages.KYC]: 'KYC',
  [VirtualAccountCreatorStages.CONFIRM]: 'Finish',
}