'use client'

import { useEffect, useCallback, createContext, useContext, ReactNode, useMemo } from 'react'
import { useIdentityToken, usePrivy, getAccessToken, useLoginWithOAuth, useLoginWithEmail, useLoginWithPasskey } from '@privy-io/react-auth'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useUserActions } from '@/stores/userStore'
import { getMe } from '@/client/index'
import { userQueryKeys } from '@/api/user'
import client from '@/api/apiClient'
import { useEnsureWallet } from '@/hooks/useEnsureWallet'
import { showToast } from '@/utils/toast'

// Auth Context
interface AuthContextType {
  initOAuth: (options: { provider: 'google' | 'github' | 'discord' | 'twitter' }) => Promise<void>
  sendCodeEmail: (options: { email: string }) => Promise<void>
  loginWithCodeEmail: (options: { code: string }) => Promise<void>
  loginWithPasskey: () => Promise<void>
  emailState: any // Will be typed properly based on Privy's types
  oauthState: any
  passkeyState: any
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

/**
 * Simple AuthHandler that manages authentication state and redirects
 */
const AuthHandler = () => {
  const { setLoading, setLoggedIn, setUserToken } = useUserActions()
  const { identityToken } = useIdentityToken()
  const { ready, authenticated } = usePrivy()
  const { ensureWalletExists } = useEnsureWallet()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Simple post-login flow
  const handlePostLoginFlow = useCallback(async () => {
    try {
      setLoading(true)

      // Ensure wallet exists
      await ensureWalletExists()

      // Get access token
      await getAccessToken()

      // Fetch customer data
      const customerDetails = await queryClient.fetchQuery({
        queryKey: userQueryKeys.customerDetails(),
        queryFn: async () => {
          const response = await getMe({ client })
          return response?.data
        },
        staleTime: 1000 * 60 * 5,
      })

      // Navigate based on customer existence
      if (customerDetails?.customer) {
        console.log('✅ Customer exists, redirecting to /dashboard')
        navigate({ to: '/dashboard' })
      } else {
        console.log('🆕 No customer found, redirecting to /loading')
        navigate({ to: '/loading' })
      }

    } catch (error) {
      console.error('Post-login flow error:', error)
      navigate({ to: '/loading' })
    } finally {
      setLoading(false)
    }
  }, [setLoading, ensureWalletExists, queryClient, navigate])

  // Handle authentication state changes
  useEffect(() => {
    if (!ready) return

    if (authenticated && identityToken) {
      // Store tokens
      const storeTokens = async () => {
        try {
          const accessToken = await getAccessToken()
          setUserToken({
            privyToken: identityToken,
            accessToken: accessToken || undefined
          })
          setLoggedIn(true)
          console.log('✅ Tokens stored successfully')

          // Check if this is an OAuth redirect
          const urlParams = new URLSearchParams(window.location.search)
          const isOAuthRedirect = urlParams.has('code') || urlParams.has('state')

          if (isOAuthRedirect) {
            console.log('🔍 OAuth redirect detected, handling post-login flow')
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname)
            // Execute post-login flow
            handlePostLoginFlow()
          }

        } catch (error) {
          console.error('Failed to get access token:', error)
          setUserToken({ privyToken: identityToken })
          setLoggedIn(true)
        }
      }

      storeTokens()
    } else if (!authenticated) {
      setLoading(false)
    }
  }, [ready, authenticated, identityToken, setUserToken, setLoggedIn, setLoading, handlePostLoginFlow])

  return null
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { ready } = usePrivy()
  const navigate = useNavigate()
  const { setLoading, setLoggedIn, setUserToken } = useUserActions()
  const { ensureWalletExists } = useEnsureWallet()
  const queryClient = useQueryClient()
  const { identityToken } = useIdentityToken()

  // Helper function to handle login completion
  const handleLoginComplete = useCallback(async ({ user, isNewUser, wasAlreadyAuthenticated, loginMethod }: any) => {
    console.log('🔑 ✅ Login completed:', { user, isNewUser, wasAlreadyAuthenticated, loginMethod })
    showToast.success('Successfully logged in!')

    try {
      setLoading(true)

      // Fetch and store tokens
      const accessToken = await getAccessToken()

      setUserToken({
        privyToken: identityToken || '',
        accessToken: accessToken || undefined
      })
      setLoggedIn(true)

      // Ensure wallet exists
      await ensureWalletExists()

      // Prefetch customer data
      const customerDetails = await queryClient.fetchQuery({
        queryKey: userQueryKeys.customerDetails(),
        queryFn: async () => {
          const response = await getMe({ client })
          return response?.data
        },
        staleTime: 1000 * 60 * 5,
      })

      // Now redirect based on customer existence (not just isNewUser)
      if(!wasAlreadyAuthenticated) {
      if (customerDetails?.customer) {
        console.log('✅ Customer exists, redirecting to /dashboard')
        navigate({ to: '/dashboard' })
      } else {
        console.log('🆕 No customer found, redirecting to /loading')
        navigate({ to: '/loading' })
      }
    }

    } catch (error) {
      console.error('Error in login completion:', error)
      navigate({ to: '/loading' })
    } finally {
      setLoading(false)
    }
    
  }, [setLoading, setUserToken, setLoggedIn, ensureWalletExists, queryClient, identityToken])

  // OAuth handling with state
  const {
    state: oauthState,
    initOAuth
  } = useLoginWithOAuth({
    onComplete: handleLoginComplete,
    onError: (error) => {
      console.error('AuthProvider: OAuth login error:', error)
      showToast.error(`Login failed: ${error || 'Authentication failed'}`)
    },
  })

  // Email login handling with state
  const {
    sendCode: sendCodeEmail,
    loginWithCode: loginWithCodeEmail,
    state: emailState,
  } = useLoginWithEmail({
    onComplete: handleLoginComplete,
    onError: (error) => {
      console.error('AuthProvider: Email login error:', error)
      showToast.error('Login failed. Please try again.')
    },
  })

  // Passkey login handling with state
  const {
    state: passkeyState,
    loginWithPasskey
  } = useLoginWithPasskey({
    onComplete: handleLoginComplete,
    onError: (error) => {
      console.error('AuthProvider: Passkey login error:', error)
      showToast.error('Passkey login failed. Please try again.')
    },
  })

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo<AuthContextType | null>(() => {
    return ready ? {
      initOAuth,
      sendCodeEmail,
      loginWithCodeEmail,
      loginWithPasskey,
      emailState,
      oauthState,
      passkeyState
    } : null
  }, [ready, initOAuth, sendCodeEmail, loginWithCodeEmail, loginWithPasskey, emailState, oauthState, passkeyState])

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthHandler />
      {children}
    </AuthContext.Provider>
  )
}
