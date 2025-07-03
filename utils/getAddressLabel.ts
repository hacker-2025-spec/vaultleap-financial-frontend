export const getAddressLabel = (address: string) => {
  const first = address.substring(0, 7)
  const last = address.substring(address.length - 5, address.length)

  return first + "..." + last
}
