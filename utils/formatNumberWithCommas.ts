import { formatUnits } from 'viem'

export function formatNumberWithCommas(
  number: bigint,
  tokenDecimals: number = 0,
  truncate: number = 0
): string {
  let strNumber = formatUnits(number, tokenDecimals)

  if (truncate) {
    const decimalIndex = strNumber.indexOf('.')
    if (decimalIndex !== -1) {
      const decimalPart = strNumber.substring(decimalIndex + 1)
      strNumber =
        strNumber.substring(0, decimalIndex + 1) +
        decimalPart.substring(0, truncate)
    }
  }

  const parts = strNumber.split('.')

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}
