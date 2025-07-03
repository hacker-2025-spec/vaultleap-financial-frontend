import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserDetails, deleteAvatar, createCustom, client, updatePrivyWalletAddresses } from '@/client/index'
import type { UpdateUserDetailsData, UserResponseDto, CreateCustomData, CreateCustomerDto } from '@/client/index'
import { showToast } from '@/utils/toast'
import { userQueryKeys } from './userQueries'
import { useUserActions } from '@/stores/userStore'
import { KYCVerificationStatus, TOSStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { authorizedApiCall } from '@/utils/httpClient'
import { UserService } from '@klydo-io/getrewards-backend-api'



// Utility function to extract meaningful error messages
const extractErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string; error?: string } }; message?: string }
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    } else if (axiosError.response?.data?.error) {
      return axiosError.response.data.error
    } else if (axiosError.message) {
      return axiosError.message
    }
  }
  return defaultMessage
}

export const useUserUpdateDetails = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateUserDetailsData) => {
      const response = await updateUserDetails(data)
      return response.data
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(userQueryKeys.customerDetails(), (oldData: UserResponseDto | undefined) => {
        if (!oldData) return updatedData
        return { ...oldData, ...updatedData }
      })

      queryClient.invalidateQueries({ queryKey: userQueryKeys.customerDetails() })
      showToast.success('Profile updated successfully!')
    },
    onError: (error: unknown) => {
      console.error('Failed to update user details:', error)
      const errorMessage = extractErrorMessage(error, 'Failed to update profile')
      showToast.error(errorMessage)
    },
  })
}

export const useUserUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File): Promise<UserResponseDto> => {
      const formData = new FormData()
      formData.append('avatar', file)

        const response = await client.post({
          url: '/users/me/upload-avatar-file',
          body: formData,
  
        })
        return response.data as UserResponseDto
 
    },
    onSuccess: (updatedData: UserResponseDto) => {
      console.log('Avatar upload success, response data:', updatedData)

      // Update the cache with the new avatar data
      queryClient.setQueryData(userQueryKeys.customerDetails(), (oldData: UserResponseDto | undefined) => {
        console.log('Current cache data:', oldData)

        if (!oldData) return updatedData

        // Ensure we properly merge the avatar field
        const newData: UserResponseDto = {
          ...oldData,
          ...updatedData,
          // Explicitly update the avatar field if it's in the response
          avatar: updatedData?.avatar || oldData.avatar
        }

        console.log('Updated cache data:', newData)
        return newData
      })

      // Invalidate to trigger a refetch and ensure consistency
      queryClient.invalidateQueries({ queryKey: userQueryKeys.customerDetails() })
      showToast.success('Avatar updated successfully!')
    },
    onError: (error: unknown) => {
      console.error('Failed to upload avatar:', error)
      const errorMessage = extractErrorMessage(error, 'Failed to upload avatar')
      showToast.error(errorMessage)
    },
  })
}

export const useUserDeleteAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await deleteAvatar()
      return response.data
    },
    onSuccess: (updatedData) => {
      // Update the cache and explicitly clear the avatar field
      queryClient.setQueryData(userQueryKeys.customerDetails(), (oldData: UserResponseDto | undefined) => {
        if (!oldData) return updatedData

        return {
          ...oldData,
          ...updatedData,
          // Explicitly clear the avatar field
          avatar: updatedData?.avatar || null
        }
      })

      // Also invalidate to ensure fresh data from server
      queryClient.invalidateQueries({ queryKey: userQueryKeys.customerDetails() })
    },
    onError: (error: unknown) => {
      console.error('Failed to delete avatar:', error)
      const errorMessage = extractErrorMessage(error, 'Failed to delete avatar')
      showToast.error(errorMessage)
    },
  })
}

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (customerData: CreateCustomData['body'] & {
      tosAccepted?: boolean;
      signedAgreementId?: string;
      privyWalletAddress: string;
      privySmartWalletAddress: string;
    }) => {
      // Generate a unique signed agreement ID for TOS tracking
      const signedAgreementId = customerData.signedAgreementId || `tos_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      // Create the request body with proper structure including wallet addresses
      const requestBody = {
        customer: {
          ...customerData.customer,
        },
        privyWalletAddress: customerData.privyWalletAddress,
        privySmartWalletAddress: customerData.privySmartWalletAddress,
        // Pass TOS acceptance as separate parameters for backend processing
        tosAccepted: customerData.tosAccepted || false,
        signedAgreementId,
        developer_accepted_tos: true, // We handle TOS on frontend
      }

    const response = await createCustom({
        body: requestBody as CreateCustomerDto,
      })


      return response.data
    },
    onSuccess: (bridgeKycData) => {
      console.log('Customer created successfully:', bridgeKycData)

      // Invalidate user queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: userQueryKeys.customerDetails() })

      showToast.success('Customer created successfully!')
    },
    onError: (error: unknown) => {
      console.error('Failed to create customer:', error)
      const errorMessage = extractErrorMessage(error, 'Failed to create customer')
      showToast.error(errorMessage)
    },
  })
}

// KYC-related mutations
export const useKycConfirm = () => {
  const queryClient = useQueryClient()
  const { setKycStatus } = useUserActions()

  return useMutation({
    mutationFn: async ({ inquiryId }: { inquiryId: string }) => {
      // This would typically call an API to confirm the KYC with the inquiry ID
      // For now, we'll simulate the confirmation process
      console.log('Confirming KYC with inquiry ID:', inquiryId)

      // Return the inquiry ID for tracking
      return { inquiryId, status: 'confirmed' }
    },
    onMutate: async ({ inquiryId }) => {
      // Optimistically set status to PENDING when user completes KYC form
      console.log('KYC form completed, setting status to PENDING')
      setKycStatus(KYCVerificationStatus.PENDING)

      return { inquiryId }
    },
    onSuccess: (data) => {
      console.log('KYC confirmation successful:', data)

      // Invalidate KYC-related queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all })

      showToast.success('KYC verification submitted successfully!')
    },
    onError: (error: unknown, _variables, _context) => {
      console.error('Failed to confirm KYC:', error)

      // Revert status back to NOT_STARTED if confirmation failed
      setKycStatus(KYCVerificationStatus.NOT_STARTED)

      const errorMessage = extractErrorMessage(error, 'Failed to submit KYC verification')
      showToast.error(errorMessage)
    },
  })
}

export const useKycRetry = () => {
  const queryClient = useQueryClient()
  const { setKycStatus } = useUserActions()

  return useMutation({
    mutationFn: async () => {
      // Get current user data to fetch bridgeKYC info
      const userData = queryClient.getQueryData(userQueryKeys.customerDetails()) as UserResponseDto | undefined

      if (!userData?.bridgeKyc?.bridgeKycId) {
        throw new Error('No bridge KYC ID found for retry')
      }

      // Call the API to retry KYC
      const response = authorizedApiCall(UserService.getMe)

      // Reset KYC status to NOT_STARTED to trigger the form again
      setKycStatus(KYCVerificationStatus.NOT_STARTED)

      return response
    },
    onSuccess: (data) => {
      console.log('KYC retry successful:', data)

      // Invalidate all user queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all })

      showToast.success('KYC verification reset successfully!')
    },
    onError: (error) => {
      console.error('Failed to retry KYC:', error)
      showToast.error('Failed to reset KYC verification')
    },
  })
}

// TOS-related mutations
export const useTosAccept = () => {
  const queryClient = useQueryClient()
  const { setTosStatus } = useUserActions()

  return useMutation({
    mutationFn: async ({ signedAgreementId }: { signedAgreementId?: string }) => {
      // Generate a unique signed agreement ID for TOS tracking
      const agreementId = signedAgreementId || `tos_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      // Since backend handles TOS with reliance API, we just need to track acceptance locally
      console.log('TOS accepted with agreement ID:', agreementId)

      // Return completion status with agreement ID
      return { status: 'accepted', signedAgreementId: agreementId }
    },
    onMutate: async () => {
      // Optimistically set status to ACCEPTED when user accepts TOS
      console.log('TOS accepted on frontend, setting status to ACCEPTED')
      setTosStatus(TOSStatus.ACCEPTED)

      return {}
    },
    onSuccess: (data) => {
      console.log('TOS acceptance successful:', data)

      // Invalidate user queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all })

      showToast.success('Terms of Service accepted successfully!')
    },
    onError: (error) => {
      console.error('Failed to accept TOS:', error)

      // Revert status back to NOT_STARTED if acceptance failed
      setTosStatus(TOSStatus.NOT_STARTED)

      showToast.error('Failed to accept Terms of Service')
    },
  })
}

// Legacy TOS completion hook for backward compatibility
export const useTosComplete = () => {
  return useTosAccept()
}

// Wallet address update mutation
export const useUpdatePrivyWalletAddresses = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (walletData: { privyWalletAddress: string; privySmartWalletAddress: string }) => {
      const response = await updatePrivyWalletAddresses({
        body: {
          privyWalletAddress: walletData.privyWalletAddress,
          privySmartWalletAddress: walletData.privySmartWalletAddress,
        },
      })
      return response.data
    },
    onSuccess: (updatedData) => {
      // Update the cache with the new wallet addresses
      queryClient.setQueryData(userQueryKeys.customerDetails(), (oldData: UserResponseDto | undefined) => {
        if (!oldData) return updatedData
        return {
          ...oldData,
          privyWalletAddress: updatedData?.privyWalletAddress,
          privySmartWalletAddress: updatedData?.privySmartWalletAddress,
        }
      })

      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: userQueryKeys.customerDetails() })
    },
    onError: (error: unknown) => {
      console.error('Failed to update wallet addresses:', error)
      const errorMessage = extractErrorMessage(error, 'Failed to update wallet addresses')
      showToast.error(errorMessage)
    },
  })
}
