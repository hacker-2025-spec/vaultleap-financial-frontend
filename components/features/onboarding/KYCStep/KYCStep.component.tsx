import { lazy, Suspense } from 'react'
import { KYCVerificationStatus, VaultType } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { Button } from '@/components/ui/button'
import { CheckIcon, Loader } from 'lucide-react'
import { useUserCustomerDetails, useKycStatusManager, useKycStatusPolling } from '@/api/user/userQueries'
import { useKycConfirm, useKycRetry } from '@/api/user/userMutations'
import { useKycStatus } from '@/stores/userStore'

const innerBlockHeight = '100%'

const BridgeKYC = lazy(() => import('./BridgeKYC'))

const BridgeKYCComponent = ({ onKycProcessComplete }: { onKycProcessComplete?: () => void }) => {
  const { data: userData } = useUserCustomerDetails()
  const kycConfirm = useKycConfirm()
  const kycRetry = useKycRetry()

  const bridgeKYCEntity = userData?.bridgeKyc
  const kycLink = bridgeKYCEntity?.kyc_link
  const retryingKYC = kycRetry.isPending

  console.log('BridgeKYCComponent - bridgeKYCEntity:', bridgeKYCEntity)
  console.log('BridgeKYCComponent - kycLink:', kycLink)
  console.log('BridgeKYCComponent - retryingKYC:', retryingKYC)

  const handleBridgeKYCComplete = ({ inquiryId }: { inquiryId: string }) => {
    console.log('BridgeKYCComponent - handleBridgeKYCComplete called with inquiryId:', inquiryId)
    try {
      // Use the KYC confirm mutation
      kycConfirm.mutate({ inquiryId })
      console.log('BridgeKYCComponent - Successfully triggered KYC confirm mutation')

      // Call the callback to notify that KYC process is complete and polling should start
      if (onKycProcessComplete) {
        console.log('BridgeKYCComponent - Calling onKycProcessComplete callback')
        onKycProcessComplete()
      }
    } catch (error) {
      console.error('BridgeKYCComponent - Error triggering KYC confirm:', error)
    }
  }

  let template_id: string | undefined
  let iqt_token: string | undefined
  let environment_id: string | undefined
  let referenceId: string | undefined

  if (kycLink) {
    try {
      console.log('BridgeKYCComponent - Full kycLink:', kycLink)
      const kycLinkObj = new URL(kycLink).searchParams

      // Log all parameters in the URL for debugging
      console.log('BridgeKYCComponent - All URL parameters:')
      kycLinkObj.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      template_id = kycLinkObj.get('inquiry-template-id') ?? undefined
      iqt_token = kycLinkObj.get('fields[iqt_token]') ?? undefined
      referenceId = kycLinkObj.get('reference-id') ?? undefined

      // Try different possible parameter names for environment_id
      environment_id = kycLinkObj.get('environment-id') ?? 'producton'

      console.log('BridgeKYCComponent - Parsed parameters:', {
        template_id,
        iqt_token,
        environment_id,
      })
    } catch (error) {
      console.error('BridgeKYCComponent - Error parsing kycLink:', error)
    }
  }

  if (template_id && referenceId) {
    console.log('BridgeKYCComponent - Rendering BridgeKYC component with parameters:', {
      template_id,
      iqt_token,
      environment_id,
    })
    return (
      <div className="h-full">
        <Suspense fallback={<div>Loading KYC...</div>}>
          <BridgeKYC
            kycLink={kycLink as string}
            templateId={template_id}
            referenceId={referenceId}
            iqtToken={iqt_token || ''}
            onComplete={handleBridgeKYCComplete}
            onLoad={() => {}}
          />
        </Suspense>
      </div>
    )
  } else {
    // If we don't have the required KYC parameters, show a message and retry button
    console.log('BridgeKYCComponent - Missing required parameters for Persona component')
    return (
      <div className="h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg max-w-[500px] h-full gap-6 mx-auto">
          <p className="text-center font-medium text-base mb-4">Unable to load the verification form.</p>
          <Button
            onClick={() => {
              console.log('BridgeKYCComponent - Retry button clicked')
              kycRetry.mutate()
            }}
            disabled={retryingKYC}
          >
            {retryingKYC ? 'Retrying...' : 'Retry'}
          </Button>
        </div>
      </div>
    )
  }
}

const KYCLoadingComponent = () => {
  return (
    <div className="h-full w-full flex-col justify-center items-center flex gap-5">
      <Loader className="h-8 w-8 animate-spin" />
      <p className="text-center font-medium text-base">Please wait...</p>
    </div>
  )
}

const KYCPendingComponent = () => {
  const kycStatus = useKycStatus()

  // Enable polling when KYC status is PENDING or SUCCESS (for virtual accounts)
  const { isPolling, pollingPhase } = useKycStatusPolling(
    kycStatus === KYCVerificationStatus.PENDING || kycStatus === KYCVerificationStatus.SUCCESS
  )

  console.log('KYCPendingComponent - KYC status:', kycStatus, 'isPolling:', isPolling, 'pollingPhase:', pollingPhase)

  // Determine the appropriate message based on polling phase
  const getMessage = () => {
    switch (pollingPhase) {
      case 'kyc_approval':
        return 'Your identity verification is being processed. This may take a few minutes.'
      case 'virtual_accounts':
        return 'Processing. Please wait...'
      default:
        return 'Your identity verification is being processed. This may take a few minutes.'
    }
  }

  return (
    <div className="h-full w-full flex gap-5">
      <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg max-w-[500px] h-full gap-6 mx-auto">
        <Loader className="h-8 w-8 animate-spin" />
        <p className="text-center font-medium text-base">{getMessage()}</p>
      </div>
    </div>
  )
}

const KYCSuccessComponent = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg max-w-[500px] h-full gap-6 mx-auto">
        <div>
          <CheckIcon size={64} className="text-green-500" />
        </div>
        <p className="text-center font-medium text-base">Your identity has been successfully verified!</p>
      </div>
    </div>
  )
}

const KYCFailedComponent = () => {
  const { data: userData } = useUserCustomerDetails()
  const kycRetry = useKycRetry()
  const kycStatus = useKycStatus()

  const bridgeKYCEntity = userData?.bridgeKyc
  const retryingKYC = kycRetry.isPending

  console.log('KYCFailedComponent - bridgeKYCEntity:', bridgeKYCEntity)
  console.log('KYCFailedComponent - retryingKYC:', retryingKYC)
  console.log('KYCFailedComponent - kycStatus:', kycStatus)

  const onRetryKYC = () => {
    console.log('KYCFailedComponent - Retrying KYC verification with bridgeKYCEntity:', bridgeKYCEntity)
    // Trigger the retry process using the new mutation
    kycRetry.mutate()
    console.log('KYCFailedComponent - Triggered KYC retry mutation')
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg max-w-[500px] h-full gap-6 mx-auto">
        <p className="text-center font-medium text-base mb-4">We were unable to verify your identity. Please try again.</p>
        <Button onClick={onRetryKYC} disabled={retryingKYC}>
          {retryingKYC ? 'Retrying...' : 'Retry Verification'}
        </Button>
      </div>
    </div>
  )
}

export const KYCStepComponent = ({
  kycVerificationStatus,
  onComplete,
  onKycProcessComplete,
  vaultType,
}: {
  kycVerificationStatus: KYCVerificationStatus
  onComplete?: () => void
  onKycProcessComplete?: () => void
  vaultType: VaultType
}) => {
  const { data: userData } = useUserCustomerDetails()
  const kycRetry = useKycRetry()
  const kycConfirm = useKycConfirm()
  const { kycStatus, isLoading } = useKycStatusManager()

  // Enable polling when KYC status is PENDING or SUCCESS (for virtual accounts)
  const { isPolling, pollingPhase } = useKycStatusPolling(
    kycStatus === KYCVerificationStatus.PENDING || kycStatus === KYCVerificationStatus.SUCCESS
  )

  const bridgeKYCEntity = userData?.bridgeKyc
  const retryingKYC = kycRetry.isPending
  const confirmingKYC = kycConfirm.isPending

  console.log('KYCVerificationStepComponent - bridgeKYCEntity:', bridgeKYCEntity)
  console.log('KYCVerificationStepComponent - kycVerificationStatus:', kycVerificationStatus)
  console.log('KYCVerificationStepComponent - kycStatus (local):', kycStatus)
  console.log('KYCVerificationStepComponent - vaultType:', vaultType)
  console.log('KYCVerificationStepComponent - isPolling:', isPolling)
  console.log('KYCVerificationStepComponent - retryingKYC:', retryingKYC)
  console.log('KYCVerificationStepComponent - confirmingKYC:', confirmingKYC)

  // If we're loading, polling, retrying, or confirming, show the loading component
  if (isLoading || isPolling || retryingKYC || confirmingKYC) {
    console.log('KYCVerificationStepComponent - Showing loading component due to loading/polling/retrying/confirming')
    return <KYCLoadingComponent />
  }

  // Use the local KYC status from Zustand instead of the prop
  const currentStatus = kycStatus || kycVerificationStatus

  console.log('KYCVerificationStepComponent - Rendering component based on status:', currentStatus, 'pollingPhase:', pollingPhase)
  switch (currentStatus) {
    case KYCVerificationStatus.NOT_STARTED:
      console.log('KYCVerificationStepComponent - Rendering BridgeKYCComponent')
      return <BridgeKYCComponent onKycProcessComplete={onKycProcessComplete} />
    case KYCVerificationStatus.PENDING:
      console.log('KYCVerificationStepComponent - Rendering KYCPendingComponent')
      return <KYCPendingComponent />
    case KYCVerificationStatus.SUCCESS:
      // If we're still polling for virtual accounts, show pending component
      if (pollingPhase === 'virtual_accounts') {
        console.log('KYCVerificationStepComponent - KYC approved but virtual accounts still being created, showing pending')
        return <KYCPendingComponent />
      }
      console.log('KYCVerificationStepComponent - Rendering KYCSuccessComponent')
      return <KYCSuccessComponent onComplete={onComplete} />
    case KYCVerificationStatus.FAILED:
      console.log('KYCVerificationStepComponent - Rendering KYCFailedComponent')
      return <KYCFailedComponent />
    default:
      console.log('KYCVerificationStepComponent - No matching component for status, defaulting to BridgeKYCComponent')
      return <BridgeKYCComponent onKycProcessComplete={onKycProcessComplete} />
  }
}
