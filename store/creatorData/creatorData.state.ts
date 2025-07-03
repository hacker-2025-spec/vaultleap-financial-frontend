import { SINGLE_VAULTS_TEMPLATES } from './creatorData.const'
import { getNewVaults, initialRoles } from './creatorData.utils'
import { CreatorData, TemplateType, TVaultData, TPreviousData } from './creatorData.types'

export class CreatorDataState implements CreatorData {
  templateType: TemplateType = TemplateType.SELF_MANAGED
  isReadyPrevious: boolean = false
  isLoadingPrevious: boolean = false
  hasErrorPrevious: boolean = false
  isUsingPreviousData: boolean = false
  hasPreviousData: boolean = false
  previousData: TPreviousData['previousData'] = undefined
  singleVault: TVaultData = {
    projectName: '',
    projectNamePlaceholder: TemplateType.SPLIT_PAYMENTS,
    isProfitSwitchActive: false,
    profitSwitchName: '',
    profitSwitchAmount: 0,
    profitSwitchAddress: '',
    roles: initialRoles(),
  }
  multipleVaults: TVaultData[] = getNewVaults(SINGLE_VAULTS_TEMPLATES)
  ownerName: string = ''
  ownerEmail: string = ''
  is1099TaxFormActive: boolean = false
  businessName: string = ''
  address: string = ''
  city: string = ''
  state: string = ''
  country: string = ''
  zip: string = ''
  ssn: string = ''
  ein: string = ''
  totalAmount: number = 0
  agreeToTOSAndPP: boolean = false
}
