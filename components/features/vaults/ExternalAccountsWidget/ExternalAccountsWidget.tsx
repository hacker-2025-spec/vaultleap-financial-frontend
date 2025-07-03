import { ExternalAccountWidgetTabValue } from './ExternalAccountsWidget.types'

import { useState, useCallback, useEffect } from 'react'
import { DirectVaultsWidgetBalance } from '@/components/features/vaults/DirectVaultsWidgetBalance/DirectVaultsWidgetBalance'
import CreateLiquidationAddressModal from '../CreateLiquidationAddressModal/index'

import PaySomeoneModal from '../../../modals/PaySomeoneModal/index'
import { useWalletConfig } from '@/hooks/useWalletConfig'
import ExternalAccountsWidgetDeposit from '../ExternalAccountsWidgetDeposit/index'
import CreateExternalAccountModal from '@/components/features/vaults/CreateVirtualAccountModal/CreateVirtualAccountModal'
import KYCModal from '../../onboarding/KYCModal/index'
import { CurrencyCode } from '@/types/currency'

import { KYCVerificationStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { useIsKycModalOpen, useUserActions } from '@/stores/userStore'
import ExternalAccountWidgetPayAndTransfer from '../ExternalAccountWidgetPayAndTransfer/ExternalAccountWidgetPayAndTransfer'
import { LockIcon, Clock } from 'lucide-react'
import { useUserCustomerDetails, useKycStatusManager, useKycStatusPolling } from '@/api/user/userQueries'

import { useVirtualAccounts } from '@/api/virtual-accounts/virtualAccountQueries'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'
import { useRecipients } from '@/api/recipients/recipientQueries'
import type { PaymentFormData } from '@/components/modals/PaySomeoneModal/PaySomeoneModal.types'
import { showToast } from '@/utils/toast'
import TransactionSuccessModal from '@/components/modals/TransactionSuccessModal/TransactionSuccessModal'
import { getDeveloperFeePercentFromLiquidationAddress } from '@/utils/developerFeeCalculations'
import LoadingModal from '@/components/modals/LoadingModal/LoadingModal'
import { useTokenBalances } from '@/api/wallet/walletQueries'

export default function ExternalAccountsWidget() {
  const config = useWalletConfig()
  const { recipients, bridgeRecipients, directRecipients } = useRecipients()
  const { sendToken, isReady: isSmartWalletReady } = usePrivySmartWallet()
  const { data: userData } = useUserCustomerDetails()
  const { kycStatus, isUnderReview } = useKycStatusManager()
  const { refetch: refetchVirtualAccounts } = useVirtualAccounts()
  const isPremium = userData?.isPremium || false
  const kycModalOpen = useIsKycModalOpen()
  const { setKycModalOpen } = useUserActions()

  // Use total balance hook for consistent balance display
  const { totalBalance } = useTokenBalances()

  // Enable polling when KYC is pending
  useKycStatusPolling(kycStatus === KYCVerificationStatus.PENDING)

  // Refetch virtual accounts when KYC status becomes SUCCESS
  useEffect(() => {
    if (kycStatus === KYCVerificationStatus.SUCCESS) {
      console.log('✅ KYC Success detected - refetching virtual accounts')
      refetchVirtualAccounts()
    }
  }, [kycStatus, refetchVirtualAccounts])

  // State for modal visibility
  const [payeeModalOpen, setPayeeModalOpen] = useState(false)
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [virtualModalOpen, setVirtualModalOpen] = useState(false)
  const [transactionSuccessModalOpen, setTransactionSuccessModalOpen] = useState(false)
  const [modalPreferredCurrency, setModalPreferredCurrency] = useState<CurrencyCode | undefined>()
  const [modalExistingCurrencies, setModalExistingCurrencies] = useState<CurrencyCode[]>([])
  const [payModalInitialValues, setPayModalInitialValues] = useState<
    { recipient?: string; amount?: number; recipientAddress?: string } | undefined
  >()
  const [successTransactionData, setSuccessTransactionData] = useState<
    | {
        transactionHash: string
        amount: number
        token: string
        recipient: string
      }
    | undefined
  >()
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)

  // Modal open/close handlers
  const openPayeeModal = useCallback(() => {
    console.log('🔍 ExternalAccountsWidget openPayeeModal called - opening CreateLiquidationAddressModal')
    setPayeeModalOpen(true)
  }, [])
  const closePayeeModal = useCallback(() => setPayeeModalOpen(false), [])

  const openPayModal = useCallback(
    (data?: {
      recipient?: string
      amount?: number
      recipientAddress?: string
      token?: 'USDC' | 'EURC' | 'USDT'
      selectedToken?: TokenBalance
      isDirectWeb3?: boolean
    }) => {
      console.log('🔍 ExternalAccountsWidget openPayModal called with:', data)
      console.log('🔍 isDirectWeb3:', data?.isDirectWeb3)
      console.log('🔍 recipientAddress:', data?.recipientAddress)

      // Always use Pay Someone modal for all transfers
      console.log('🔄 Opening Pay Someone modal for transfer')
      setPayModalInitialValues({
        recipient: data?.recipient,
        amount: data?.amount,
        recipientAddress: data?.recipientAddress,
      })
      setPayModalOpen(true)
    },
    []
  )

  const closePayModal = useCallback(() => {
    setPayModalOpen(false)
    setPayModalInitialValues(undefined)
  }, [])

  const closeTransactionSuccessModal = useCallback(() => {
    setTransactionSuccessModalOpen(false)
    setSuccessTransactionData(undefined)
  }, [])

  const openVirtualModal = useCallback((preferredCurrency?: CurrencyCode, existingCurrencies?: CurrencyCode[]) => {
    setModalPreferredCurrency(preferredCurrency)
    setModalExistingCurrencies(existingCurrencies || [])
    setVirtualModalOpen(true)
  }, [])

  const closeVirtualModal = useCallback(() => {
    setVirtualModalOpen(false)
    setModalPreferredCurrency(undefined)
    setModalExistingCurrencies([])
  }, [])

  // Handle KYC modal close with status
  const handleKycModalClose = useCallback(async (status?: KYCVerificationStatus) => {
    if (status === KYCVerificationStatus.SUCCESS) {
      // KYC success - virtual accounts will be automatically refetched by the polling mechanism
      console.log('✅ KYC completed successfully')
    }
  }, [])

  // Render under review message for KYC
  const renderKycUnderReviewMessage = () => {
    if (isUnderReview) {
      return (
        <div className="flex items-center gap-2 text-yellow-200 text-sm mb-4 bg-yellow-500/20 rounded-lg p-3">
          <Clock className="h-4 w-4" />
          <span>Your KYC verification is under review. Additional time may be needed for approval.</span>
        </div>
      )
    }
    return null
  }

  const openKycModal = useCallback(() => setKycModalOpen(true), [setKycModalOpen])
  const closeKycModal = useCallback(
    (status?: KYCVerificationStatus) => {
      setKycModalOpen(false)
      handleKycModalClose(status)
    },
    [handleKycModalClose, setKycModalOpen]
  )

  const handlePaymentConfirmed = useCallback(
    async (paymentData: PaymentFormData) => {
      setIsTransactionLoading(true)
      try {
        console.log('📍 Payment data received:', paymentData)
        console.log('📍 Initial values:', payModalInitialValues)

        // Check if this is a direct Web3 payment
        const isDirectWeb3Payment = paymentData.recipient === 'direct'

        let recipientAddress: string
        let isDirectWeb3Transfer: boolean
        let recipientName: string

        if (isDirectWeb3Payment) {
          // Handle direct Web3 payment - use recipientAddress from initialValues
          if (!payModalInitialValues?.recipientAddress) {
            showToast.error('Recipient address not found for direct Web3 payment')
            return
          }

          recipientAddress = payModalInitialValues.recipientAddress
          isDirectWeb3Transfer = true
          recipientName = `Direct Web3 (${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)})`

          console.log('📍 Direct Web3 payment detected:', {
            recipientAddress,
            recipientName,
            amount: paymentData.amount,
          })
        } else {
          // Handle saved recipient payment
          const savedRecipient =
            bridgeRecipients.find((la) => la.id === paymentData.recipient) || directRecipients.find((dr) => dr.id === paymentData.recipient)

          console.log('📍 Found saved recipient:', savedRecipient)

          if (!savedRecipient) {
            showToast.error('Recipient not found')
            return
          }

          // Get the recipient address - different property names for different types
          recipientAddress = 'address' in savedRecipient ? savedRecipient.address : savedRecipient.destinationAddress

          // Check if this is a direct web3 transfer
          isDirectWeb3Transfer = 'destinationAddress' in savedRecipient
          recipientName = savedRecipient.vaultName || recipientAddress
        }

        if (!isSmartWalletReady) {
          showToast.error('Smart wallet not ready. Please try again.')
          return
        }

        // Get the token to send from payment data, default to USDC for backward compatibility
        const tokenToSend = paymentData.selectedToken?.symbol || 'USDC'

        console.log('💳 Executing token transfer...', {
          recipient: recipientAddress,
          amount: paymentData.amount.toString(),
          token: tokenToSend,
          isDirectWeb3: isDirectWeb3Transfer,
          isPremium,
        })

        // Get developer fee percentage from liquidation address if it's a Bridge transfer
        let developerFeePercent: number | undefined
        if (!isDirectWeb3Transfer && !isDirectWeb3Payment) {
          // Only for saved bridge recipients
          const savedRecipient = bridgeRecipients.find((la) => la.id === paymentData.recipient)
          if (savedRecipient && 'developer_fee' in savedRecipient) {
            developerFeePercent = getDeveloperFeePercentFromLiquidationAddress(savedRecipient as any)
            console.log('💰 Using developer fee from liquidation address:', developerFeePercent + '%')
          }
        }

        // Execute the payment using smart wallet - this will show Privy confirm screen
        const result = await sendToken({
          recipient: recipientAddress as `0x${string}`,
          amountDecimal: paymentData.amount.toString(),
          token: tokenToSend,
          isBridgeTransfer: !isDirectWeb3Transfer,
          isPremium,
          developerFeePercent,
        })

        console.log('✅ Payment result:', result)
        console.log('✅ isDirectWeb3Transfer:', isDirectWeb3Transfer)

        if (result) {
          if (isDirectWeb3Transfer || isDirectWeb3Payment) {
            // For direct web3 transfers, show success modal with transaction details
            setSuccessTransactionData({
              transactionHash: result.transactionHash,
              amount: paymentData.amount,
              token: tokenToSend,
              recipient: recipientName,
            })
            setTransactionSuccessModalOpen(true)
          } else {
            // For bridge transfers, show toast with recipient amount (not total sent)
            const savedRecipient = bridgeRecipients.find((la) => la.id === paymentData.recipient)
            showToast.success(
              `$${paymentData.amount} ${tokenToSend} sent to ${savedRecipient?.vaultName || recipientName}! Transaction: ${result.transactionHash}`
            )
          }

          // Balance will be automatically refetched by the useTotalBalance hook
        }
      } catch (error) {
        console.error('❌ Payment failed:', error)
        showToast.error(error instanceof Error ? error.message : 'Payment failed')
      } finally {
        setIsTransactionLoading(false)
      }
    },
    [isSmartWalletReady, sendToken, bridgeRecipients, directRecipients, isPremium, payModalInitialValues]
  )

  const [isPayeeTab, setIsPayeeTab] = useState(false)

  const handleClick = (value: ExternalAccountWidgetTabValue) => {
    setIsPayeeTab(value === 'payee')
  }

  return (
    <>
      <div className="relative card-background rounded-3xl min-h-[550px] overflow-hidden">
        <div className="w-full flex flex-row overflow-hidden rounded-t-3xl relative">
          {/* Enhanced animated underline background */}
          <div
            className="absolute bottom-0 h-[3px] bg-white/90 rounded-t-md transition-all duration-500 ease-out"
            style={{
              width: '50%',
              left: isPayeeTab ? '50%' : '0%',
              transform: 'translateX(0)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            }}
          />

          <button
            className={`w-1/2 bg-transparent border-none py-4 px-5 text-sm sm:text-base font-bold cursor-pointer relative flex items-center justify-center rounded-t-3xl transition-all duration-300 ease-out hover:bg-white/10 active:scale-95 ${
              !isPayeeTab ? 'text-white shadow-sm' : 'text-white/70 hover:text-white/90'
            }`}
            onClick={() => handleClick('deposit')}
          >
            <span className="relative z-10 transition-all duration-200">Deposit Accounts</span>
          </button>

          <button
            className={`w-1/2 bg-transparent border-none py-4 px-5 text-sm sm:text-base font-bold cursor-pointer relative flex items-center justify-center rounded-t-3xl transition-all duration-300 ease-out hover:bg-white/10 active:scale-95 ${
              isPayeeTab ? 'text-white shadow-sm' : 'text-white/70 hover:text-white/90'
            }`}
            disabled={kycStatus !== KYCVerificationStatus.SUCCESS}
            onClick={() => handleClick('payee')}
          >
            <span className="relative z-10 transition-all duration-200 flex items-center gap-2">
              Pay & Transfer
              {kycStatus !== KYCVerificationStatus.SUCCESS && (
                <LockIcon size={16} className="transition-all duration-300 ease-out opacity-70" />
              )}
            </span>
          </button>
        </div>

        {/* Content area with smooth fade transition */}
        <div className="transition-all duration-300 ease-out">
          <div className="py-[30px] px-[46px] pb-7 max-sm:px-6">
            <DirectVaultsWidgetBalance />
            {renderKycUnderReviewMessage()}
          </div>
          <div className="flex flex-col">
            <div
              className={`transition-all duration-300 ease-out ${isPayeeTab ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}
            >
              {isPayeeTab ? (
                <ExternalAccountWidgetPayAndTransfer
                  balance={totalBalance}
                  recipients={recipients}
                  config={config}
                  onCreatePayee={openPayeeModal}
                  onSend={openPayModal}
                />
              ) : (
                <ExternalAccountsWidgetDeposit onAdd={openVirtualModal} onKYC={openKycModal} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {payeeModalOpen && (
        <CreateLiquidationAddressModal
          isOpen={payeeModalOpen}
          onClose={closePayeeModal}
          onPayNow={() => {
            console.log('🔍 CreateLiquidationAddressModal onPayNow called - recipient created')
            // Just close the modal, don't open pay modal
          }}
        />
      )}

      <PaySomeoneModal
        isOpen={payModalOpen}
        onClose={closePayModal}
        recipients={recipients.filter((recipient) => !['direct', 'new'].includes(recipient.value))}
        config={config}
        onPaymentConfirmed={handlePaymentConfirmed}
        initialValues={payModalInitialValues}
        onStartLoading={() => setIsTransactionLoading(true)}
      />

      <CreateExternalAccountModal
        isOpen={virtualModalOpen}
        onClose={closeVirtualModal}
        preferredCurrency={modalPreferredCurrency}
        existingCurrencies={modalExistingCurrencies}
      />

      <KYCModal isOpen={kycModalOpen} onClose={closeKycModal} kycVerificationStatus={kycStatus} />

      {successTransactionData && (
        <TransactionSuccessModal
          isOpen={transactionSuccessModalOpen}
          onClose={closeTransactionSuccessModal}
          transactionHash={successTransactionData.transactionHash}
          amount={successTransactionData.amount}
          token={successTransactionData.token}
          recipient={successTransactionData.recipient}
        />
      )}

      <LoadingModal
        isOpen={isTransactionLoading}
        title="Processing Transaction"
        message="Please wait while your transaction is being processed..."
      />
    </>
  )
}
