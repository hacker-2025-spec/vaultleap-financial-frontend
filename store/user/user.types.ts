import {
  VaultDto,
  ReviewStatus,
  VaultInfoDto,
  UserResponseDTO,
  TaxInfoW9FormDto,
  TaxInfo1099FormDto,
  TaxFormVaultInfoDto,
  TaxInfoW8BenFormDto,
  TaxInfoW8BenEFormDto,
  SumSubTokenResponseDTO,
  CustomerEntity,
  BridgeKYCEntity,
  LiquidationAddressEntity,
  VirtualAccountEntity,
  PersonaReviewStatus
} from '@klydo-io/getrewards-backend-api'
import { User as Auth0User } from '@auth0/auth0-spa-js'

import { RequestStatus } from '../store.types'

export interface User {
  avatarUploadStatus: RequestStatus
  fetchUserDataStatus: RequestStatus
  sendUserDataStatus: RequestStatus
  backendData: UserResponseDTO | null
  auth0Data: Auth0User | null
  fetchSumSubDataStatus: RequestStatus
  sumSubData: SumSubTokenResponseDTO
  taxForms: TaxFormVaultInfoDto[]
  fetchUserTaxFormsStatus: RequestStatus
  fetchUserVaultsStatus: RequestStatus
  vaults: VaultDto[]
  liquidationAddresses: LiquidationAddressEntity[]
  virtualAccounts: VirtualAccountEntity[]
  applicantData: ApplicantData
  sendUserInfoStatus: RequestStatus
  userInfo: UserInfo
  watchAllUserVaultsStatus: RequestStatus
  fetchUserVaultStatus: RequestStatus
  userVault: VaultType
  taxFormId: string
  requestAccessStatus: RequestStatus
  showConfetti: boolean
  downloadModalOpen: boolean
  downloadDocumentStatus: RequestStatus
  customer?: CustomerEntity
  bridgeKYC?: BridgeKYCEntity
  userVaults: UserVaultDto[]
  userVaultsStatus: RequestStatus
}

export interface ApplicantData {
  applicantId?: string
  reviewAnswer?: string
  reviewStatus?: ReviewStatus
}

export interface PersonaApplicantData {
  reviewStatus?: PersonaReviewStatus,
}

export interface W9FormDetails extends Partial<TaxInfoW9FormDto> {
  address2?: string
  iReadAndUnderstand?: boolean
  iConsent?: boolean
}

export interface W8BenFormDetails extends Partial<TaxInfoW8BenFormDto> {
  iCertify?: boolean
  iReadAndUnderstand?: boolean
  iConsent?: boolean
}

export interface W8BenEFormDetails extends Partial<TaxInfoW8BenEFormDto> {
  iCertify?: boolean
  iConsent?: boolean
}

export interface UserInfo {
  t1099FormDetails: Partial<TaxInfo1099FormDto>
  w9FormDetails: W9FormDetails
  w8BenFormDetails: W8BenFormDetails
  w8BenEFormDetails: W8BenEFormDetails
}

export enum VaultUserRole {
  MANAGER = 'manager',
  CONTRACTOR = 'contractor',
}

export type VaultType = Omit<VaultInfoDto, 'agreeToTOSAndPP'>

export type UserVaultDto = VaultDto & {
  roleRelativeToUser: VaultUserRole
  heldBySelf?: boolean
  createdAt: number
}
