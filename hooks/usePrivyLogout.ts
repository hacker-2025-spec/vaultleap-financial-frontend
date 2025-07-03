import { useLogout } from "@privy-io/react-auth"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useUserActions } from "@/stores/userStore"
import { showToast } from "@/utils/toast"
import { OpenAPI } from '@klydo-io/getrewards-backend-api'
import { userQueryKeys } from "@/api/user"

export const usePrivyLogout = () => {
  const { setLoading, clearUserInfoAndToken, setLoggedIn } = useUserActions()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { logout } = useLogout({
    onSuccess: () => {
      console.log('Privy logout successful')

      // Clear userStore state
      setLoggedIn(false)
      clearUserInfoAndToken()

      // Note: Privy logout automatically clears localStorage tokens
      // No manual token clearing needed

      // Clear React Query customer cache
      queryClient.removeQueries({ queryKey: userQueryKeys.customerDetails() })

      // Clear OpenAPI token
      OpenAPI.TOKEN = undefined

      console.log('All authentication state cleared')
    }
  })

  async function logoutHandler() {
    try {
      setLoading(true)

      // Perform Privy logout (onSuccess callback will handle state clearing)
      await logout()

      setLoading(false)

      // Show success message
      showToast.success('Successfully logged out')

      // Navigate to the landing page
      navigate({ to: '/' })
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        console.error('Logout error:', error)
        showToast.error(`Logout failed: ${error.message}`)
      }
    }
  }

  return {
    logout: logoutHandler
  }
}