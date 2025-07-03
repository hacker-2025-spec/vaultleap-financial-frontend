'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  usePrivy,
  useIdentityToken
} from '@privy-io/react-auth'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { getAccessToken } from '@privy-io/react-auth'
import { getMe, checkKyc } from '@/client/index'
import { userQueryKeys } from '@/api/user'
import { useUserActions } from '@/stores/userStore'
import client from '@/api/apiClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'
import { showToast } from '@/utils/toast'
import Logo from '@/components/features/logo/components/Logo'
import OAuth from '../OAuth/OAuth'
import { useEnsureWallet } from '@/hooks/useEnsureWallet'
import { useAuth } from '@/components/providers/AuthHandler'

interface CustomLoginProps {
  isOpen: boolean
  onClose: () => void
}

const CustomLogin = ({ isOpen, onClose }: CustomLoginProps) => {
  const { ready, authenticated } = usePrivy()
  const { identityToken } = useIdentityToken()
  const { ensureWalletExists } = useEnsureWallet()
  const authContext = useAuth()
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  const queryClient = useQueryClient()
  const { setLoggedIn, setUserToken } = useUserActions()

  // Extract auth functions with null checks
  const sendCodeEmail = authContext?.sendCodeEmail
  const loginWithCodeEmail = authContext?.loginWithCodeEmail
  const loginWithPasskey = authContext?.loginWithPasskey
  const emailState = authContext?.emailState

  // Local state for loading
  const [isLoadingCustomerDetails, setIsLoadingCustomerDetails] = useState(false)

  // Update navigate ref when navigate changes
  navigateRef.current = navigate

  // Handle post-login flow: ensure wallet exists, fetch user data and redirect to dashboard
  const handlePostLoginFlow = useCallback(async (_identityToken: string) => {
    try {
      console.log('🔑 CustomLogin: Starting post-login flow...')

      // Show loading state
      setIsLoadingCustomerDetails(true)

      // Ensure user has a wallet before proceeding
      await ensureWalletExists()

      // Tokens are already stored in userStore, proceed with data fetching
      console.log('Prefetching customer data and KYC details...')

      // Prefetch customer details
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

      // Prefetch KYC details if customer has bridgeKycId
      if (customerDetails?.bridgeKyc?.bridgeKycId) {
        try {
          console.log('Prefetching KYC status...')
          await queryClient.fetchQuery({
            queryKey: userQueryKeys.kycStatus(customerDetails.bridgeKyc.bridgeKycId),
            queryFn: async () => {
              const response = await checkKyc({
                body: { bridgeKYCId: customerDetails.bridgeKyc!.bridgeKycId },
                client
              })
              if (response?.data) {
                return response.data
              }
              throw new Error('Failed to fetch KYC status')
            },
            staleTime: 1000 * 60 * 5,
          })
          console.log('KYC status prefetched successfully')
        } catch (kycError) {
          console.warn('Failed to prefetch KYC status:', kycError)
          // Don't fail the entire flow if KYC prefetch fails
        }
      }

      // Hide loading state
      setIsLoadingCustomerDetails(false)

      // Navigate to dashboard without closing modal
      navigateRef.current({ to: '/dashboard' })

    } catch (error) {
      console.error('Failed to complete post-login flow:', error)
      setIsLoadingCustomerDetails(false)
      showToast.error('Login successful, but failed to load user data. Please refresh the page.')
      // Don't close modal automatically - let user dismiss it
    }
  }, [queryClient, setIsLoadingCustomerDetails, ensureWalletExists])

  // Email and passkey authentication is now handled by AuthProvider

  // Local state
  const [email, setEmail] = useState('')
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [pendingPostLogin, setPendingPostLogin] = useState(false)

  // Watch for identity token and store both tokens in userStore, then trigger post-login flow
  useEffect(() => {
    console.log('🔍 CustomLogin useEffect triggered:', { ready, authenticated, identityToken: !!identityToken, pendingPostLogin })

    // For OAuth, we need to wait for either authenticated state OR identityToken to be available
    // Sometimes OAuth completes but authenticated state takes a moment to update
    if (ready && pendingPostLogin && (authenticated || identityToken) && identityToken) {
      console.log('🔑 CustomLogin: Authentication detected (OAuth or other), fetching access token and storing both in userStore')

      const fetchAndStoreTokens = async () => {
        try {
          // Get access token from Privy
          let accessToken = null
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

          // Store both tokens in userStore
          setUserToken({
            privyToken: identityToken,
            accessToken: accessToken
          })
          setLoggedIn(true)

          setPendingPostLogin(false)
          handlePostLoginFlow(identityToken)

        } catch (error) {
          console.error('Failed to fetch and store tokens:', error)
          // Still proceed with just identity token
          setUserToken({ privyToken: identityToken })
          setLoggedIn(true)
          setPendingPostLogin(false)
          handlePostLoginFlow(identityToken)
        }
      }

      fetchAndStoreTokens()
    }
  }, [ready, authenticated, identityToken, pendingPostLogin, handlePostLoginFlow, setUserToken, setLoggedIn])



  // Log when user becomes authenticated (for other login methods like OAuth)
  useEffect(() => {
    if (ready && authenticated && !pendingPostLogin) {
      console.log('🔑 CustomLogin: User authenticated, but keeping modal open')
      // Don't close modal automatically - let user dismiss it
    }
  }, [ready, authenticated, pendingPostLogin])

  const handleEmailSubmit = async () => {
    if (!email) {
      showToast.error('Please enter your email address')
      return
    }
    if (!sendCodeEmail) {
      showToast.error('Authentication not ready. Please try again.')
      return
    }
    try {
      await sendCodeEmail({ email })
      showToast.success('Verification code sent to your email')
    } catch (error) {
      console.error('Send email code error:', error)
    }
  }

  const handleOtpSubmit = async () => {
    if (!otpCode || otpCode.length !== 6) {
      showToast.error('Please enter the 6-digit verification code')
      return
    }
    if (!loginWithCodeEmail) {
      showToast.error('Authentication not ready. Please try again.')
      return
    }
    try {
      // First authenticate with OTP
      await loginWithCodeEmail({ code: otpCode })

      // Set pending state to trigger prefetching in useEffect
      setPendingPostLogin(true)
    } catch (error) {
      console.error('OTP verification error:', error)
      showToast.error('Invalid verification code. Please try again.')
    }
  }

  const handleBackToEmail = () => {
    setOtpCode('')
  }

  const handlePasskeyLogin = async () => {
    if (!loginWithPasskey) {
      showToast.error('Authentication not ready. Please try again.')
      return
    }
    try {
      setIsPasskeyLoading(true)
      await loginWithPasskey()
    } catch (error) {
      console.error('Passkey login error:', error)
    } finally {
      setIsPasskeyLoading(false)
    }
  }

  const isEmailLoading = emailState?.status === 'sending-code'
  const isOtpLoading = emailState?.status === 'submitting-code'
  const showOtpForm = emailState?.status === 'awaiting-code-input'

  // Handle modal close - only allow when not loading
  const handleModalClose = (open: boolean) => {
    if (!open && !isLoadingCustomerDetails && !isOtpLoading && !isEmailLoading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo height={40} />
          </div>
          <DialogDescription className="text-sm text-gray-600">
            You will be automatically redirected after successful login
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {isLoadingCustomerDetails ? (
            <>
              {/* Loading Customer Details */}
              <div className="flex flex-col items-center space-y-4 py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="text-sm text-gray-600">Loading customer details...</p>
              </div>
            </>
          ) : !showOtpForm ? (
            <>
              {/* Google Login Button */}
              <OAuth
                onComplete={() => {
                  // Don't close modal automatically - let user dismiss it
                  console.log('🔑 OAuth completed, but keeping modal open')
                }}
              />

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEmailSubmit()
                    }
                  }}
                />
                <Button
                  onClick={handleEmailSubmit}
                  disabled={isEmailLoading || !email}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  size="sm"
                >
                  {isEmailLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>

              {/* Passkey Button */}
              <div className="text-center">
                <Button
                  onClick={handlePasskeyLogin}
                  disabled={isPasskeyLoading}
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
                >
                {isPasskeyLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  I have a passkey
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <div className="flex items-center mb-4">
                <Button
                  onClick={handleBackToEmail}
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>

              {/* OTP Instructions */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  We sent a verification code to
                </p>
                <p className="text-sm font-medium text-gray-900">{email}</p>
              </div>

              {/* OTP Input */}
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  maxLength={6}
                  value={otpCode}
                  onChange={setOtpCode}
                  onComplete={handleOtpSubmit}
                  disabled={isOtpLoading || isLoadingCustomerDetails}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <Button
                  onClick={handleOtpSubmit}
                  disabled={isOtpLoading || otpCode.length !== 6 || isLoadingCustomerDetails}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isOtpLoading || isLoadingCustomerDetails ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {isLoadingCustomerDetails ? 'Loading...' : 'Verify Code'}
                </Button>
              </div>

              {/* Resend Code */}
              <div className="text-center">
                <Button
                  onClick={() => sendCodeEmail && sendCodeEmail({ email })}
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal text-sm"
                  disabled={isEmailLoading || !sendCodeEmail || isLoadingCustomerDetails}
                >
                  {isEmailLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Resend code
                </Button>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="text-center mt-6">
            <div className="text-xs text-gray-600">
              <p>
                By logging in I agree to the{' '}
                <a href="/terms-of-service" className="text-blue-600 hover:underline">
                  Terms & Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomLogin
