import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createVirtualAccountMutation } from '@/client/@tanstack/react-query.gen'
import { showToast } from '@/utils/toast'

export const useCreateVirtualAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...createVirtualAccountMutation(),
    onSuccess: (data) => {
      console.log('Virtual account created successfully:', data)
      
      // Invalidate virtual accounts queries to refetch updated data
      queryClient.invalidateQueries({ 
        queryKey: [{ _id: 'getVirtualAccountsByAuth0Id' }] 
      })
      
      showToast.success('Virtual account created successfully!')
    },
    onError: (error) => {
      console.error('Failed to create virtual account:', error)
      showToast.error('Failed to create virtual account')
    },
  })
}
