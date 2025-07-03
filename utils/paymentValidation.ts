import { CurrencyCode } from '@/types/currency'
import { DestinationPaymentRail } from '@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal.types'

// Transaction costs and minimum amounts based on payment rail
export const TRANSACTION_COSTS = {
  // Fiat payment rails
  USD: {
    ACH: { fee: '$0.5', minimum: 1 },
    WIRE: { fee: '$20', minimum: 1 },
    ACH_SAME_DAY: { fee: '$1', minimum: 1 },
  },
  EUR: {
    SEPA: { fee: '$1', minimum: 1 },
  },
  // Crypto payment rails
  USDC: {
    ETHEREUM: { fee: '$1.00 - $1.10', minimum: 1 },
    POLYGON: { fee: '<$0.001', minimum: 1 },
    BASE: { fee: '<$0.001', minimum: 1 },
    ARBITRUM: { fee: '<$0.001', minimum: 1 },
    AVALANCHE: { fee: '<$0.001', minimum: 1 },
    OPTIMISM: { fee: '<$0.001', minimum: 1 },
    SOLANA: { fee: '<$0.001', minimum: 1 },
    STELLAR: { fee: '<$0.001', minimum: 1 },
  },
  USDT: {
    ETHEREUM: { fee: '$1.00 - $1.10', minimum: 1 },
    POLYGON: { fee: '<$0.001', minimum: 1 },
    BASE: { fee: '<$0.001', minimum: 1 },
    TRON: { fee: '<$0.001', minimum: 1 },
  },
  EURC: {
    BASE: { fee: '<$0.001', minimum: 1 },
    SOLANA: { fee: '<$0.001', minimum: 1 },
    STELLAR: { fee: '<$0.001', minimum: 1 },
  },
} as const

export interface RecipientValidationInfo {
  isDirectWeb3: boolean
  isDirect: boolean
  isNew: boolean
  isSaved: boolean
  currency?: CurrencyCode
  destinationPaymentRail?: DestinationPaymentRail
}

// Get minimum amount based on recipient type and payment rail
export const getMinimumAmount = (recipientInfo: RecipientValidationInfo): number => {
  // For direct web3 addresses, use minimal amount (0.01)
  if (recipientInfo.isDirectWeb3 || recipientInfo.isDirect) {
    return 0.01
  }

  // For saved recipients, get minimum from their payment rail configuration
  if (recipientInfo.isSaved && recipientInfo.currency && recipientInfo.destinationPaymentRail) {
    return getTransactionCost(recipientInfo.currency, recipientInfo.destinationPaymentRail)?.minimum || 1
  }

  // Default minimum for new recipients
  return 1
}

// Get transaction cost information
export const getTransactionCost = (
  currency: CurrencyCode,
  paymentRail: DestinationPaymentRail
): { fee: string; minimum: number; destinationMinimum?: number } | null => {
  try {
    // Handle fiat currencies
    if (currency === CurrencyCode.USD) {
      const costs = TRANSACTION_COSTS.USD
      if (paymentRail === DestinationPaymentRail.ACH) return costs.ACH
      if (paymentRail === DestinationPaymentRail.WIRE) return costs.WIRE
      if (paymentRail === DestinationPaymentRail.ACH_SAME_DAY) return costs.ACH_SAME_DAY
    }

    if (currency === CurrencyCode.EUR && paymentRail === DestinationPaymentRail.SEPA) {
      return TRANSACTION_COSTS.EUR.SEPA
    }

    // Handle crypto currencies
    if (currency === CurrencyCode.USDC) {
      const costs = TRANSACTION_COSTS.USDC
      if (paymentRail === DestinationPaymentRail.ETHEREUM) return costs.ETHEREUM
      if (paymentRail === DestinationPaymentRail.POLYGON) return costs.POLYGON
      if (paymentRail === DestinationPaymentRail.BASE) return costs.BASE
      if (paymentRail === DestinationPaymentRail.ARBITRUM) return costs.ARBITRUM
      if (paymentRail === DestinationPaymentRail.AVALANCHE) return costs.AVALANCHE
      if (paymentRail === DestinationPaymentRail.OPTIMISM) return costs.OPTIMISM
      if (paymentRail === DestinationPaymentRail.SOLANA) return costs.SOLANA
      if (paymentRail === DestinationPaymentRail.STELLAR) return costs.STELLAR
    }

    if (currency === CurrencyCode.USDT) {
      const costs = TRANSACTION_COSTS.USDT
      if (paymentRail === DestinationPaymentRail.ETHEREUM) return costs.ETHEREUM
      if (paymentRail === DestinationPaymentRail.POLYGON) return costs.POLYGON
      if (paymentRail === DestinationPaymentRail.BASE) return costs.BASE
      if (paymentRail === DestinationPaymentRail.TRON) return costs.TRON
    }

    if (currency === CurrencyCode.EURC) {
      const costs = TRANSACTION_COSTS.EURC
      if (paymentRail === DestinationPaymentRail.BASE) return costs.BASE
      if (paymentRail === DestinationPaymentRail.SOLANA) return costs.SOLANA
      if (paymentRail === DestinationPaymentRail.STELLAR) return costs.STELLAR
    }

    return null
  } catch (error) {
    console.error('Error getting transaction cost:', error)
    return null
  }
}

// Check if recipient is a direct web3 address
export const isDirectWeb3Address = (recipient: string): boolean => {
  return recipient === 'direct' || (recipient && recipient.startsWith('0x') && recipient.length === 42)
}

// Parse recipient information for validation
export const parseRecipientInfo = (
  recipient: string,
  liquidationAddresses: any[] = []
): RecipientValidationInfo => {
  const isDirectWeb3 = isDirectWeb3Address(recipient)
  const isDirect = recipient === 'direct'
  const isNew = recipient === 'new'
  const isSaved = !isDirectWeb3 && !isDirect && !isNew && recipient !== ''

  let currency: CurrencyCode | undefined
  let destinationPaymentRail: DestinationPaymentRail | undefined

  // If it's a saved recipient, get its configuration
  if (isSaved) {
    const savedRecipient = liquidationAddresses.find(la => la.id === recipient)
    if (savedRecipient) {
      currency = savedRecipient.currency as CurrencyCode
      destinationPaymentRail = savedRecipient.destination_payment_rail as DestinationPaymentRail
    }
  }

  return {
    isDirectWeb3,
    isDirect,
    isNew,
    isSaved,
    currency,
    destinationPaymentRail,
  }
}
