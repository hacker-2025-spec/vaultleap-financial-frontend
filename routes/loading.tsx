import { useEffect, useRef, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { VaultLeapLogo } from '@/components/layout/Loader/LogoLoader'
import { OnboardingContainer } from '@/components/features/onboarding/Onboarding/OnboardingModal.container'
import { useIsLoggedIn, useTosStatus } from '@/stores/userStore'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import { TOSStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { useEnsureWallet } from '@/hooks/useEnsureWallet'
import { redirectIfCustomerExists } from '@/utils/routeGuards'

export const Route = createFileRoute('/loading')({
  component: Loading,
  beforeLoad: async ({ context: { queryClient } }: { context: any }) => {
    return redirectIfCustomerExists(queryClient, 'Loading')
  },
})

function Loading() {
  const router = useRouter()
  const { navigate } = router
  const routerRef = useRef(router)
  const isLoggedIn = useIsLoggedIn()
  const tosStatus = useTosStatus()
  const { data: userData, isLoading: isUserDataLoading } = useUserCustomerDetails()
  const { ensureWalletExists } = useEnsureWallet()
  const [isWalletCreated, setIsWalletCreated] = useState(false)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)

  // Update router ref when router changes
  routerRef.current = router

  const customer = userData?.customer

  const isOnboardingComplete = (customer && tosStatus === TOSStatus.ACCEPTED) ?? false

  useEffect(() => {
    if (isLoggedIn && !isWalletCreated && !isCreatingWallet) {
      console.log('🔧 Loading: Creating wallet for logged in user...')
      setIsCreatingWallet(true)

      ensureWalletExists()
        .then(() => {
          console.log('✅ Loading: Wallet created successfully')
          setIsWalletCreated(true)
        })
        .catch((error) => {
          // Still mark as created to avoid infinite retry
          setIsWalletCreated(true)
        })
        .finally(() => {
          setIsCreatingWallet(false)
        })
    }
  }, [isLoggedIn, isWalletCreated, isCreatingWallet])

  useEffect(() => {
    console.log('iswallet', isWalletCreated, customer)

    if (customer && isWalletCreated) {
      console.log('iswallet routing')
      navigate({ to: '/dashboard' })
    }
  }, [isWalletCreated, customer])

  const showOnboardingModal = isLoggedIn && !isOnboardingComplete && !isUserDataLoading

  console.log('debug', showOnboardingModal, isLoggedIn, isOnboardingComplete, isUserDataLoading)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md flex flex-col items-center shadow-lg">
        {showOnboardingModal ? (
          <OnboardingContainer />
        ) : (
          <div className="min-h-[calc(50dvh)] flex flex-col gap-8 justify-center items-center w-full">
            <div>
              <VaultLeapLogo />
            </div>
            <div className="flex flex-row gap-5 w-full py-5 justify-center items-center">
              <div className="h-full flex">
                <Loader className="h-8 w-8 animate-spin text-primary" />
              </div>
              <div>
                <p className="text-base text-gray-600 w-full text-center font-medium">
                  {isCreatingWallet ? 'Creating your wallet...' : isUserDataLoading ? 'Loading customer data...' : 'Please wait. Loading..'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
