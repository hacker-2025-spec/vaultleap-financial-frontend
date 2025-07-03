import type { VaultWithTaxInfoDto } from '@klydo-io/getrewards-backend-api'

export enum TemplateType {
  NONE = 'None',
  SPLIT_PAYMENTS = "Jamie's Podcast Team",
  SINGLE_PAYMENT = "Jesse's Coffee Co.",
  SELF_MANAGED = 'SELF_MANAGED'
}

export type TShareRole = {
  name: string
  sharePercentage: number
  emails: string[]
  id: string
  count: number
  placeholder?: string
}

export type TShareRoleForEmailDisplay = Pick<TShareRole, 'name' | 'id' | 'sharePercentage'> & { email: string; roleNumber: number }

export type TOwnerData = {
  ownerName: string
  ownerEmail: string
}

export type TBusinessData = {
  businessName: string
  address: string
  city: string
  state: string
  country: string
  zip: string
  ssn: string
  ein: string
}

export type TProfitSwitchData = {
  isProfitSwitchActive: boolean
  profitSwitchName: string
  profitSwitchAmount: number
  profitSwitchAddress: string
}

export type TVaultData = TProfitSwitchData & {
  projectName: string
  projectNamePlaceholder: string
  roles: TShareRole[]
}

export type TPreviousData = {
  isLoadingPrevious: boolean
  isReadyPrevious: boolean
  hasErrorPrevious: boolean
  isUsingPreviousData: boolean
  hasPreviousData: boolean
  previousData: VaultWithTaxInfoDto | undefined
}

export type TVaultDataForEmailDisplay = Omit<TVaultData, 'roles'> & {
  roles: TShareRoleForEmailDisplay[]
}

export type CreatorData =
  TOwnerData &
  TBusinessData &
  TPreviousData & {
    templateType: TemplateType
    singleVault: TVaultData
    multipleVaults: TVaultData[]
    is1099TaxFormActive: boolean
    totalAmount: number
    agreeToTOSAndPP: boolean
  }
