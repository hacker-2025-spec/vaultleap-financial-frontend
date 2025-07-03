import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import { useUpdatePrivyWalletAddresses } from '@/api/user/userMutations'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'
import { useWallets } from '@privy-io/react-auth'

interface WalletAddressContextType {
  privyWalletAddress: string | null
  smartWalletAddress: string | null
  isLoading: boolean
  isUpdating: boolean
  error: string | null
  hasWalletAddresses: boolean
}

const WalletAddressContext = createContext<WalletAddressContextType | undefined>(undefined)

export const useWalletAddresses = () => {
  const context = useContext(WalletAddressContext)
  if (context === undefined) {
    throw new Error('useWalletAddresses must be used within a WalletAddressProvider')
  }
  return context
}

interface WalletAddressProviderProps {
  children: React.ReactNode
}

export const WalletAddressProvider: React.FC<WalletAddressProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null)
  const [hasAttemptedUpdate, setHasAttemptedUpdate] = useState(false)

  // Get user data from /me endpoint
  const { data: userData, isLoading: isUserDataLoading } = useUserCustomerDetails()

  // Get wallet addresses from Privy hooks
  const { wallets } = useWallets()
  const { smartWalletAddress } = usePrivySmartWallet()

  // Get the embedded wallet address (EOA wallet)
  const embeddedWallet = useMemo(() => {
    return wallets.find(wallet => wallet.walletClientType === 'privy')
  }, [wallets])

  const privyWalletAddressFromHook = useMemo(() => {
    return embeddedWallet?.address
  }, [embeddedWallet?.address])

  // Mutation to update wallet addresses
  const updateWalletAddresses = useUpdatePrivyWalletAddresses()

  // Determine the source of wallet addresses
  const privyWalletAddress = userData?.privyWalletAddress || privyWalletAddressFromHook || null
  const finalSmartWalletAddress = userData?.privySmartWalletAddress || smartWalletAddress || null

  // Check if we need to update wallet addresses
  const needsUpdate = useMemo(() => {
    // Don't update if we're already updating or have attempted an update
    if (updateWalletAddresses.isPending || hasAttemptedUpdate) return false
    
    // Don't update if user data is still loading
    if (isUserDataLoading) return false
    
    // Don't update if we don't have wallet addresses from hooks yet
    if (!privyWalletAddressFromHook || !smartWalletAddress) return false
    
    // Update if user data is missing wallet addresses
    const missingPrivyAddress = !userData?.privyWalletAddress
    const missingSmartAddress = !userData?.privySmartWalletAddress
    
    return missingPrivyAddress || missingSmartAddress
  }, [
    updateWalletAddresses.isPending,
    hasAttemptedUpdate,
    isUserDataLoading,
    privyWalletAddressFromHook,
    smartWalletAddress,
    userData?.privyWalletAddress,
    userData?.privySmartWalletAddress,
  ])

  // Auto-update wallet addresses when needed
  useEffect(() => {
    if (needsUpdate && privyWalletAddressFromHook && smartWalletAddress) {
      console.log('Auto-updating wallet addresses:', {
        privyWalletAddress: privyWalletAddressFromHook,
        smartWalletAddress,
      })

      setHasAttemptedUpdate(true)
      setError(null)

      updateWalletAddresses.mutate(
        {
          privyWalletAddress: privyWalletAddressFromHook,
          privySmartWalletAddress: smartWalletAddress,
        },
        {
          onError: (error) => {
            console.error('Failed to auto-update wallet addresses:', error)
            setError('Failed to update wallet addresses')
            // Reset attempt flag to allow retry
            setHasAttemptedUpdate(false)
          },
          onSuccess: () => {
            console.log('Wallet addresses updated successfully')
            setError(null)
          },
        }
      )
    }
  }, [needsUpdate, privyWalletAddressFromHook, smartWalletAddress, updateWalletAddresses])

  // Reset attempt flag when user data changes (e.g., after login)
  useEffect(() => {
    if (userData?.privyWalletAddress && userData?.privySmartWalletAddress) {
      setHasAttemptedUpdate(false)
    }
  }, [userData?.privyWalletAddress, userData?.privySmartWalletAddress])

  const contextValue: WalletAddressContextType = {
    privyWalletAddress,
    smartWalletAddress: finalSmartWalletAddress,
    isLoading: isUserDataLoading,
    isUpdating: updateWalletAddresses.isPending,
    error,
    hasWalletAddresses: !!(privyWalletAddress && finalSmartWalletAddress),
  }

  return (
    <WalletAddressContext.Provider value={contextValue}>
      {children}
    </WalletAddressContext.Provider>
  )
}

export default WalletAddressProvider
