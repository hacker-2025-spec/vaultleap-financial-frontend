type CreateNumberMaskProps = {
  prefix?: string
  suffix?: string
  includeThousandsSeparator?: boolean
  thousandsSeparatorSymbol?: string
  allowDecimal?: boolean
  decimalSymbol?: string
  decimalLimit?: number
  requireDecimal?: boolean
  allowNegative?: boolean
  allowLeadingZeroes?: boolean
  integerLimit?: number
}

declare function createNumberMask(arg0?: CreateNumberMaskProps): unknown

export { createNumberMask }
