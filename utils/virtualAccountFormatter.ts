import type { VirtualAccountEntity } from '@/client/types.gen'

// Type for source deposit instructions
type SourceDepositInstructions = {
  currency: 'usd' | 'eur'
  bank_name: string
  bank_account_number?: string
  bank_routing_number?: string
  iban?: string
  bic?: string
  account_holder_name?: string
  bank_beneficiary_name?: unknown
  bank_beneficiary_address?: string
  bank_address?: string
  payment_rail?: string
  payment_rails?: string[]
}

/**
 * Formats virtual account details for copying to clipboard
 * Returns only the essential payment information in human-readable format
 */
export const formatVirtualAccountForClipboard = (account: VirtualAccountEntity): string => {
  const instructions = account.source_deposit_instructions as SourceDepositInstructions
  
  if (!instructions) {
    return 'No payment instructions available'
  }

  const currency = instructions.currency?.toUpperCase() || 'USD'
  const isEUR = currency === 'EUR'
  
  // Get account holder name
  const accountHolderName = isEUR 
    ? instructions.account_holder_name || ''
    : (typeof instructions.bank_beneficiary_name === 'string' ? instructions.bank_beneficiary_name : '')
  
  // Get account holder address
  const accountHolderAddress = instructions.bank_beneficiary_address || ''
  
  // Get account number (IBAN for EUR, account number for USD)
  const accountNumber = isEUR 
    ? instructions.iban || ''
    : instructions.bank_account_number || ''
  
  // Get routing number (BIC for EUR, routing number for USD)
  const routingNumber = isEUR 
    ? instructions.bic || ''
    : instructions.bank_routing_number || ''
  
  // Get payment method
  const paymentMethod = getPaymentMethodText(instructions)
  
  // Format the output
  const lines = [
    `Bank Name: ${instructions.bank_name || ''}`,
    `Bank Address: ${instructions.bank_address || ''}`,
    `${isEUR ? 'BIC' : 'Routing Number'}: ${routingNumber}`,
    `${isEUR ? 'IBAN' : 'Account Number'}: ${accountNumber}`,
    `Account Holder: ${accountHolderName}`,
    `Account Holder Address: ${accountHolderAddress}`,
    `Currency: ${currency}`,
    `Payment Method: ${paymentMethod}`
  ]
  
  return lines.join('\n')
}

/**
 * Gets human-readable payment method text from payment rails
 */
const getPaymentMethodText = (instructions: SourceDepositInstructions): string => {
  const paymentRails = instructions.payment_rails || []
  const primaryRail = instructions.payment_rail
  
  if (instructions.currency === 'eur') {
    return 'SEPA'
  }
  
  // For USD accounts
  if (paymentRails.length > 1) {
    // Multiple payment methods available
    const methods = paymentRails.map(rail => {
      switch (rail) {
        case 'ach_push':
        case 'ach':
          return 'ACH'
        case 'wire':
          return 'Wire'
        case 'ach_same_day':
          return 'ACH Same Day'
        default:
          return rail.toUpperCase()
      }
    })
    return methods.join(' or ')
  } else if (primaryRail) {
    // Single payment method
    switch (primaryRail) {
      case 'ach_push':
      case 'ach':
        return 'ACH'
      case 'wire':
        return 'Wire'
      case 'ach_same_day':
        return 'ACH Same Day'
      default:
        return primaryRail.toUpperCase()
    }
  }
  
  // Default fallback
  return instructions.currency === 'usd' ? 'ACH or Wire' : 'SEPA'
}

// Example usage and expected output:
// For USD account:
// Bank Name: Lead Bank
// Bank Address: 1801 Main St., Kansas City, MO 64108
// Routing Number: 101019644
// Account Number: 217489108632
// Account Holder: GREGORY REVERET
// Account Holder Address: 1address st US
// Currency: USD
// Payment Method: ACH or Wire
