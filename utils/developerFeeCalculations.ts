/**
 * Developer fee calculations for Bridge transfers
 *
 * IMPORTANT: Bridge has specific precision and rounding rules:
 * - Bridge only processes whole cents (truncates fractional cents)
 * - Bridge rounds fees UP to ensure sufficient fees are collected
 * - Bridge rounds amounts DOWN to ensure sufficient balance
 * - To achieve a desired output amount, input = desiredOutput / (1 - feePercent)
 *
 * Reference: https://apidocs.bridge.xyz/docs/precision-and-rounding
 *
 * The recipient should receive the full amount specified.
 * The total debited from the sender should be calculated using Bridge's formula.
 */

// Developer fee percentage (0.55% for normal accounts, 0.30% for premium)
export const DEVELOPER_FEE_PERCENT = {
  NORMAL: 0.55,
  PREMIUM: 0.30,
} as const

/**
 * Bridge precision helper functions
 * Bridge only processes whole cents and has specific rounding rules
 */

/**
 * Truncate amount to whole cents (Bridge truncates fractional cents)
 * @param amount - Amount in dollars
 * @returns Amount truncated to cents
 */
export const truncateToCents = (amount: number): number => {
  return Math.floor(amount * 100) / 100
}

/**
 * Round amount UP to nearest cent (Bridge rounds fees up)
 * @param amount - Amount in dollars
 * @returns Amount rounded up to nearest cent
 */
export const roundUpToCents = (amount: number): number => {
  return Math.ceil(amount * 100) / 100
}

/**
 * Round amount DOWN to nearest cent (Bridge rounds amounts down)
 * @param amount - Amount in dollars
 * @returns Amount rounded down to nearest cent
 */
export const roundDownToCents = (amount: number): number => {
  return Math.floor(amount * 100) / 100
}

/**
 * Calculate the total amount to send to Bridge including developer fee
 * Uses Bridge's precision and rounding rules for accurate calculations
 * @param intendedAmount - The amount the recipient should receive (in dollars)
 * @param developerFeePercent - The developer fee percentage (e.g., 0.55 for 0.55%)
 * @returns The total amount to send to Bridge (rounded up to nearest cent)
 */
export const calculateTotalAmountWithDeveloperFee = (
  intendedAmount: number,
  developerFeePercent: number
): number => {
  // Use the more accurate Bridge formula
  return calculateInputAmountForDesiredOutput(intendedAmount, developerFeePercent)
}

/**
 * Calculate the developer fee amount using Bridge's precision rules
 * @param intendedAmount - The amount the recipient should receive
 * @param developerFeePercent - The developer fee percentage (e.g., 0.55 for 0.55%)
 * @returns The developer fee amount (rounded up to nearest cent)
 */
export const calculateDeveloperFeeAmount = (
  intendedAmount: number,
  developerFeePercent: number
): number => {
  // Input validation
  if (!intendedAmount || isNaN(intendedAmount) || intendedAmount <= 0) {
    return 0
  }

  if (!developerFeePercent || isNaN(developerFeePercent) || developerFeePercent <= 0) {
    return 0
  }

  // Calculate the total amount needed
  const totalAmount = calculateTotalAmountWithDeveloperFee(intendedAmount, developerFeePercent)

  // The fee is the difference between total and intended amount
  const feeAmount = totalAmount - intendedAmount
  return roundUpToCents(feeAmount)
}

/**
 * Calculate what the recipient will actually receive from Bridge
 * Uses Bridge's precision and rounding rules
 * @param totalAmountSent - The total amount sent to Bridge
 * @param developerFeePercent - The developer fee percentage (e.g., 0.55 for 0.55%)
 * @returns The amount the recipient will receive (rounded down to cents)
 */
export const calculateRecipientAmount = (
  totalAmountSent: number,
  developerFeePercent: number
): number => {
  if (developerFeePercent <= 0) {
    return truncateToCents(totalAmountSent)
  }

  // Bridge first truncates the input to whole cents
  const truncatedInput = truncateToCents(totalAmountSent)

  // Convert percentage to decimal
  const feeDecimal = developerFeePercent / 100

  // Calculate the fee amount (Bridge rounds fees UP)
  const feeAmount = roundUpToCents(truncatedInput * feeDecimal)

  // Recipient gets the remainder (Bridge rounds amounts DOWN)
  return roundDownToCents(truncatedInput - feeAmount)
}

/**
 * Validate that the calculation is correct
 * @param intendedAmount - The amount the recipient should receive
 * @param totalAmountSent - The total amount sent to Bridge
 * @param developerFeePercent - The developer fee percentage
 * @returns True if the calculation is correct
 */
export const validateDeveloperFeeCalculation = (
  intendedAmount: number,
  totalAmountSent: number,
  developerFeePercent: number
): boolean => {
  const calculatedRecipientAmount = calculateRecipientAmount(totalAmountSent, developerFeePercent)

  // Allow for small floating point differences (within 0.1% of the intended amount)
  const tolerance = Math.max(0.01, intendedAmount * 0.001) // At least 0.01 or 0.1% of amount
  const difference = Math.abs(calculatedRecipientAmount - intendedAmount)
  return difference < tolerance
}

/**
 * Format amount for display with proper decimal places
 * @param amount - The amount to format (number, string, undefined, or null)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted amount string
 */
export const formatAmount = (amount: number | string | undefined | null, decimals: number = 2): string => {
  // Handle undefined, null, or empty values
  if (amount === undefined || amount === null || amount === '') {
    return '0.00'
  }

  // Convert to number if it's a string
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  // Check if the result is a valid number
  if (isNaN(numericAmount)) {
    return '0.00'
  }

  return numericAmount?.toFixed(decimals)
}

/**
 * Calculate the exact input amount needed for a desired output amount
 * This is the most accurate method following Bridge's documentation
 * @param desiredOutput - The exact amount the recipient should receive
 * @param developerFeePercent - The developer fee percentage (e.g., 0.55 for 0.55%)
 * @returns The exact input amount needed (rounded up to nearest cent)
 */
export const calculateInputAmountForDesiredOutput = (
  desiredOutput: number,
  developerFeePercent: number
): number => {
  // Input validation
  if (!desiredOutput || isNaN(desiredOutput) || desiredOutput <= 0) {
    return 0
  }

  if (!developerFeePercent || isNaN(developerFeePercent) || developerFeePercent <= 0) {
    return truncateToCents(desiredOutput)
  }

  // Bridge formula from documentation: inputAmount = desiredOutput / (1 - feePercent)
  const feeDecimal = developerFeePercent / 100
  const requiredInput = desiredOutput / (1 - feeDecimal)

  // Round up to nearest cent as Bridge requires
  return roundUpToCents(requiredInput)
}

/**
 * Get the appropriate developer fee percentage based on account type
 * @param isPremium - Whether the account is premium
 * @returns The developer fee percentage
 */
export const getDeveloperFeePercent = (isPremium: boolean): number => {
  return isPremium ? DEVELOPER_FEE_PERCENT.PREMIUM : DEVELOPER_FEE_PERCENT.NORMAL
}

/**
 * Get developer fee percentage from liquidation address object
 * @param liquidationAddress - The liquidation address object containing fee information
 * @returns The developer fee percentage from the liquidation address
 */
export const getDeveloperFeePercentFromLiquidationAddress = (
  liquidationAddress: {
    developer_fee?: { percent?: string }
    custom_developer_fee_percent?: string
  }
): number => {
  // Try custom_developer_fee_percent first, then developer_fee.percent
  const customFeePercent = liquidationAddress.custom_developer_fee_percent
  const standardFeePercent = liquidationAddress.developer_fee?.percent

  const feePercentString = customFeePercent || standardFeePercent

  if (feePercentString) {
    const feePercent = parseFloat(feePercentString)
    if (!isNaN(feePercent)) {
      return feePercent
    }
  }

  // Fallback to default normal fee if no valid fee found
  return DEVELOPER_FEE_PERCENT.NORMAL
}
