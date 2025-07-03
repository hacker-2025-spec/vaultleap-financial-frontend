import { useQuery } from '@tanstack/react-query'
import { getMe, type UserResponseDto } from '@/client/index'
import { checkKycOptions, getMeOptions } from '@/client/@tanstack/react-query.gen'
import { useIsLoggedIn, useUserActions, useKycStatus, useTosStatus, useIsKycModalOpen } from '@/stores/userStore'
import { KYCVerificationStatus, KYCVerificationServerStatus, TOSStatus, TOSServerStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { useEffect } from 'react'
import { useIdentityToken } from '@privy-io/react-auth'
import client from '@/api/apiClient'



export const userQueryKeys = {
  all: ['user'] as const,
  customerDetails: () => [...userQueryKeys.all, 'customerDetails'] as const,
  kycStatus: (bridgeKycId: string) => [...userQueryKeys.all, 'kycStatus', bridgeKycId] as const,
}

export const getKycVerificationStatusFromUser = (userData: UserResponseDto | undefined): KYCVerificationStatus => {
  if (!userData?.bridgeKyc?.kyc_status) {
    return KYCVerificationStatus.NOT_STARTED
  }

  const kycStatus = userData.bridgeKyc.kyc_status.toLowerCase()

  switch (kycStatus) {
    case KYCVerificationServerStatus.APPROVED:
      return KYCVerificationStatus.SUCCESS
    case KYCVerificationServerStatus.REJECTED:
      return KYCVerificationStatus.FAILED
    case KYCVerificationServerStatus.PENDING:
    case KYCVerificationServerStatus.UNDER_REVIEW:
    case KYCVerificationServerStatus.MANUAL_REVIEW:
    case KYCVerificationServerStatus.AWAITING_UBO:
      return KYCVerificationStatus.PENDING
    case KYCVerificationServerStatus.INCOMPLETE:
      // Incomplete means user hasn't finished the KYC process yet
      return KYCVerificationStatus.NOT_STARTED
    default:
      return KYCVerificationStatus.NOT_STARTED
  }
}

// Helper function to determine if KYC is under review (needs additional time)
export const isKycUnderReview = (userData: UserResponseDto | undefined): boolean => {
  if (!userData?.bridgeKyc?.kyc_status) {
    return false
  }

  const kycStatus = userData.bridgeKyc.kyc_status.toLowerCase()
  return kycStatus === KYCVerificationServerStatus.UNDER_REVIEW ||
         kycStatus === KYCVerificationServerStatus.MANUAL_REVIEW
}

// Helper function to get KYC status from server response
export const getKycStatusFromServerData = (kycData: unknown): KYCVerificationStatus => {
  if (!kycData || typeof kycData !== 'object' || !('kyc_status' in kycData)) {
    return KYCVerificationStatus.NOT_STARTED
  }

  const data = kycData as { kyc_status: string }
  const kycStatus = data.kyc_status.toLowerCase()

  switch (kycStatus) {
    case KYCVerificationServerStatus.APPROVED:
      return KYCVerificationStatus.SUCCESS
    case KYCVerificationServerStatus.REJECTED:
      return KYCVerificationStatus.FAILED
    case KYCVerificationServerStatus.PENDING:
    case KYCVerificationServerStatus.UNDER_REVIEW:
    case KYCVerificationServerStatus.MANUAL_REVIEW:
    case KYCVerificationServerStatus.AWAITING_UBO:
      return KYCVerificationStatus.PENDING
    case KYCVerificationServerStatus.INCOMPLETE:
      return KYCVerificationStatus.NOT_STARTED
    default:
      return KYCVerificationStatus.NOT_STARTED
  }
}

// Helper function to check if KYC is under review from server data
export const isKycUnderReviewFromServerData = (kycData: unknown): boolean => {
  if (!kycData || typeof kycData !== 'object' || !('kyc_status' in kycData)) {
    return false
  }

  const data = kycData as { kyc_status: string }
  const kycStatus = data.kyc_status.toLowerCase()
  return kycStatus === KYCVerificationServerStatus.UNDER_REVIEW ||
         kycStatus === KYCVerificationServerStatus.MANUAL_REVIEW
}

// Helper function to get TOS status from server response
export const getTosStatusFromServerData = (kycData: unknown): TOSStatus => {
  if (!kycData || typeof kycData !== 'object' || !('tos_status' in kycData)) {
    return TOSStatus.NOT_STARTED
  }

  const data = kycData as { tos_status: string }
  const tosStatus = data.tos_status.toLowerCase()
  switch (tosStatus) {
    case TOSServerStatus.APPROVED:
    case 'accepted':
      return TOSStatus.ACCEPTED
    case TOSServerStatus.PENDING:
    case 'pending':
      return TOSStatus.PENDING
    default:
      return TOSStatus.NOT_STARTED
  }
}

// Helper function to get TOS status from user data
export const getTosStatusFromUser = (userData: UserResponseDto | undefined): TOSStatus => {
  // Check both bridgeKyc.tos_status and customer.has_accepted_terms_of_service
  if (userData?.customer?.has_accepted_terms_of_service) {
    return TOSStatus.ACCEPTED
  }

  if (!userData?.bridgeKyc?.tos_status) {
    return TOSStatus.NOT_STARTED
  }

  const tosStatus = userData.bridgeKyc.tos_status.toLowerCase()
  switch (tosStatus) {
    case TOSServerStatus.APPROVED:
    case 'accepted':
      return TOSStatus.ACCEPTED
    case TOSServerStatus.PENDING:
    case 'pending':
      return TOSStatus.PENDING
    default:
      return TOSStatus.NOT_STARTED
  }
}

// Helper function to get KYC status from user data
export const getKycStatusFromUser = (userData: UserResponseDto | undefined): KYCVerificationStatus => {
  if (!userData?.bridgeKyc?.kyc_status) {
    return KYCVerificationStatus.NOT_STARTED
  }

  const kycStatus = userData.bridgeKyc.kyc_status.toLowerCase()
  switch (kycStatus) {
    case KYCVerificationServerStatus.APPROVED:
    case 'approved':
      return KYCVerificationStatus.SUCCESS
    case KYCVerificationServerStatus.PENDING:
    case KYCVerificationServerStatus.INCOMPLETE:
    case KYCVerificationServerStatus.AWAITING_UBO:
    case KYCVerificationServerStatus.MANUAL_REVIEW:
    case KYCVerificationServerStatus.UNDER_REVIEW:
    case 'pending':
      return KYCVerificationStatus.PENDING
    case KYCVerificationServerStatus.REJECTED:
    case 'rejected':
      return KYCVerificationStatus.FAILED
    default:
      return KYCVerificationStatus.NOT_STARTED
  }
}

export const useUserCustomerDetails = () => {
  const isLoggedIn = useIsLoggedIn()
  const { identityToken } = useIdentityToken()

  // Check if we have a valid identity token from Privy
  const hasIdentityToken = !!identityToken

  // Only enable the query if user is logged in AND has an identity token
  const shouldFetchUserData = isLoggedIn && hasIdentityToken

  return useQuery({
    queryFn: async function ()  {
          const me = await getMe()
          if(me.data) {
            return me.data
          }
          
    },
    queryKey: userQueryKeys.customerDetails(),
    enabled: shouldFetchUserData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook to sync customer data to userStore
export const useUserDataSync = () => {
  const isLoggedIn = useIsLoggedIn()
  const { data: userData } = useUserCustomerDetails()
  const { setUserInfo, setTosStatus, setKycStatus } = useUserActions()

  useEffect(() => {
    // Only sync data when user is logged in and we have data
    if (isLoggedIn && userData) {
      // Update user info in store
      setUserInfo(userData)

      // Sync TOS status from customer data
      const tosStatus = getTosStatusFromUser(userData)
      setTosStatus(tosStatus)

      // Sync KYC status from customer data
      const kycStatus = getKycStatusFromUser(userData)
      setKycStatus(kycStatus)

      console.log('Customer data synced to store:', {
        tosStatus,
        kycStatus,
        hasCustomer: !!userData.customer,
        hasBridgeKyc: !!userData.bridgeKyc
      })
    }
  }, [isLoggedIn, userData, setUserInfo, setTosStatus, setKycStatus])

  return userData
}

export const useCheckKycStatus = (refetchInterval?: number) => {
  const isLoggedIn = useIsLoggedIn()
  const { identityToken } = useIdentityToken()
  const hasIdentityToken = !!identityToken
  const { data: userData } = useUserCustomerDetails()
  const bridgeKycId = userData?.bridgeKyc?.bridgeKycId

  return useQuery({
    ...checkKycOptions({
      body: { bridgeKYCId: bridgeKycId! }
    }),
    enabled: isLoggedIn && hasIdentityToken && !!bridgeKycId,
    refetchInterval,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Enhanced KYC status management hook with local state synchronization
export const useKycStatusManager = () => {
  const isLoggedIn = useIsLoggedIn()
  const { identityToken } = useIdentityToken()
  const hasIdentityToken = !!identityToken
  const { data: userData } = useUserCustomerDetails()
  const { setKycStatus, setKycSuccessModalOpen } = useUserActions()
  const localKycStatus = useKycStatus()
  const isKycModalOpen = useIsKycModalOpen()
  const bridgeKycId = userData?.bridgeKyc?.bridgeKycId

  // Initial fetch to get current server status
  const { data: kycData, isLoading } = useQuery({
    ...checkKycOptions({
      body: { bridgeKYCId: bridgeKycId! }
    }),
    enabled: isLoggedIn && hasIdentityToken && !!bridgeKycId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })

  // Update local state when server data changes (with smart logic)
  useEffect(() => {
    if (kycData && typeof kycData === 'object' && 'kyc_status' in kycData) {
      const serverStatus = getKycStatusFromServerData(kycData)

      // Smart status update logic:
      // 1. If local status is SUCCESS, don't downgrade it unless server explicitly says FAILED
      // 2. If local status is PENDING and server says SUCCESS, upgrade to SUCCESS
      // 3. If local status is NOT_STARTED, always use server status
      // 4. If server says FAILED, always use that (user needs to retry)

      let shouldUpdateStatus = false
      let newStatus = serverStatus

      if (localKycStatus === KYCVerificationStatus.SUCCESS) {
        // Only downgrade from SUCCESS if server explicitly says FAILED
        if (serverStatus === KYCVerificationStatus.FAILED) {
          shouldUpdateStatus = true
          newStatus = KYCVerificationStatus.FAILED
        }
        // Don't downgrade SUCCESS to NOT_STARTED or PENDING (server lag)
      } else if (localKycStatus === KYCVerificationStatus.PENDING) {
        // Upgrade from PENDING to SUCCESS, or downgrade to FAILED
        if (serverStatus === KYCVerificationStatus.SUCCESS || serverStatus === KYCVerificationStatus.FAILED) {
          shouldUpdateStatus = true
          newStatus = serverStatus

          // Show success modal if upgrading to SUCCESS, but only if KYC modal is not open
          if (serverStatus === KYCVerificationStatus.SUCCESS && !isKycModalOpen) {
            setKycSuccessModalOpen(true)
          }
        }
        // Don't downgrade PENDING to NOT_STARTED (server lag)
      } else if (localKycStatus === KYCVerificationStatus.NOT_STARTED) {
        // Always update from NOT_STARTED to any server status
        shouldUpdateStatus = true
        newStatus = serverStatus
      } else if (localKycStatus === KYCVerificationStatus.FAILED) {
        // Update from FAILED to any other status (retry scenarios)
        shouldUpdateStatus = true
        newStatus = serverStatus
      }

      // Update local status if needed
      if (shouldUpdateStatus) {
        console.log(`KYC Status Update: ${localKycStatus} -> ${newStatus}`)
        setKycStatus(newStatus)
      } else {
        console.log(`KYC Status Preserved: keeping local ${localKycStatus}, server says ${serverStatus}`)
      }
    }
  }, [kycData, localKycStatus, setKycStatus, setKycSuccessModalOpen, isKycModalOpen])

  return {
    kycStatus: localKycStatus,
    serverKycData: kycData,
    isLoading,
    isUnderReview: isKycUnderReviewFromServerData(kycData),
  }
}

// Polling hook for active KYC monitoring (5-minute intervals)
export const useKycStatusPolling = (enabled: boolean = true) => {
  const isLoggedIn = useIsLoggedIn()
  const { identityToken } = useIdentityToken()
  const hasIdentityToken = !!identityToken
  const { data: userData } = useUserCustomerDetails()
  const { setKycStatus, setKycSuccessModalOpen } = useUserActions()
  const localKycStatus = useKycStatus()
  const isKycModalOpen = useIsKycModalOpen()
  const bridgeKycId = userData?.bridgeKyc?.bridgeKycId

  const { data: pollingData } = useQuery({
    ...checkKycOptions({
      body: { bridgeKYCId: bridgeKycId! }
    }),
    enabled: enabled && isLoggedIn && hasIdentityToken && !!bridgeKycId && localKycStatus === KYCVerificationStatus.PENDING,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  // Update local state when polling data changes (with smart logic)
  useEffect(() => {
    if (pollingData && typeof pollingData === 'object' && 'kyc_status' in pollingData) {
      const serverStatus = getKycStatusFromServerData(pollingData)

      // Only update if we're currently PENDING and server says SUCCESS or FAILED
      if (localKycStatus === KYCVerificationStatus.PENDING) {
        if (serverStatus === KYCVerificationStatus.SUCCESS) {
          console.log('Polling detected KYC SUCCESS - updating status and showing modal')
          setKycStatus(KYCVerificationStatus.SUCCESS)
          // Only show success modal if KYC modal is not open (user not in iframe process)
          if (!isKycModalOpen) {
            setKycSuccessModalOpen(true)
          }
        } else if (serverStatus === KYCVerificationStatus.FAILED) {
          console.log('Polling detected KYC FAILED - updating status')
          setKycStatus(KYCVerificationStatus.FAILED)
        }
        // Don't downgrade PENDING to NOT_STARTED (server lag)
      }
    }
  }, [pollingData, localKycStatus, setKycStatus, setKycSuccessModalOpen, isKycModalOpen])

  return {
    pollingData,
    isPolling: enabled && localKycStatus === KYCVerificationStatus.PENDING,
  }
}

// Hook for when user begins KYC process
export const useBeginKycProcess = () => {
  const { setKycStatus } = useUserActions()

  const beginKycProcess = () => {
    setKycStatus(KYCVerificationStatus.PENDING)
  }

  return { beginKycProcess }
}





export const useCompleteOnboarding = () => {
  const { setOnboarding } = useUserActions()

  const completeOnboarding = () => {
    setOnboarding(false)
  }

  return { completeOnboarding }
}

// Hook for immediate KYC status check on mount
export const useInitialKycStatusCheck = () => {
  const isLoggedIn = useIsLoggedIn()
  const { identityToken } = useIdentityToken()
  const hasIdentityToken = !!identityToken
  const { data: userData } = useUserCustomerDetails()
  const { setTosStatus, setKycStatus } = useUserActions()
  const bridgeKycId = userData?.bridgeKyc?.bridgeKycId

  console.log('useInitialKycStatusCheck - Checking KYC status on mount for bridgeKycId:', bridgeKycId)

  // Immediate fetch on mount to get current KYC/TOS status
  const { data: kycData, isLoading, error } = useQuery({
    ...checkKycOptions({
      body: { bridgeKYCId: bridgeKycId! }
    }),
    enabled: isLoggedIn && hasIdentityToken && !!bridgeKycId,
    staleTime: 0, // Always fetch fresh data
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    refetchOnMount: 'always', // Always refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus for initial check
  })

  // Update both KYC and TOS status when data is received
  useEffect(() => {
    if (kycData && typeof kycData === 'object') {
      console.log('useInitialKycStatusCheck - Received KYC data:', kycData)

      // Update KYC status if available
      if ('kyc_status' in kycData) {
        const kycStatus = getKycStatusFromServerData(kycData)
        console.log('useInitialKycStatusCheck - Setting KYC status to:', kycStatus)
        setKycStatus(kycStatus)
      }

      // Update TOS status if available
      if ('tos_status' in kycData) {
        const tosStatus = getTosStatusFromServerData(kycData)
        console.log('useInitialKycStatusCheck - Setting TOS status to:', tosStatus)
        setTosStatus(tosStatus)
      }
    }
  }, [kycData, setKycStatus, setTosStatus])

  return {
    kycData,
    isLoading,
    error,
    isChecking: isLoading,
  }
}

// TOS Status Management Hooks (Simplified for TOS Reliance API)
export const useTosStatusManager = () => {
  const localTosStatus = useTosStatus()

  // With TOS reliance API, TOS is handled during customer creation
  // Return local status for backward compatibility
  return {
    tosStatus: localTosStatus,
    tosLink: null, // No longer needed with TOS reliance API
    isLoading: false,
    error: null,
    serverTosData: null,
  }
}

// Legacy TOS polling hook for backward compatibility (no longer needed with TOS reliance API)
export const useTosStatusPolling = (_enabled: boolean = true) => {
  // Return empty data since TOS polling is no longer needed
  return {
    pollingData: null,
    isPolling: false,
    isPollingLoading: false,
  }
}
