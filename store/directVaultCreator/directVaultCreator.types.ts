import { BankingInfoEntity, BridgeKYCEntity, LiquidationAddressEntity } from "@klydo-io/getrewards-backend-api"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export enum DirectVaultCreatorStages {
  PROVIDE_INFO = 'PROVIDE_INFO',
  KYC = 'KYC',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  LIQUIDATION_ADDRESS = 'LIQUIDATION_ADDRESS'
}

export enum CustomerType {
  INDIVIDUAL = "individual",
  BUSINESS = "business"
}

export enum BankAccountType {
  IBAN = "iban",
  US_ACCOUNT = "us_account"
}

export enum IbanAccountOwnerType {
  INDIVIDUAL = "individual",
  BUSINESS = "business"
}

export enum IbanAccountOwnerBridgeType {
  INDIVIDUAL = "individual",
  BUSINESS = "business"
}

export enum PaymentRailType {
  ACH = "ach",
  ACH_SAME_DAY = "ach_same_day",
  WIRE = "wire",
  SEPA = "sepa",
  // Blockchain payment rails for crypto destinations
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
  BASE = "base",
  ARBITRUM = "arbitrum",
  AVALANCHE = "avalanche",
  OPTIMISM = "optimism",
  SOLANA = "solana",
  STELLAR = "stellar",
  TRON = "tron",
  BTC = "btc"
}

export enum KYCVerificationStatus {
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
  INCOMPLETE = "INCOMPLETE"
}

export enum KYCVerificationServerStatus {
  NOT_STARTED = "not_started",
  PENDING = "pending",
  INCOMPLETE = "incomplete",
  AWAITING_UBO = "awaiting_ubo",
  MANUAL_REVIEW = "manual_review",
  UNDER_REVIEW = "under_review",
  REJECTED = "rejected",
  APPROVED = "approved",
}

export type DirectVaultBankingInfo = BankingInfoEntity & {
  hasLiquidationAddresses: boolean;
  destinationPaymentRail?: PaymentRailType;
}

// Update resetStore reducer when adding new fields to the store
export type DirectVaultCreator = {
  currentStage: DirectVaultCreatorStages
  stagesList: DirectVaultCreatorStages[]
  nextStepLoading: boolean
  kycVerificationStatus: KYCVerificationStatus
  retryingKYC: boolean
  bridgeKYCEntity: BridgeKYCEntity | undefined
  customerInfo: CustomerInfo | undefined
  userBankingAccounts: DirectVaultBankingInfo[] | null
  selectedBankingInfo: DirectVaultBankingInfo | null
  initializedCurrentCreationStage: boolean
  createdLiqAddressInfo: LiquidationAddressEntity | undefined
}

export type CustomerInfoFormData = {
  type: CustomerType
  fullName: string
  email: string
}

export type CustomerInfo = {
  customerId: string
  type: CustomerType
  fullName: string
  email: string
}

export type ConfirmKYCDocumentsData = {
  inquiryId: string
}

export type BankInfoFormData = {
  type: BankAccountType
  accountOwnerName: string
  bankName: string

  usRoutingNumber?: string
  usAccountNumber?: string
  destinationPaymentRail?: PaymentRailType

  iban?: string
  ibanBankIdentifierCode?: string
  ibanAccountOwnerType?: IbanAccountOwnerType,
  ibanCountryCode?: string,
  ibanHolderFirstName?: string
  ibanHolderLastName?: string
  ibanBusinessName?: string

  addressLine1: string
  addressLine2: string
  city: string
  state?: string
  countryCode?: string
  zip: string

  currency: 'usd' | 'eur'
}

export type LiquidationAddressCreationData = {
  router: AppRouterInstance
  feePercentage: number,
  vaultName: string,
  bridgeExternalAccountId: string,
  destinationPaymentRail?: PaymentRailType
}
