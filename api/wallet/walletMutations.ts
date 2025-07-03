import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWallet } from '@/client/index'
import type { WalletCreationDto } from '@/client/types.gen'
import { walletQueryKeys } from './walletQueries'

// Hook to create/save a new wallet
export const useCreateWallet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (walletData: WalletCreationDto) => {
      const response = await createWallet({
        body: walletData
      })
      
      if (response?.data) {
        return response.data
      }
      throw new Error('Failed to create wallet')
    },
    onSuccess: () => {
      // Invalidate and refetch user wallets after successful creation
      queryClient.invalidateQueries({
        queryKey: walletQueryKeys.userWallets()
      })
    },
    onError: (error) => {
      console.error('Failed to create wallet:', error)
    },
  })
}
