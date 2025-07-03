import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'
import { useCallback, useMemo, useState } from 'react'
import { encodeFunctionData, parseUnits, formatUnits } from 'viem'
import { useChainId } from 'wagmi'
import { calculateTotalAmountWithDeveloperFee, getDeveloperFeePercent } from '@/utils/developerFeeCalculations'
import { getTokenAddresses, TokenSymbol } from '@/constants/tokens'

// USDC contract address on Base Mainnet (kept for backward compatibility)
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const

// ERC20 ABI for USDC operations
const ERC20_ABI = [
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
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
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
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
] as const

export interface TokenTransferParams {
  recipient: `0x${string}`
  amountDecimal: string
  token?: TokenSymbol // Token to send (defaults to USDC for backward compatibility)
  isBridgeTransfer?: boolean // Optional flag to indicate if this is a Bridge transfer
  isPremium?: boolean // Optional flag to indicate if user has premium account
  developerFeePercent?: number // Optional override for developer fee percentage from liquidation address
}

export interface TokenTransferResult {
  transactionHash: string
  userOperationHash?: string
}

// Backward compatibility
export interface UsdcTransferParams extends Omit<TokenTransferParams, 'token'> {}
export interface UsdcTransferResult extends TokenTransferResult {}

export const usePrivySmartWallet = () => {
  const { user, ready } = usePrivy()
  console.log('__USER__', user)
  const { wallets } = useWallets()
  const { client: smartWalletClient } = useSmartWallets()
  const [isLoading, setIsLoading] = useState(false)
  const chainId = useChainId()
  console.log('wallet', smartWalletClient)

  // Get the embedded wallet (which will be a smart wallet if configured)
  const embeddedWallet = useMemo(() => {
    return wallets.find((wallet) => wallet.walletClientType === 'privy')
  }, [wallets])

  const smartWallet = useMemo(() => {
    return user?.linkedAccounts?.find((wallet) => wallet.type === 'smart_wallet')
  }, [user?.linkedAccounts])

  const smartWalletAddress = useMemo(() => {
    return smartWallet?.address
  }, [smartWallet?.address])

  // Generic token transfer function with sponsored gas using Privy smart wallet client
  const sendToken = useCallback(
    async ({
      recipient,
      amountDecimal,
      token = 'USDC',
      isBridgeTransfer = false,
      isPremium = false,
      developerFeePercent,
    }: TokenTransferParams): Promise<TokenTransferResult> => {
      if (!ready) {
        throw new Error('Privy is not ready yet. Please wait for initialization.')
      }

      if (!user) {
        throw new Error('User not authenticated. Please log in first.')
      }

      if (!smartWalletClient) {
        throw new Error('Smart wallet client not available.')
      }

      // Get token addresses for current chain
      const tokenAddresses = getTokenAddresses(chainId || 8453) // Default to Base mainnet
      if (!tokenAddresses) {
        throw new Error('Unsupported chain for token transfers')
      }

      const tokenAddress = tokenAddresses[token]
      if (!tokenAddress) {
        throw new Error(`Token ${token} not supported on this chain`)
      }

      setIsLoading(true)
      try {
        // Calculate the actual amount to send
        let actualAmountToSend = parseFloat(amountDecimal)

        if (isBridgeTransfer) {
          // For Bridge transfers, calculate total amount including developer fee
          // so that the recipient receives the full intended amount
          const feePercent = developerFeePercent ?? getDeveloperFeePercent(isPremium)
          actualAmountToSend = calculateTotalAmountWithDeveloperFee(parseFloat(amountDecimal), feePercent)

          console.log('💰 Bridge transfer fee calculation:', {
            token,
            intendedAmount: amountDecimal,
            developerFeePercent: `${feePercent}%`,
            feeSource: developerFeePercent !== undefined ? 'liquidation_address' : 'user_premium_status',
            actualAmountToSend: actualAmountToSend,
            additionalFee: actualAmountToSend - parseFloat(amountDecimal),
          })
        }

        // Convert amount to wei (6 decimals for USDC/EURC)
        const amountWei = parseUnits(actualAmountToSend.toString(), 6)

        // Encode the transfer function call
        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [recipient, amountWei],
        })

        // Use Privy's smart wallet client which automatically applies paymaster for gas sponsorship
        const transactionHash = await smartWalletClient.sendTransaction(
          {
            to: tokenAddress,
            data,
            value: BigInt(0), // ERC20 transfers don't send ETH value
          },
          {
            uiOptions: {
              showWalletUIs: false,
            },
          }
        )

        return {
          transactionHash,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [smartWalletClient, user, ready, chainId]
  )

  // Send USDC with sponsored gas using Privy smart wallet client (backward compatibility)
  const sendUsdc = useCallback(
    async (params: UsdcTransferParams): Promise<UsdcTransferResult> => {
      return sendToken({ ...params, token: 'USDC' })
    },
    [sendToken]
  )

  // Generic token balance function
  const getTokenBalance = useCallback(
    async (
      token: TokenSymbol = 'USDC'
    ): Promise<{
      wei: bigint
      formatted: string
      decimal: number
    } | null> => {
      if (!embeddedWallet || !smartWalletAddress) {
        return null
      }

      // Get token addresses for current chain
      const tokenAddresses = getTokenAddresses(chainId || 8453) // Default to Base mainnet
      if (!tokenAddresses) {
        console.error('Unsupported chain for token balance check')
        return null
      }

      const tokenAddress = tokenAddresses[token]
      if (!tokenAddress) {
        console.error(`Token ${token} not supported on this chain`)
        return null
      }

      try {
        const provider = await embeddedWallet.getEthereumProvider()

        // Encode the balanceOf function call
        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [smartWalletAddress as `0x${string}`],
        })

        // Call the contract
        const result = await provider.request({
          method: 'eth_call',
          params: [
            {
              to: tokenAddress,
              data,
            },
            'latest',
          ],
        })

        // Decode the result
        const balance = BigInt(result)
        const formatted = formatUnits(balance, 6) // All supported tokens have 6 decimals

        return {
          wei: balance,
          formatted,
          decimal: parseFloat(formatted),
        }
      } catch (error) {
        console.error(`Error fetching ${token} balance:`, error)
        return null
      }
    },
    [embeddedWallet, smartWalletAddress, chainId]
  )

  // Get USDC balance (backward compatibility)
  const getUsdcBalance = useCallback(async (): Promise<{
    wei: bigint
    formatted: string
    decimal: number
  } | null> => {
    return getTokenBalance('USDC')
  }, [getTokenBalance])

  // Approve USDC spending
  const approveUsdc = useCallback(
    async ({ spender, amountDecimal }: { spender: `0x${string}`; amountDecimal: string }): Promise<UsdcTransferResult> => {
      if (!embeddedWallet) {
        throw new Error('Embedded wallet not found')
      }

      setIsLoading(true)
      try {
        const provider = await embeddedWallet.getEthereumProvider()

        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [spender, parseUnits(amountDecimal, 6)],
        })

        const transactionRequest = {
          to: USDC_ADDRESS,
          data,
          value: '0x0',
        }

        const transactionHash = await provider.request({
          method: 'eth_sendTransaction',
          params: [transactionRequest],
        })

        return {
          transactionHash,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [embeddedWallet]
  )

  // Send ETH (native token)
  const sendEth = useCallback(
    async ({ recipient, amountDecimal }: UsdcTransferParams): Promise<UsdcTransferResult> => {
      if (!embeddedWallet) {
        throw new Error('Embedded wallet not found')
      }

      setIsLoading(true)
      try {
        const provider = await embeddedWallet.getEthereumProvider()

        const transactionRequest = {
          to: recipient,
          value: `0x${parseUnits(amountDecimal, 18).toString(16)}`, // ETH has 18 decimals
        }

        const transactionHash = await provider.request({
          method: 'eth_sendTransaction',
          params: [transactionRequest],
        })

        return {
          transactionHash,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [embeddedWallet]
  )

  // Get ETH balance
  const getEthBalance = useCallback(async (): Promise<{
    wei: bigint
    formatted: string
    decimal: number
  } | null> => {
    if (!embeddedWallet || !smartWalletAddress) {
      return null
    }

    try {
      const provider = await embeddedWallet.getEthereumProvider()

      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [smartWalletAddress, 'latest'],
      })

      const balanceBigInt = BigInt(balance)
      const formatted = formatUnits(balanceBigInt, 18)

      return {
        wei: balanceBigInt,
        formatted,
        decimal: parseFloat(formatted),
      }
    } catch (error) {
      console.error('Error fetching ETH balance:', error)
      return null
    }
  }, [embeddedWallet, smartWalletAddress])

  return {
    // Wallet info
    smartWallet: {},
    smartWalletAddress,
    isReady: ready,
    isLoading,

    // Token operations
    sendToken,
    sendUsdc, // Backward compatibility
    getTokenBalance,
    getUsdcBalance, // Backward compatibility
    approveUsdc,

    // ETH operations
    sendEth,
    getEthBalance,

    // Constants
    USDC_ADDRESS,
  }
}
