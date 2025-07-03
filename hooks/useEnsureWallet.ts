import { useCallback } from 'react'
import { usePrivy, useCreateWallet } from '@privy-io/react-auth'

export const useEnsureWallet = () => {
  const { ready, user } = usePrivy()
  const { createWallet } = useCreateWallet()

  const ensureWalletExists = useCallback(async () => {
    if (!ready || !user) {
      console.log('Privy not ready or user not available, skipping wallet check')
      return
    }

    // Check if user has an embedded wallet
    const hasEmbeddedWallet = user.linkedAccounts?.some(account => account.type === 'wallet')
    
    if (!hasEmbeddedWallet) {
      console.log('No embedded wallet found, creating one...')
      try {
        await createWallet()
        console.log('✅ Embedded wallet created successfully')
      } catch (error) {
        console.error('Failed to create embedded wallet:', error)
        // Don't throw error - wallet creation failure shouldn't block login
      }
    } else {
      console.log('✅ User already has an embedded wallet')
    }
  }, [ready, user, createWallet])

  return {
    ensureWalletExists
  }
}
