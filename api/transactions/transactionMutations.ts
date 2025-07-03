import { useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  createTransactionMutation,
  signVaultTransactionMutation 
} from '@/client/@tanstack/react-query.gen'
import type { 
  CreateTransactionData,
  SignVaultTransactionData,
  SendEvmTransactionDto,
  SignVaultTransactionResultDto 
} from '@/client/types.gen'
import { showToast } from '@/utils/toast'
import { transactionQueryKeys } from './transactionQueries'

// Hook to create a new transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...createTransactionMutation(),
    onSuccess: (data: SendEvmTransactionDto) => {
      console.log('Transaction created successfully:', data)
      
      // Invalidate transaction queries to refetch updated data
      queryClient.invalidateQueries({ 
        queryKey: transactionQueryKeys.all 
      })
      
      showToast.success('Transaction created successfully!')
    },
    onError: (error) => {
      console.error('Failed to create transaction:', error)
      showToast.error('Failed to create transaction')
    },
  })
}

// Hook to sign a vault transaction
export const useSignVaultTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...signVaultTransactionMutation(),
    onSuccess: (data: SignVaultTransactionResultDto) => {
      console.log('Vault transaction signed successfully:', data)
      
      // Invalidate transaction queries to refetch updated data
      queryClient.invalidateQueries({ 
        queryKey: transactionQueryKeys.all 
      })
      
      showToast.success('Transaction signed successfully!')
    },
    onError: (error) => {
      console.error('Failed to sign vault transaction:', error)
      showToast.error('Failed to sign transaction')
    },
  })
}

// Combined hook for transaction flow management
export const useTransactionFlow = () => {
  const createTransaction = useCreateTransaction()
  const signVaultTransaction = useSignVaultTransaction()

  const executeTransactionFlow = async (
    transactionData: CreateTransactionData['body'],
    vaultData?: SignVaultTransactionData['body']
  ) => {
    try {
      // First create the transaction
      const transactionResult = await createTransaction.mutateAsync(transactionData)
      
      // If vault data is provided, sign the vault transaction
      if (vaultData) {
        const signResult = await signVaultTransaction.mutateAsync(vaultData)
        return { transactionResult, signResult }
      }
      
      return { transactionResult }
    } catch (error) {
      console.error('Transaction flow failed:', error)
      throw error
    }
  }

  return {
    executeTransactionFlow,
    isLoading: createTransaction.isPending || signVaultTransaction.isPending,
    isSuccess: createTransaction.isSuccess && (!signVaultTransaction.isPending ? signVaultTransaction.isSuccess : true),
    error: createTransaction.error || signVaultTransaction.error,
    reset: () => {
      createTransaction.reset()
      signVaultTransaction.reset()
    }
  }
}
