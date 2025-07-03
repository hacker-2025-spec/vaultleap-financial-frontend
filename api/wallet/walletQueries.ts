import { useQuery } from '@tanstack/react-query'
import { checkWallet, getCurrentUserWallets } from '@/client/index'
import { useIsLoggedIn } from '@/stores/userStore'
import type { WalletCreationDto } from '@/client/types.gen'
import { ERC20_ABI, getTokenAddresses, getTokenInfo, TokenBalance, TokenSymbol } from '@/constants/tokens.ts'
import { useWalletConfig } from '@/hooks/useWalletConfig.ts'
import { useForexRates } from '@/api/forex/forexQueries.ts'
import { useCurrencyPreferences } from '@/stores/settingsStore.ts'
import { useReadContracts } from 'wagmi'
import { formatUnits } from 'viem'

export const walletQueryKeys = {
  all: ['wallet'] as const,
  userWallets: () => [...walletQueryKeys.all, 'userWallets'] as const,
  checkWallet: (wallet: WalletCreationDto) => [...walletQueryKeys.all, 'checkWallet', wallet] as const,
  balance: (address: string, chainId: number) => [...walletQueryKeys.all, 'balance', address, chainId] as const,
  ethPrice: () => [...walletQueryKeys.all, 'ethPrice'] as const,
  ethPriceEur: () => [...walletQueryKeys.all, 'ethPriceEur'] as const,
}

// Hook to fetch current user's wallets
export const useUserWallets = () => {
  const isLoggedIn = useIsLoggedIn()

  return useQuery({
    queryKey: walletQueryKeys.userWallets(),
    queryFn: async () => {
      const response = await getCurrentUserWallets()
      if (response?.data) {
        return response.data
      }
      throw new Error('Failed to fetch user wallets')
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook to check wallet status
export const useCheckWalletStatus = (wallet: WalletCreationDto | null) => {
  const isLoggedIn = useIsLoggedIn()

  return useQuery({
    queryKey: wallet ? walletQueryKeys.checkWallet(wallet) : ['wallet', 'checkWallet', 'disabled'],
    queryFn: async () => {
      if (!wallet) throw new Error('No wallet to check')

      const response = await checkWallet({
        body: wallet,
      })

      if (response?.data) {
        return response.data
      }
      throw new Error('Failed to check wallet status')
    },
    enabled: isLoggedIn && !!wallet,
    staleTime: 0, // Always fetch fresh data
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export interface TotalBalanceBreakdown {
  usdc: {
    balance: number
    usdValue: number
    eurValue: number
    displayValue: number // Value in user's preferred currency
  }
  eurc: {
    balance: number
    usdValue: number
    eurValue: number
    displayValue: number
  }
  total: number // Total in user's preferred currency
  totalUsd: number // Total in USD
  totalEur: number // Total in EUR
}

export const useTokenBalances = () => {
  const { wallet, chain } = useWalletConfig()
  const address = wallet?.address as `0x${string}` | undefined
  const chainId = chain?.id

  // Forex rates and currency preferences for total balance calculations
  const { data: forexRates, isLoading: isForexLoading, isError: isForexError } = useForexRates()
  const currencyPreferences = useCurrencyPreferences()

  // Get token addresses for current chain
  const tokenAddresses = chainId ? getTokenAddresses(chainId) : null
  const tokenInfo = chainId ? getTokenInfo(chainId) : []

  // Create contract calls for all token balances
  const contracts =
    tokenAddresses && address
      ? Object.entries(tokenAddresses).map(([_symbol, tokenAddress]) => ({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [address],
        }))
      : []

  const {
    data,
    isError: isTokensError,
    isLoading: isTokensLoading,
    refetch,
  } = useReadContracts({
    contracts,
    query: {
      enabled: !!address && !!tokenAddresses && contracts.length > 0,
      refetchInterval: 45000, // Auto-refetch every 45 seconds
      staleTime: 30000, // Consider data stale after 30 seconds
    },
  })

  const isLoading = isTokensLoading || isForexLoading
  const isError = isTokensError || isForexError

  // Process the results into TokenBalance objects
  const tokenBalances: TokenBalance[] = tokenInfo.map((token, index) => {
    const result = data?.[index]
    const balance = result?.status === 'success' ? BigInt(result.result as string) : BigInt(0)
    const formatted = formatUnits(balance, token.decimals)
    const decimal = parseFloat(formatted)

    return {
      symbol: token.symbol,
      address: token.address,
      decimals: token.decimals,
      balance,
      formatted,
      decimal,
    }
  })

  // Filter tokens with balance > 0
  const availableTokens = tokenBalances.filter((token) => token.decimal > 0)

  // Get specific token balance by symbol
  const getTokenBalance = (symbol: TokenSymbol): TokenBalance | undefined => {
    return tokenBalances.find((token) => token.symbol === symbol)
  }

  // Calculate total balance in both USD and EUR with forex conversion
  const calculateTotalBalance = (): TotalBalanceBreakdown => {
    if (!tokenBalances || !forexRates) {
      return {
        usdc: { balance: 0, usdValue: 0, eurValue: 0, displayValue: 0 },
        eurc: { balance: 0, usdValue: 0, eurValue: 0, displayValue: 0 },
        total: 0,
        totalUsd: 0,
        totalEur: 0,
      }
    }

    // Get token balances
    const usdcBalance = tokenBalances.find((token) => token.symbol === 'USDC')?.decimal || 0
    const eurcBalance = tokenBalances.find((token) => token.symbol === 'EURC')?.decimal || 0

    // Get forex rates
    const usdcToUsdRate = forexRates.usdc?.usd || 1 // USDC should be ~1 USD
    const eurcToUsdRate = forexRates.eurc?.usd || 1.1 // EURC varies with EUR/USD rate

    const usdcToEurRate = forexRates.usdc?.eur || 0.9 // USDC to EUR
    const eurcToEurRate = forexRates.eurc?.eur || 1 // EURC should be ~1 EUR

    // Convert to USD
    const usdcInUsd = usdcBalance * usdcToUsdRate
    const eurcInUsd = eurcBalance * eurcToUsdRate

    // Convert to EUR
    const usdcInEur = usdcBalance * usdcToEurRate
    const eurcInEur = eurcBalance * eurcToEurRate

    // Calculate totals
    const totalUsd = usdcInUsd + eurcInUsd
    const totalEur = usdcInEur + eurcInEur

    // Use preferred currency for display
    const isEur = currencyPreferences === 'EUR'
    const total = isEur ? totalEur : totalUsd

    return {
      usdc: {
        balance: usdcBalance,
        usdValue: usdcInUsd,
        eurValue: usdcInEur,
        displayValue: isEur ? usdcInEur : usdcInUsd,
      },
      eurc: {
        balance: eurcBalance,
        usdValue: eurcInUsd,
        eurValue: eurcInEur,
        displayValue: isEur ? eurcInEur : eurcInUsd,
      },
      total: Math.round(total * 100) / 100, // Round to 2 decimals
      totalUsd: Math.round(totalUsd * 100) / 100,
      totalEur: Math.round(totalEur * 100) / 100,
    }
  }

  const totalBalanceBreakdown = calculateTotalBalance()

  // Format total for display based on currency preference
  const formatTotal = (amount: number): string => {
    const symbol = currencyPreferences === 'EUR' ? '€' : '$'
    return `${symbol}${amount.toFixed(2)}`
  }

  // Get breakdown for tooltip - always show all tokens
  const getBreakdownText = (): string => {
    const breakdown = totalBalanceBreakdown
    const parts = [`USDC: ${formatTotal(breakdown.usdc.displayValue)}`, `EURC: ${formatTotal(breakdown.eurc.displayValue)}`]

    return parts.join(' + ')
  }

  // Get currency label
  const getCurrencyLabel = (): string => {
    return currencyPreferences === 'EUR' ? 'Digital Euros' : 'Digital Dollars'
  }

  // Check if user has any tokens
  const hasAnyTokens = totalBalanceBreakdown.total > 0

  return {
    // All token balances (including zero balances)
    tokenBalances,

    // Only tokens with balance > 0
    availableTokens,

    // Loading and error states
    isLoading,
    isError,

    // Utility functions
    getTokenBalance,
    refetch,

    // Metadata
    hasMultipleTokens: availableTokens.length > 1,
    hasAnyTokens,

    // Total balance functionality (previously from useTotalBalance)
    totalBalance: totalBalanceBreakdown.total,
    formattedTotal: formatTotal(totalBalanceBreakdown.total),

    // Currency info
    currencyPreferences,
    currencyLabel: getCurrencyLabel(),
    currencySymbol: currencyPreferences === 'EUR' ? '€' : '$',

    // Breakdown
    breakdown: totalBalanceBreakdown,
    breakdownText: getBreakdownText(),

    // Forex rates for reference
    forexRates,
  }
}