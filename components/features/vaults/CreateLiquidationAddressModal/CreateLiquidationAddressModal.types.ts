import { CurrencyCode } from "@/types/currency"

export enum BankAccountType {
  ACH = 'ACH',
  IBAN = 'IBAN'
}

export enum BankAccountTypeDescription {
  ACH = 'US bank transfers (ACH and Wire) using routing number and account number',
  IBAN = 'European transfers using IBAN and BIC codes (SEPA)'
}

export enum AccountType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business'
}

export enum DestinationPaymentRail {
  ACH = 'ach',
  WIRE = 'wire',
  ACH_SAME_DAY = 'ach_same_day',
  SEPA = 'sepa',
  // Blockchain payment rails for crypto destinations
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  BASE = 'base',
  ARBITRUM = 'arbitrum',
  AVALANCHE = 'avalanche',
  OPTIMISM = 'optimism',
  SOLANA = 'solana',
  STELLAR = 'stellar',
  TRON = 'tron',
  BTC = 'btc'
}

export interface CreateLiquidationAddressModalFormFields {
    currency: CurrencyCode
    payeeName: string
    email: string
    ethereumAddress?: string
    type: BankAccountType
    bankName?: string
    accountNumber?: string
    routingNumber?: string
    addressLine1?: string
    addressLine2?: string
    city?: string
    state?: string
    country: string
    zip?: string
    accountOwnerName?: string
    bankCountry: string
    iban?: string
    bankId?: string
    accountType: AccountType
    businessName?: string
    holderFirstName?: string
    holderLastName?: string
    destinationPaymentRail: DestinationPaymentRail
}

export interface CreateLiquidationAddressModalProps {
  onPayNow: (recipientData?: any) => void
  isOpen: boolean
  onClose: () => void
}

export type CreateLiquidationAddressModalAction = 'back' | 'next' | 'save'
