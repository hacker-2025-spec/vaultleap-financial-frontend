import { useCallback, useRef } from "react"
import { getAccessToken } from "@privy-io/react-auth"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useUserActions } from "@/stores/userStore"
import { getMe } from "@/client/index"
import { userQueryKeys } from "@/api/user"
import client from "@/api/apiClient"
import { useEnsureWallet } from "./useEnsureWallet"

/**
 * Simplified usePrivyLogin hook - now only provides manual post-login flow trigger
 * The main auth logic is handled by the global AuthHandler component
 */
export const usePrivyLogin = () => {
  const { setLoading } = useUserActions()
  const { ensureWalletExists } = useEnsureWallet()
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  const queryClient = useQueryClient()

  // Update navigate ref when navigate changes
  navigateRef.current = navigate

  const handlePostLoginFlow = useCallback(async () => {
    try {
      setLoading(true)

      // Ensure user has a wallet before proceeding
      await ensureWalletExists()

      // Ensure we have both identity and access tokens before proceeding
      console.log('⏳ Ensuring tokens are available...')

      // Wait for access token to be available
      let accessToken: string | null = null
      let attempts = 0
      const maxAttempts = 10

      while (!accessToken && attempts < maxAttempts) {
        try {
          accessToken = await getAccessToken()
          if (accessToken) {
            console.log('✅ Access token obtained successfully')
            break
          }
        } catch (error) {
          console.warn('⚠️ Failed to get access token, retrying...', error)
        }

        attempts++
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      if (!accessToken) {
        throw new Error('Failed to obtain access token after multiple attempts')
      }

      // Prefetch customer data to determine user flow
      console.log('Prefetching customer data...')
      const customerDetails = await queryClient.fetchQuery({
        queryKey: userQueryKeys.customerDetails(),
        queryFn: async () => {
          const response = await getMe({ client })
          if (response?.data) {
            return response.data
          }
          throw new Error('Failed to fetch customer details')
        },
        staleTime: 1000 * 60 * 5,
      })
      console.log('Customer data prefetched successfully', customerDetails)

      // Navigate to loading page which will determine the correct flow
      navigateRef.current({ to: '/loading' })

    } catch (error) {
      console.error('Failed to prefetch customer data:', error)
      // Still redirect to loading page to handle the error state
      navigateRef.current({ to: '/loading' })
    } finally {
      setLoading(false)
    }
  }, [setLoading, queryClient, ensureWalletExists])

  // Auth logic is now handled by the global AuthHandler component
  // This hook only provides manual post-login flow trigger for specific use cases
  return {
    handlePostLoginFlow
  }
}