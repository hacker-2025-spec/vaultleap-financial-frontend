import { CreatorStages } from './creatorManager.types'

export const defaultOrderedStagesList: CreatorStages[] = [
  CreatorStages.CHOOSE_TEMPLATE,
  CreatorStages.SET_ROLES,
  CreatorStages.SHARE_DISTRIBUTION,
  CreatorStages.PROVIDE_EMAILS,
  CreatorStages.PROVIDE_DETAILS,
  CreatorStages.CONFIRM,
]

export const customOrderedStagesList: CreatorStages[] = [
  CreatorStages.CHOOSE_TEMPLATE,
  CreatorStages.SET_VAULTS,
  // TODO: uncomment when we want to rollback profit switch functionality for 'Send It Direct' template
  // CreatorStages.SET_PROFIT_SWITCH,
  CreatorStages.PROVIDE_DETAILS,
  CreatorStages.CONFIRM_MULTIPLE,
]

export const selfManagedVaultOrderedStagesList: CreatorStages[] = [
  CreatorStages.CHOOSE_TEMPLATE,
  CreatorStages.SET_NAME,
  CreatorStages.SELF_MANAGED_KYC,
  CreatorStages.CONFIRM_SELF_MANAGED
] 

export const selfManagedVaultNonPremiumStagesList: CreatorStages[] = [
  CreatorStages.SET_NAME,
  CreatorStages.SELF_MANAGED_KYC,
  CreatorStages.CONFIRM_SELF_MANAGED
]

export const stagesDescriptions: Record<CreatorStages, string> = {
  [CreatorStages.CHOOSE_TEMPLATE]: 'Template',
  [CreatorStages.SET_ROLES]: 'Roles',
  [CreatorStages.SET_VAULTS]: 'Vaults',
  [CreatorStages.SHARE_DISTRIBUTION]: 'Share',
  [CreatorStages.SET_PROFIT_SWITCH]: 'Enable Vaults Profit Switch Feature',
  [CreatorStages.PROVIDE_EMAILS]: 'Emails',
  [CreatorStages.PROVIDE_DETAILS]: 'Details',
  [CreatorStages.CONFIRM]: 'Deploy',
  [CreatorStages.CONFIRM_MULTIPLE]: 'Deploy',
  [CreatorStages.CONFIRM_SELF_MANAGED]: 'Deploy',
  [CreatorStages.SET_NAME]: 'Details',
  [CreatorStages.SELF_MANAGED_KYC]: 'KYC',
  [CreatorStages.FINISEHD]: 'VAULT CREATED',
  [CreatorStages.NOT_STARTED]: 'NOT STARTED',
}