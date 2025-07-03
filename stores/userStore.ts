import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { type UserResponseDto } from '../client/index'
import { KYCVerificationStatus, TOSStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'

export interface UserAuthToken {
  accessToken?: string
  privyToken?: string
}

type UserStore = {
  userInfo: Partial<UserResponseDto>
  userToken: UserAuthToken | undefined
  isLoggedIn: boolean
  isLoading: boolean
  isOnboarding: boolean
  isKycModalOpen: boolean
  isLoginModalOpen: boolean
  isBasicAuthModalOpen: boolean
  isBasicAuthAuthenticated: boolean
  basicAuthToken: string | null
  isChecklistVisible: boolean
  isTransactionModalOpen: boolean
  kycStatus: KYCVerificationStatus
  isKycSuccessModalOpen: boolean
  tosStatus: TOSStatus
  isTosModalOpen: boolean
  actions: {
    setUserInfo: (userInfo: UserResponseDto) => void
    setUserToken: (token: UserAuthToken) => void
    setLoggedIn: (loggedIn: boolean) => void
    setLoading: (loading: boolean) => void
    setOnboarding: (onboarding: boolean) => void
    setKycModalOpen: (open: boolean) => void
    setLoginModalOpen: (open: boolean) => void
    setBasicAuthModalOpen: (open: boolean) => void
    setBasicAuthAuthenticated: (authenticated: boolean) => void
    setBasicAuthToken: (token: string | null) => void
    setChecklistVisible: (visible: boolean) => void
    setTransactionModalOpen: (open: boolean) => void
    setKycStatus: (status: KYCVerificationStatus) => void
    setKycSuccessModalOpen: (open: boolean) => void
    setTosStatus: (status: TOSStatus) => void
    setTosModalOpen: (open: boolean) => void
    clearUserInfoAndToken: () => void
  }
}

const initialState = {
  userInfo: {},
  userToken: {},
  isLoggedIn: false,
  isLoading: false,
  isOnboarding: false,
  isKycModalOpen: false,
  isLoginModalOpen: false,
  isBasicAuthModalOpen: false,
  isBasicAuthAuthenticated: false,
  basicAuthToken: null,
  isChecklistVisible: true,
  isTransactionModalOpen: false,
  kycStatus: KYCVerificationStatus.NOT_STARTED,
  isKycSuccessModalOpen: false,
  tosStatus: TOSStatus.NOT_STARTED,
  isTosModalOpen: false,
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setUserInfo: (userInfo) => {
          set({ userInfo })
        },
        setLoggedIn: (loggedIn) => {
          set({ isLoggedIn: loggedIn })
        },
        setUserToken: (userToken) => {
          set({ userToken })
        },
        setLoading: (loading) => {
          set({ isLoading: loading })
        },
        setOnboarding: (onboarding) => {
          set({ isOnboarding: onboarding })
        },
        setKycModalOpen: (open) => {
          set({ isKycModalOpen: open })
        },
        setLoginModalOpen: (open) => {
          set({ isLoginModalOpen: open })
        },
        setBasicAuthModalOpen: (open) => {
          set({ isBasicAuthModalOpen: open })
        },
        setBasicAuthAuthenticated: (authenticated) => {
          set({ isBasicAuthAuthenticated: authenticated })
        },
        setBasicAuthToken: (token) => {
          set({ basicAuthToken: token })
        },
        setChecklistVisible: (visible) => {
          set({ isChecklistVisible: visible })
        },
        setTransactionModalOpen: (open) => {
          set({ isTransactionModalOpen: open })
        },
        setKycStatus: (status) => {
          set({ kycStatus: status })
        },
        setKycSuccessModalOpen: (open) => {
          set({ isKycSuccessModalOpen: open })
        },
        setTosStatus: (status) => {
          set({ tosStatus: status })
        },
        setTosModalOpen: (open) => {
          set({ isTosModalOpen: open })
        },
        clearUserInfoAndToken() {
          set({
            userInfo: {} as Partial<UserResponseDto>,
            userToken: {},
            isLoggedIn: false,
            isOnboarding: false,
            isKycModalOpen: false,
            isLoginModalOpen: false,
            isBasicAuthModalOpen: false,
            isBasicAuthAuthenticated: false,
            basicAuthToken: null,
            isChecklistVisible: true,
            isTransactionModalOpen: false,
            kycStatus: KYCVerificationStatus.NOT_STARTED,
            isKycSuccessModalOpen: false,
            tosStatus: TOSStatus.NOT_STARTED,
            isTosModalOpen: false
          })
        },
      },
    }),
    {
      name: 'userStore', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        ['userInfo']: state.userInfo,
        ['userToken']: state.userToken,
        ['isLoggedIn']: state.isLoggedIn,
        ['isOnboarding']: state.isOnboarding,
        ['isChecklistVisible']: state.isChecklistVisible,
        ['kycStatus']: state.kycStatus, // Persist KYC status across sessions
        ['tosStatus']: state.tosStatus, // Persist TOS status across sessions
        ['isBasicAuthAuthenticated']: state.isBasicAuthAuthenticated, // Persist basic auth status
        ['basicAuthToken']: state.basicAuthToken, // Persist basic auth token
      }),
    }
  )
)

// Selector hooks with shallow comparison for better performance
export const useUserInfo = () => useUserStore((state) => state.userInfo)
export const useUserToken = () => useUserStore((state) => state.userToken)
export const useUserActions = () => useUserStore((state) => state.actions)
export const useIsLoggedIn = () => useUserStore((state) => state.isLoggedIn)
export const useIsLoading = () => useUserStore((state) => state.isLoading)
export const useIsOnboarding = () => useUserStore((state) => state.isOnboarding)
export const useIsKycModalOpen = () => useUserStore((state) => state.isKycModalOpen)
export const useIsLoginModalOpen = () => useUserStore((state) => state.isLoginModalOpen)
export const useIsBasicAuthModalOpen = () => useUserStore((state) => state.isBasicAuthModalOpen)
export const useIsBasicAuthAuthenticated = () => useUserStore((state) => state.isBasicAuthAuthenticated)
export const useBasicAuthToken = () => useUserStore((state) => state.basicAuthToken)
export const useIsChecklistVisible = () => useUserStore((state) => state.isChecklistVisible)
export const useIsTransactionModalOpen = () => useUserStore((state) => state.isTransactionModalOpen)
export const useKycStatus = () => useUserStore((state) => state.kycStatus)
export const useIsKycSuccessModalOpen = () => useUserStore((state) => state.isKycSuccessModalOpen)
export const useTosStatus = () => useUserStore((state) => state.tosStatus)
export const useIsTosModalOpen = () => useUserStore((state) => state.isTosModalOpen)

// Combined selectors to reduce re-renders
export const useAuthState = () => useUserStore((state) => ({
  isLoggedIn: state.isLoggedIn,
  isLoading: state.isLoading,
}))

export const useOnboardingState = () => useUserStore((state) => ({
  isOnboarding: state.isOnboarding,
  kycStatus: state.kycStatus,
  tosStatus: state.tosStatus,
}))

// Note: Login/logout functionality is now handled by dedicated Privy hooks:
// - usePrivyLogin() for login functionality
// - usePrivyLogout() for logout functionality
// These hooks are imported directly where needed for better separation of concerns

// Simple hook to check if user is authenticated (no complex syncing)
export const useIsAuthenticated = () => {
  const isLoggedIn = useIsLoggedIn()
  return isLoggedIn
}

// Additional utility hooks
export const useUserEmail = () => useUserStore((state) => state.userInfo.email)
export const useUserName = () => useUserStore((state) => state.userInfo.name)
export const useIsPremium = () => useUserStore((state) => state.userInfo.isPremium)
export const useCustomer = () => useUserStore((state) => state.userInfo.customer)
export const useIsOnboarded = () => useUserStore((state) => state.userInfo.customer !== null)

export default useUserStore
