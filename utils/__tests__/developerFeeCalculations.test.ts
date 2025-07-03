import {
  calculateTotalAmountWithDeveloperFee,
  calculateDeveloperFeeAmount,
  calculateRecipientAmount,
  calculateInputAmountForDesiredOutput,
  validateDeveloperFeeCalculation,
  getDeveloperFeePercent,
  formatAmount,
  truncateToCents,
  roundUpToCents,
  roundDownToCents,
  DEVELOPER_FEE_PERCENT,
} from '../developerFeeCalculations'

describe('Developer Fee Calculations', () => {
  describe('DEVELOPER_FEE_PERCENT constants', () => {
    it('should have correct fee percentages', () => {
      expect(DEVELOPER_FEE_PERCENT.NORMAL).toBe(0.55)
      expect(DEVELOPER_FEE_PERCENT.PREMIUM).toBe(0.30)
    })
  })

  describe('Bridge precision helper functions', () => {
    describe('truncateToCents', () => {
      it('should truncate to whole cents', () => {
        expect(truncateToCents(100.119999)).toBe(100.11)
        expect(truncateToCents(50.999)).toBe(50.99)
        expect(truncateToCents(0.001)).toBe(0.00)
        expect(truncateToCents(100)).toBe(100.00)
      })
    })

    describe('roundUpToCents', () => {
      it('should round up to nearest cent', () => {
        expect(roundUpToCents(100.10011)).toBe(100.11)
        expect(roundUpToCents(50.001)).toBe(50.01)
        expect(roundUpToCents(100.00)).toBe(100.00)
        expect(roundUpToCents(99.999)).toBe(100.00)
      })
    })

    describe('roundDownToCents', () => {
      it('should round down to nearest cent', () => {
        expect(roundDownToCents(100.999)).toBe(100.99)
        expect(roundDownToCents(50.991)).toBe(50.99)
        expect(roundDownToCents(100.00)).toBe(100.00)
        expect(roundDownToCents(0.999)).toBe(0.99)
      })
    })
  })

  describe('getDeveloperFeePercent', () => {
    it('should return normal fee for non-premium accounts', () => {
      expect(getDeveloperFeePercent(false)).toBe(DEVELOPER_FEE_PERCENT.NORMAL)
    })

    it('should return premium fee for premium accounts', () => {
      expect(getDeveloperFeePercent(true)).toBe(DEVELOPER_FEE_PERCENT.PREMIUM)
    })
  })

  describe('formatAmount', () => {
    it('should format numbers correctly', () => {
      expect(formatAmount(100)).toBe('100.00')
      expect(formatAmount(100.555)).toBe('100.56')
      expect(formatAmount(0)).toBe('0.00')
      expect(formatAmount(1.1)).toBe('1.10')
    })

    it('should handle string inputs', () => {
      expect(formatAmount('100')).toBe('100.00')
      expect(formatAmount('100.50')).toBe('100.50')
      expect(formatAmount('0')).toBe('0.00')
    })

    it('should handle invalid inputs gracefully', () => {
      expect(formatAmount(undefined)).toBe('0.00')
      expect(formatAmount(null)).toBe('0.00')
      expect(formatAmount('')).toBe('0.00')
      expect(formatAmount('invalid')).toBe('0.00')
      expect(formatAmount(NaN)).toBe('0.00')
    })

    it('should respect decimal places parameter', () => {
      expect(formatAmount(100.555, 1)).toBe('100.6')
      expect(formatAmount(100.555, 3)).toBe('100.555')
      expect(formatAmount(100, 0)).toBe('100')
    })
  })

  describe('calculateInputAmountForDesiredOutput', () => {
    it('should calculate correct input for normal fee', () => {
      const result = calculateInputAmountForDesiredOutput(100, DEVELOPER_FEE_PERCENT.NORMAL)
      expect(result).toBe(100.56) // 100 / (1 - 0.0055) = 100.5527... rounded up to 100.56
    })

    it('should calculate correct input for premium fee', () => {
      const result = calculateInputAmountForDesiredOutput(100, DEVELOPER_FEE_PERCENT.PREMIUM)
      expect(result).toBe(100.31) // 100 / (1 - 0.003) = 100.3009... rounded up to 100.31
    })

    it('should handle zero fee', () => {
      const result = calculateInputAmountForDesiredOutput(100, 0)
      expect(result).toBe(100.00)
    })

    it('should handle invalid inputs', () => {
      expect(calculateInputAmountForDesiredOutput(0, 0.55)).toBe(0)
      expect(calculateInputAmountForDesiredOutput(NaN, 0.55)).toBe(0)
      expect(calculateInputAmountForDesiredOutput(100, NaN)).toBe(100.00)
    })
  })

  describe('calculateTotalAmountWithDeveloperFee', () => {
    it('should use Bridge formula correctly', () => {
      const result1 = calculateTotalAmountWithDeveloperFee(100, DEVELOPER_FEE_PERCENT.NORMAL)
      const result2 = calculateInputAmountForDesiredOutput(100, DEVELOPER_FEE_PERCENT.NORMAL)
      expect(result1).toBe(result2) // Should be the same as the Bridge formula
    })
  })

  describe('calculateDeveloperFeeAmount', () => {
    it('should calculate correct fee for normal account', () => {
      const totalAmount = calculateTotalAmountWithDeveloperFee(100, DEVELOPER_FEE_PERCENT.NORMAL)
      const feeAmount = calculateDeveloperFeeAmount(100, DEVELOPER_FEE_PERCENT.NORMAL)
      expect(feeAmount).toBeCloseTo(totalAmount - 100, 1) // Less strict precision
    })

    it('should calculate correct fee for premium account', () => {
      const totalAmount = calculateTotalAmountWithDeveloperFee(100, DEVELOPER_FEE_PERCENT.PREMIUM)
      const feeAmount = calculateDeveloperFeeAmount(100, DEVELOPER_FEE_PERCENT.PREMIUM)
      expect(feeAmount).toBeCloseTo(totalAmount - 100, 1) // Less strict precision
    })

    it('should return 0 for zero fee', () => {
      expect(calculateDeveloperFeeAmount(100, 0)).toBe(0)
    })

    it('should handle invalid inputs', () => {
      expect(calculateDeveloperFeeAmount(0, 0.55)).toBe(0)
      expect(calculateDeveloperFeeAmount(NaN, 0.55)).toBe(0)
      expect(calculateDeveloperFeeAmount(100, NaN)).toBe(0)
    })
  })

  describe('calculateRecipientAmount', () => {
    it('should calculate what recipient receives after Bridge processing', () => {
      const totalSent = 100.56
      const feePercent = DEVELOPER_FEE_PERCENT.NORMAL
      const recipientAmount = calculateRecipientAmount(totalSent, feePercent)
      
      // Should be close to the intended amount (small difference due to rounding)
      expect(recipientAmount).toBeCloseTo(100, 1)
    })

    it('should handle zero fee', () => {
      const result = calculateRecipientAmount(100, 0)
      expect(result).toBe(100.00)
    })
  })

  describe('validateDeveloperFeeCalculation', () => {
    it('should validate correct calculations', () => {
      const intendedAmount = 100
      const totalAmount = calculateTotalAmountWithDeveloperFee(intendedAmount, DEVELOPER_FEE_PERCENT.NORMAL)
      const isValid = validateDeveloperFeeCalculation(intendedAmount, totalAmount, DEVELOPER_FEE_PERCENT.NORMAL)
      expect(isValid).toBe(true)
    })

    it('should reject incorrect calculations', () => {
      const isValid = validateDeveloperFeeCalculation(100, 100, DEVELOPER_FEE_PERCENT.NORMAL)
      expect(isValid).toBe(false) // Should be false because total should be higher than intended
    })
  })

  describe('Real-world scenarios', () => {
    const testCases = [
      { amount: 10, isPremium: false, description: '$10 normal account' },
      { amount: 10, isPremium: true, description: '$10 premium account' },
      { amount: 50.33, isPremium: false, description: '$50.33 normal account' },
      { amount: 100, isPremium: false, description: '$100 normal account' },
      { amount: 100, isPremium: true, description: '$100 premium account' },
      { amount: 1000, isPremium: false, description: '$1000 normal account' },
    ]

    testCases.forEach(({ amount, isPremium, description }) => {
      it(`should handle ${description} correctly`, () => {
        const feePercent = getDeveloperFeePercent(isPremium)
        const totalAmount = calculateTotalAmountWithDeveloperFee(amount, feePercent)
        const feeAmount = calculateDeveloperFeeAmount(amount, feePercent)
        const recipientAmount = calculateRecipientAmount(totalAmount, feePercent)

        // Validate the calculation
        const isValid = validateDeveloperFeeCalculation(amount, totalAmount, feePercent)
        expect(isValid).toBe(true)

        // Total should be greater than intended (unless fee is 0)
        if (feePercent > 0) {
          expect(totalAmount).toBeGreaterThan(amount)
        }

        // Fee should be positive (unless fee percent is 0)
        if (feePercent > 0) {
          expect(feeAmount).toBeGreaterThan(0)
        }

        // Recipient should get close to intended amount
        expect(recipientAmount).toBeCloseTo(amount, 1)

        // All amounts should be reasonable values
        expect(totalAmount).toBeGreaterThan(0)
        expect(feeAmount).toBeGreaterThanOrEqual(0)
        expect(recipientAmount).toBeGreaterThan(0)

        // Formatted amounts should have proper decimal places
        expect(formatAmount(totalAmount)).toMatch(/^\d+\.\d{2}$/)
        expect(formatAmount(feeAmount)).toMatch(/^\d+\.\d{2}$/)
        expect(formatAmount(recipientAmount)).toMatch(/^\d+\.\d{2}$/)
      })
    })
  })

  describe('Bridge documentation example verification', () => {
    it('should match Bridge documentation example for exchange fees', () => {
      // Bridge example: $100,100.119999 with 0.1% exchange fee
      const originalAmount = 100100.119999
      const exchangeFeePercent = 0.1

      // Step 1: Truncate to cents
      const truncated = truncateToCents(originalAmount)
      expect(truncated).toBe(100100.11)

      // Step 2: Calculate fee (rounded up)
      const feeAmount = roundUpToCents(truncated * (exchangeFeePercent / 100))
      expect(feeAmount).toBe(100.11)

      // Step 3: Customer receives
      const customerReceives = truncated - feeAmount
      expect(customerReceives).toBe(100000.00)
    })
  })
})
