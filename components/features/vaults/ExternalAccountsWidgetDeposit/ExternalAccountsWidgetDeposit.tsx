import { ExternalAccountsWidgetDepositProps } from './ExternalAccountsWidgetDeposit.types'
import ExternalAccountsWidgetDepositCard from '../ExternalAccountsWidgetDepositCard/index'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Lock, ShieldCheck, Plus } from 'lucide-react'
import { useState } from 'react'

import type { VirtualAccountEntity } from '@/client/types.gen'
import { pushNotification } from '@/utils/toast'
import { KYCVerificationStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import KYCModal from '../../onboarding/KYCModal/index'
import { useVirtualAccounts } from '@/api/virtual-accounts'
import { useKycStatusManager } from '@/api/user'
import { useIsKycModalOpen, useUserActions } from '@/stores/userStore'
import { useCurrencyPreferences } from '@/stores/settingsStore'
import { CurrencyCode } from '@/types/currency'
import { formatVirtualAccountForClipboard } from '@/utils/virtualAccountFormatter'

// Type for source deposit instructions
type SourceDepositInstructions = {
  currency: 'usd' | 'eur'
  bank_name: string
  bank_account_number?: string
  bank_routing_number?: string
  iban?: string
  bic?: string
  account_holder_name?: string
  bank_beneficiary_name?: unknown
}

// Type for placeholder account
type PlaceholderAccount = {
  id: string
  isPlaceholder: true
  currency: string
}

// Union type for accounts that can be real or placeholder
type AccountOrPlaceholder = VirtualAccountEntity | PlaceholderAccount

// Individual carousel card component
const WalletCard = ({
  account,
  onClick,
  onCreateAccount,
}: {
  account: AccountOrPlaceholder
  onClick: () => void
  onCreateAccount?: () => void
}) => {
  // Check if this is a placeholder account
  const isPlaceholder = 'isPlaceholder' in account && account.isPlaceholder === true

  return (
    <div className="w-full h-full" onClick={onClick} style={{ cursor: 'pointer' }}>
      <ExternalAccountsWidgetDepositCard
        account={isPlaceholder ? undefined : (account as VirtualAccountEntity)}
        variant={isPlaceholder ? "placeholder" : "default"}
        onCreateAccount={onCreateAccount}
      />
    </div>
  )
}

export default function ExternalAccountsWidgetDeposit({ onAdd, onKYC }: ExternalAccountsWidgetDepositProps) {
  const { data: accountsData, isLoading, error } = useVirtualAccounts()
  const { kycStatus } = useKycStatusManager()
  const isKycModalOpen = useIsKycModalOpen()
  const { setKycModalOpen } = useUserActions()
  const currencyPreferences = useCurrencyPreferences()

  // Ensure accounts is always an array
  const accounts = Array.isArray(accountsData) ? accountsData : []

  // Get unique accounts by currency (max 2)
  const uniqueAccounts = accounts.reduce((uniqueAccounts: VirtualAccountEntity[], account) => {
    const currency = (account.source_deposit_instructions as SourceDepositInstructions)?.currency?.toUpperCase()
    const hasThisCurrency = uniqueAccounts.some(
      (acc) => (acc.source_deposit_instructions as SourceDepositInstructions)?.currency?.toUpperCase() === currency
    )
    if (!hasThisCurrency && uniqueAccounts.length < 2) {
      uniqueAccounts.push(account)
    }
    return uniqueAccounts
  }, [])

  // If only one account exists, determine which currency is missing and add placeholder
  const accountsToRender: AccountOrPlaceholder[] = [...uniqueAccounts]
  if (uniqueAccounts.length === 1) {
    const existingCurrency = (uniqueAccounts[0].source_deposit_instructions as SourceDepositInstructions)?.currency?.toUpperCase()
    const missingCurrency = existingCurrency === 'USD' ? 'EUR' : 'USD'

    // Create a placeholder account object
    const placeholderAccount: PlaceholderAccount = {
      id: `placeholder-${missingCurrency.toLowerCase()}`,
      isPlaceholder: true,
      currency: missingCurrency,
    }

    accountsToRender.push(placeholderAccount)
  }

  // State for focused card (center card)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(0)
  
  const copy = (account: VirtualAccountEntity) => {
    const formattedAccountDetails = formatVirtualAccountForClipboard(account)
    navigator.clipboard
      .writeText(formattedAccountDetails)
      .then(() => pushNotification('Payment details copied to clipboard'))
      .catch(() => pushNotification('Failed to copy payment details', { variant: 'error' }))
  }

  if (isLoading) {
    return (
      <div className="external-accounts-widget-deposit">
        <div className="flex items-center justify-center p-8">
          <div className="text-center text-white">Loading virtual accounts...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="external-accounts-widget-deposit">
        <div className="flex items-center justify-center p-8">
          <div className="text-center text-red-500">Failed to load virtual accounts</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Accounts Container - Positioned at bottom */}
      <div className="h-full overflow-x-hidden overflow-y-visible flex flex-col justify-end p-4 mb-0 sm:mb-16">
        {kycStatus === KYCVerificationStatus.SUCCESS ? (
          accounts.length > 0 ? (
            <div className="flex items-center overflow-visible w-full justify-center h-full">
              <Carousel className="w-full h-full max-w-[600px]" opts={{ slidesToScroll: 1 }}>
                <CarouselContent>
                  {accountsToRender.map((account, index) => {
                    const isPlaceholder = 'isPlaceholder' in account && account.isPlaceholder === true

                    return (
                      <CarouselItem key={account.id} className="w-fit">
                        <WalletCard
                          account={account}
                          onClick={() => setFocusedCardIndex(index)}
                          onCreateAccount={() => {
                            // Handle create account for the missing currency
                            if (isPlaceholder) {
                              onAdd?.()
                            }
                          }}
                        />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious variant={'ghost'} />
                <CarouselNext variant={'ghost'} />
              </Carousel>
            </div>
          ) : (
            <div className="border rounded-t-2xl bg-white/10 border-white/50">
              <div className="rounded-xl bg-gray-800/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 text-white p-8">
                <p className="mb-3.5 text-center">
                  Create a {currencyPreferences} virtual account to start receiving {currencyPreferences === 'EUR' ? 'euros' : 'dollars'}.
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="border rounded-t-2xl rounded-b-2xl bg-white/10 border-white/50">
            <div className="rounded-xl bg-gray-800/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 text-white p-8">
              <div className="mb-2">
                <Lock />
              </div>
              <h3 className="text-lg font-semibold text-center">Quick Identity Verification</h3>
              <p className="mb-3.5 text-center">Unlock your dedicated checking account for digital dollars.</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  try {
                    if (onKYC) {
                      onKYC()
                    } else {
                      setKycModalOpen(true)
                    }
                  } catch (error) {
                    // Error handling for KYC modal opening
                  }
                }}
              >
                <ShieldCheck className="h-4 w-4 mr-1" />
                Verify Now
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Account Actions - Only show when KYC is approved */}
      {accounts.length === 0 && kycStatus === KYCVerificationStatus.SUCCESS && (
        <div className="flex flex-row justify-center items-center relative bottom-15">
          <Button variant={'transparent'} onClick={() => onAdd()}>
            <Plus className="h-4 w-4 bg-blue-600/70 p-px rounded-full" />
            Add Account
          </Button>
        </div>
      )}
      <KYCModal isOpen={isKycModalOpen} onClose={() => setKycModalOpen(false)} kycVerificationStatus={kycStatus} />
    </>
  )
}
