import { useState, useMemo, useCallback, useEffect } from 'react'

import { OnboardingCreateAccount } from './steps/OnboardingCreateAccount'
import { CustomerType } from '@/store/directVaultCreator/directVaultCreator.types'
import { Loader } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import { useCreateCustomer } from '@/api/user/userMutations'
import { useUserActions } from '@/stores/userStore'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'
import { useWallets } from '@privy-io/react-auth'
import { useEnsureWallet } from '@/hooks/useEnsureWallet'
import { useRouter } from '@tanstack/react-router'

export  function OnboardingContainer() {
  const [open, setOpen] = useState(true)
  const [isWalletCreated, setIsWalletCreated] = useState(false)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)
  const [customerCreated, setCustomerCreated] = useState(false)
  const { setOnboarding } = useUserActions()
  const createCustomer = useCreateCustomer()
  const { ensureWalletExists } = useEnsureWallet()

  // Use React Query hooks to get user data
  const { data: userData, isLoading } = useUserCustomerDetails()

  // Get wallet addresses from Privy
  const { wallets } = useWallets()
  const { smartWalletAddress } = usePrivySmartWallet()

  console.log("wallets", wallets, smartWalletAddress)


  // Get the embedded wallet address (EOA wallet) - memoized to prevent re-renders
  const embeddedWallet = useMemo(() => {
    return wallets.find(wallet => wallet.walletClientType === 'privy')
  }, [wallets])

  const privyWalletAddress = useMemo(() => {
    return embeddedWallet?.address
  }, [embeddedWallet?.address])


  const { navigate } = useRouter()



  // Memoize derived state to prevent re-renders
  const derivedState = useMemo(() => {
    const customer = userData?.customer
    const bridgeKyc = userData?.bridgeKyc
    const shouldShowCustomerCreation = !customer || !bridgeKyc
    const walletsReady = !!privyWalletAddress && !!smartWalletAddress

    console.log(privyWalletAddress, smartWalletAddress, "addresses")

    return {
      customer,
      bridgeKyc,
      shouldShowCustomerCreation,
      walletsReady,
    }
  }, [userData?.customer, userData?.bridgeKyc, privyWalletAddress, smartWalletAddress])



  // Prevent closing the modal - customer creation is mandatory
  const handleOpenChange = useCallback((_newOpen: boolean) => {
    // Don't allow closing the customer creation modal at all
    // Customer creation is a mandatory step in onboarding
    console.log('Attempted to close customer creation modal - preventing closure')
    return
  }, [])

  // Effect to handle redirect after both customer and wallet are created
  useEffect(() => {
    if (customerCreated && isWalletCreated) {
      console.log('✅ OnboardingContainer: Both customer and wallet created, redirecting to dashboard')
      setOpen(false)
      setOnboarding(true)
   //   router.navigate({ to: '/dashboard' })
    }
  }, [customerCreated, isWalletCreated, setOnboarding])

  const handleSubmit = useCallback(async (formData: {
    name: string
    email: string
    type: CustomerType
    tosAccepted: boolean
    developerTosAccepted: boolean
  }) => {
    if (!privyWalletAddress || !smartWalletAddress) return

    try {
      // Create customer using React Query mutation with wallet addresses and TOS reliance parameters
      await createCustomer.mutateAsync({
        customer: {
          type: formData.type === CustomerType.BUSINESS ? 'business' : 'individual',
          full_name: formData.name,
          email: formData.email,
        },
        privyWalletAddress,
        privySmartWalletAddress: smartWalletAddress,
        tosAccepted: formData.tosAccepted,
        developer_accepted_tos: formData.developerTosAccepted,
      })

      // Customer created successfully - mark as created but don't redirect yet
      console.log('✅ OnboardingContainer: Customer created successfully, now ensuring wallet exists')
      setCustomerCreated(true)

      // Now ensure wallet exists
      setIsCreatingWallet(true)
      try {
        await ensureWalletExists()
        console.log('✅ OnboardingContainer: Wallet created successfully')
        setIsWalletCreated(true)
        navigate({ to: '/dashboard' })
        
      } catch (walletError) {
        console.error('❌ OnboardingContainer: Failed to create wallet:', walletError)
        // Still mark as created to avoid infinite retry
        setIsWalletCreated(true)
      } finally {
        setIsCreatingWallet(false)
      }
    } catch (error) {
      console.error('Failed to create customer:', error)
      // Error handling is done by the mutation's onError callback
      // Don't continue with the process if customer creation failed
      return
    }
  }, [createCustomer, ensureWalletExists, privyWalletAddress, smartWalletAddress])

  const renderContent = () => {
    // Show loading state if wallet addresses are not ready
    if (!derivedState.walletsReady) {
      return (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">Please wait...</p>
        </div>
      )
    }

    return <OnboardingCreateAccount onSubmit={handleSubmit} userData={userData} />
  }
  // Don't show anything if still loading user data
  if (isLoading) {
    return <></>
  }

  // If customer and bridgeKyc exist, don't show any modal (TOS is handled in customer creation)
  if (derivedState.customer && derivedState.bridgeKyc) {
    return <></>
  }

  // Show customer creation modal if customer or bridgeKyc doesn't exist
  if (derivedState.shouldShowCustomerCreation) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="sm:max-w-[500px]"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Fill your information</DialogTitle>
          </DialogHeader>

          {renderContent()}


        </DialogContent>
      </Dialog>
    )
  }

  // If we get here, nothing should be shown (customer creation is handled above)
  return <></>
}


