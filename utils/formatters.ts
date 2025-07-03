export const formatDolarValue = (value: number): string => {
  const formattedValue = value
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      // roundingIncrement: 1,
    })
    .slice(1)

  return Math.round(value) === value ? formattedValue.slice(0, -3) : formattedValue
}


export const concatLeadingZeros = (numericStr: string, upToLength: number): string => {
  let buf = numericStr
  
  while (buf.length < upToLength) {
    buf = '0' + buf
  }

  return buf
}