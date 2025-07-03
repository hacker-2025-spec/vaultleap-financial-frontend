import {
  UserResponseDTO,
  TaxFormVaultInfoDto,
  SumSubTokenResponseDTO,
  CustomerEntity,
  BridgeKYCEntity,
  LiquidationAddressEntity,
  VirtualAccountEntity,
  PersonaInquiryIdResponseDTO,
} from '@klydo-io/getrewards-backend-api'
import { User as Auth0User } from '@auth0/auth0-spa-js'

import { RequestStatus } from '../store.types'
import { LiquidationAddressDetails } from './sagas/fetchUserLiquidationAddress/fetchUserLiquidationAddress.saga'
import { VirtualAccountDetails } from './sagas/fetchUserVirtualAccount/fetchUserVirtualAccount.saga'
import { PersonaApplicantData, ApplicantData, User, UserInfo, UserVaultDto, VaultType } from './user.types'

export class UserState implements User {
  avatarUploadStatus: RequestStatus = RequestStatus.Idle
  fetchUserDataStatus: RequestStatus = RequestStatus.Idle
  fetchUserDataPrivyStatus: RequestStatus = RequestStatus.Idle
  sendUserDataStatus: RequestStatus = RequestStatus.Idle
  backendData: UserResponseDTO | null = null
  backendDataPrivy: UserResponseDTO | null = null
  auth0Data: Auth0User | null = null
  fetchSumSubDataStatus: RequestStatus = RequestStatus.Idle
  fetchPersonaDataStatus: RequestStatus = RequestStatus.Idle
  sumSubData: SumSubTokenResponseDTO = { token: '', userId: '' }
  personaData: PersonaInquiryIdResponseDTO = { inquiryId: '' }
  taxForms: TaxFormVaultInfoDto[] = []
  fetchUserTaxFormsStatus: RequestStatus = RequestStatus.Idle
  fetchUserVaultsStatus: RequestStatus = RequestStatus.Idle
  vaults: UserVaultDto[] = []
  liquidationAddresses: LiquidationAddressEntity[] = []
  virtualAccounts: VirtualAccountEntity[] = []
  applicantData: ApplicantData = {}
  personaApplicationData: PersonaApplicantData = {}
  sendUserInfoStatus: RequestStatus = RequestStatus.Idle
  userInfo: UserInfo = {
    t1099FormDetails: {},
    w9FormDetails: {},
    w8BenFormDetails: {},
    w8BenEFormDetails: {},
  }
  watchAllUserVaultsStatus: RequestStatus = RequestStatus.Idle
  fetchUserVaultStatus: RequestStatus = RequestStatus.Idle
  userVault: VaultType = {
    projectName: '',
    ownerEmail: '',
    ownerName: '',
    adminWalletAddress: '',
    roles: [],
    userId: '',
    vaultFeePercentage: 0,
    id: '',
    shareholderManagerAddress: '',
    watching: true,
    vaultFundsStatistics: [],
  }
  userLiquidationAddress: LiquidationAddressDetails | null = null
  userVirtualAccount: VirtualAccountDetails | null = null
  taxFormId: string = ''
  requestAccessStatus: RequestStatus = RequestStatus.Idle
  showConfetti: boolean = false
  downloadModalOpen: boolean = false
  downloadDocumentStatus: RequestStatus = RequestStatus.Idle
  customer?: CustomerEntity
  bridgeKYC?: BridgeKYCEntity
  userVaults: UserVaultDto[] = []
  userVaultsStatus: RequestStatus = RequestStatus.Idle
}
