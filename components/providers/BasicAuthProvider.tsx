'use client'

import { useEffect } from 'react'
import { BasicAuthModal } from '@/components/auth/BasicAuthModal'
import { verifyAuthToken } from '@/utils/basicAuth'
import {
  useIsBasicAuthAuthenticated,
  useBasicAuthToken,
  useUserActions
} from '@/stores/userStore'

const STORAGE_KEY = 'vaultleap_basic_auth_token'

interface BasicAuthProviderProps {
  children: React.ReactNode
}

export const BasicAuthProvider = ({ children }: BasicAuthProviderProps) => {
  const isAuthenticated = useIsBasicAuthAuthenticated()
  const token = useBasicAuthToken()
  const {
    setBasicAuthAuthenticated,
    setBasicAuthToken,
    setBasicAuthModalOpen
  } = useUserActions()

  // Check for existing auth token on mount
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedToken = localStorage.getItem(STORAGE_KEY)
        console.log('BasicAuthProvider: Checking stored token:', storedToken ? 'Found' : 'Not found')

        if (storedToken && verifyAuthToken(storedToken)) {
          // Valid token found
          console.log('BasicAuthProvider: Valid token found, authenticating user')
          setBasicAuthToken(storedToken)
          setBasicAuthAuthenticated(true)
          setBasicAuthModalOpen(false)
        } else {
          // No valid token, show auth modal
          console.log('BasicAuthProvider: No valid token, showing auth modal')
          if (storedToken) {
            // Remove invalid token
            localStorage.removeItem(STORAGE_KEY)
            console.log('BasicAuthProvider: Removed invalid token')
          }
          setBasicAuthAuthenticated(false)
          setBasicAuthModalOpen(true)
        }
      } catch (error) {
        console.error('BasicAuthProvider: Error checking stored auth:', error)
        setBasicAuthAuthenticated(false)
        setBasicAuthModalOpen(true)
      }
    }

    // Small delay to ensure localStorage is ready
    const timeoutId = setTimeout(checkStoredAuth, 100)

    return () => clearTimeout(timeoutId)
  }, [setBasicAuthAuthenticated, setBasicAuthToken, setBasicAuthModalOpen])

  // Store token in localStorage when it changes
  useEffect(() => {
    try {
      if (token && isAuthenticated) {
        console.log('BasicAuthProvider: Storing token in localStorage')
        localStorage.setItem(STORAGE_KEY, token)
      } else if (!isAuthenticated) {
        console.log('BasicAuthProvider: Removing token from localStorage')
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('BasicAuthProvider: Error managing localStorage:', error)
    }
  }, [token, isAuthenticated])

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      const storedToken = localStorage.getItem(STORAGE_KEY)

      if (!storedToken || !verifyAuthToken(storedToken)) {
        // Token expired or invalid, require re-authentication
        setBasicAuthAuthenticated(false)
        setBasicAuthToken(null)
        setBasicAuthModalOpen(true)
        localStorage.removeItem(STORAGE_KEY)
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [isAuthenticated, setBasicAuthAuthenticated, setBasicAuthToken, setBasicAuthModalOpen])

  // Show loading or auth modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BasicAuthModal isOpen={!isAuthenticated} />
      </div>
    )
  }

  // Render children if authenticated
  return <>{children}</>
}
