// Token contract addresses on Base chain
export const TOKEN_ADDRESSES = {
  // Base Mainnet (8453)
  8453: {
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const,
  //  USDT: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2' as const,
    EURC: '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42' as const,
  },
  // Base Sepolia (84532)
  84532: {
    USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as const,
//    USDT: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B' as const,
    EURC: '0x4A3A6Dd60A34bB2Aba60D73B4C88315E9CeB6A3D' as const,
  },
} as const

export type TokenSymbol = 'USDC' | 'EURC'

export interface TokenInfo {
  symbol: TokenSymbol
  name: string
  decimals: number
  address: `0x${string}`
  icon: string
}

export interface TokenBalance {
  symbol: TokenSymbol
  address: `0x${string}`
  decimals: number
  balance: bigint
  formatted: string
  decimal: number
}

// Token metadata
export const TOKEN_INFO: Record<TokenSymbol, Omit<TokenInfo, 'address'>> = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    icon: '🟢',
  },
  // USDT: {
  //   symbol: 'USDT',
  //   name: 'Tether USD',
  //   decimals: 6,
  //   icon: '🟣',
  // },
  EURC: {
    symbol: 'EURC',
    name: 'Euro Coin',
    decimals: 6,
    icon: '🔵',
  },
} as const

// Get token addresses for current chain
export const getTokenAddresses = (chainId: number): Record<TokenSymbol, `0x${string}`> | null => {
  if (chainId === 8453) return TOKEN_ADDRESSES[8453]
  if (chainId === 84532) return TOKEN_ADDRESSES[84532]
  return null
}

// Get token info with address for current chain
export const getTokenInfo = (chainId: number): TokenInfo[] => {
  const addresses = getTokenAddresses(chainId)
  if (!addresses) return []

  return Object.entries(TOKEN_INFO).map(([symbol, info]) => ({
    ...info,
    symbol: symbol as TokenSymbol,
    address: addresses[symbol as TokenSymbol],
  }))
}

// ERC20 ABI for balance and transfer operations
export const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
] as const
