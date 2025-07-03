'use client'
import { MainHeader } from '@/components/features/dashboard/MainHeader/MainHeader'
import { ProductsSection } from '@/components/features/dashboard/ProductsSection/ProductsSection'
import { TransactionModalContainer } from '../../components/features/transactions/TransactionModal'
import MainChecklistBanner from '../../components/features/onboarding/MainChecklistBanner'
import { SetupTask } from '@/components/features/onboarding/MainChecklistBanner/MainChecklistBanner.types'
import { useEffect, useState } from 'react'
import MainTransactionsWidget from '@/components/features/transactions/MainTransactionsWidget/MainTransactionsWidget'
import ExternalAccountsWidget from '../../components/features/vaults/ExternalAccountsWidget'
import { OnboardingTour } from '@/components/features/onboarding/OnboardingTour/OnboardingTour'
import { KYCVerificationStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'

import KYCModal from '../../components/features/onboarding/KYCModal'
import { KYCSuccessModal } from '@/components/features/kyc/KYCSuccessModal/KYCSuccessModal'
import { useUserCustomerDetails, useCheckKycStatus, useKycStatusManager, useKycStatusPolling } from '@/api/user/userQueries'
import { useVirtualAccounts } from '@/api/virtual-accounts'
import { useIsOnboarding, useIsKycModalOpen, useIsChecklistVisible, useUserActions } from '@/stores/userStore'

import './NewDashboardPage.css'

export const NewDashboardPage = () => {
  // Use new React Query hooks instead of Redux
  const { data: _userData } = useUserCustomerDetails()
  const { data: _kycData, isLoading: isKycLoading } = useCheckKycStatus()
  const { data: virtualAccounts = [] } = useVirtualAccounts()
  const { kycStatus } = useKycStatusManager()
  const isOnboarding = useIsOnboarding()
  const isKycModalOpen = useIsKycModalOpen()
  const isChecklistVisible = useIsChecklistVisible()
  const { setKycModalOpen, setChecklistVisible } = useUserActions()
  const [isKycStatusDetermined, setIsKycStatusDetermined] = useState(false)

  // MainTransactionsWidget now fetches its own data, no need to transform

  // Enable KYC polling when status is pending
  useKycStatusPolling(kycStatus === KYCVerificationStatus.PENDING)

  // Set isKycStatusDetermined to true once we have KYC data or if we're onboarding
  useEffect(() => {
    if (!isKycLoading || isOnboarding) {
      // Add a small delay to ensure the status is properly determined
      const timer = setTimeout(() => {
        setIsKycStatusDetermined(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isKycLoading, isOnboarding])

  const handleMainChecklistBannerOnDismiss = () => {
    setChecklistVisible(false)
  }

  const handleMainChecklistBannerOnTriggerTask = (key: string) => {
    console.log('Task triggered with key:', key)

    switch (key) {
      case 'verify':
        // Open the KYC modal when the verify task is triggered
        setKycModalOpen(true)
        break

      case 'connect-bank':
        // Navigate to bank connection page or open bank connection modal
        // For now, just log the action
        console.log('Connect bank account action triggered')
        // TODO: Implement bank connection flow
        break

      case 'setup-vault':
        // Navigate to vault setup page or open vault setup modal
        console.log('Setup vault action triggered')
        // TODO: Implement vault setup flow
        break

      case 'enable-2fa':
        // Navigate to security settings or open 2FA setup modal
        console.log('Enable 2FA action triggered')
        // TODO: Implement 2FA setup flow
        break

      case 'first-deposit':
        // Navigate to deposit page or open deposit modal
        console.log('First deposit action triggered')
        // TODO: Implement deposit flow
        break

      case 'explore-premium':
        // Navigate to premium features page
        console.log('Explore premium features action triggered')
        // TODO: Implement premium features exploration flow
        break

      case 'invite-friends':
        // Open invite friends modal or navigate to referral page
        console.log('Invite friends action triggered')
        // TODO: Implement invite friends flow
        break

      default:
        console.log('Unknown task key:', key)
    }
  }

  // VL-308: Temporarily comment for future
  const tasks: SetupTask[] = [
    {
      taskKey: 'verify',
      label: 'Verify your identity',
      description: 'Verify your identity to comply with regulations and secure your account.',
      completed: kycStatus === KYCVerificationStatus.SUCCESS,
      buttonLabel: {
        opened: 'Verify',
        completed: 'Completed',
      },
    },
    {
      taskKey: 'setup-vault',
      label: 'Set up your account',
      description: 'Configure your fiat -> Stablecoin account to start accepting fiat payments.',
      completed: virtualAccounts.length > 0,
      buttonLabel: {
        opened: 'Set Up',
        completed: 'Completed',
      },
    },
    // {
    //   taskKey: 'connect-bank',
    //   label: 'Connect your bank account',
    //   description: 'Link your bank account to enable seamless deposits and withdrawals between fiat and Stablecoin.',
    //   completed: false,
    //   buttonLabel: {
    //     opened: 'Connect',
    //     completed: 'Completed',
    //   },
    // },
    // {
    //   taskKey: 'enable-2fa',
    //   label: 'Enable 2FA security',
    //   description: 'Add an extra layer of security with two-factor authentication to protect your crypto assets.',
    //   completed: false,
    //   buttonLabel: {
    //     opened: 'Enable',
    //     completed: 'Completed',
    //   },
    // },
    // {
    //   taskKey: 'first-deposit',
    //   label: 'Make your first deposit',
    //   description: 'Make your first deposit to activate your VaultLeap services and start earning rewards.',
    //   completed: false,
    //   buttonLabel: {
    //     opened: 'Deposit',
    //     completed: 'Completed',
    //   },
    // },
    // {
    //   taskKey: 'explore-premium',
    //   label: 'Explore premium features',
    //   description: 'Discover premium features like QuickPay, SplitVault, MerchantVault, and TaxLink for enhanced capabilities.',
    //   completed: false,
    //   buttonLabel: {
    //     opened: 'Explore',
    //     completed: 'Completed',
    //   },
    // },
    // {
    //   taskKey: 'invite-friends',
    //   label: 'Invite friends',
    //   description: 'Invite your friends to VaultLeap and earn rewards when they sign up and make their first deposit.',
    //   completed: false,
    //   buttonLabel: {
    //     opened: 'Invite',
    //     completed: 'Completed',
    //   },
    // },
  ]

  console.log('virtualAccounts', virtualAccounts)

  return (
    <div className={'flex flex-col gap-6'}>
      <MainHeader />
      <OnboardingTour />
      {/* Only show dashboard elements if KYC status is determined */}
      {isKycStatusDetermined && (
        <>
          {isChecklistVisible && (
            <div className="checklist">
              <MainChecklistBanner
                tasks={tasks}
                onDissmiss={handleMainChecklistBannerOnDismiss}
                onTriggerTask={handleMainChecklistBannerOnTriggerTask}
              />
            </div>
          )}
          <div className="dashboard__banking-section">
            <ExternalAccountsWidget />
            <MainTransactionsWidget />
          </div>

          {/* TEMPORARILY HIDDEN: Vault Hub section disabled until premium features are implemented */}
          {/* TODO: Re-enable VaultsSection when vault functionality is ready */}
          {/* <VaultsSection /> */}

          <ProductsSection />

          {/* Add the KYC Modal */}
          <KYCModal isOpen={isKycModalOpen} onClose={() => setKycModalOpen(false)} kycVerificationStatus={kycStatus} />

          {/* Add the KYC Success Modal */}
          <KYCSuccessModal />
        </>
      )}
    </div>
  )
}
