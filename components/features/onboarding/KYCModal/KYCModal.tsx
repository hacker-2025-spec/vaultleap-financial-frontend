import { KYCStepComponent } from '../KYCStep/KYCStep.component'
import { KYCModalProps } from './KYCModal.types'
import { KYCVerificationStatus, VaultType } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCheckKycStatus, useBeginKycProcess } from '@/api/user/userQueries'
import { useState, useCallback } from 'react'

import './KYCModal.css'

export default function KYCModal({ isOpen, onClose, kycVerificationStatus }: KYCModalProps) {
  // State to track if KYC process has been initiated (iframe completed)
  const [isKycProcessInitiated, setIsKycProcessInitiated] = useState(false)
  const { beginKycProcess } = useBeginKycProcess()

  // Initial fetch (no polling) - just to get current status
  const { data: _initialKycData, isLoading: _isInitialLoading } = useCheckKycStatus()

  // Polling query - only enabled after KYC process is initiated
  const { data: _pollingKycData, isLoading: isPolling } = useCheckKycStatus(
    isKycProcessInitiated ? 3000 : undefined // Poll every 3 seconds only if KYC is initiated
  )

  // Check if KYC is successful to determine if we should show a Done button
  const isSuccess = kycVerificationStatus === KYCVerificationStatus.SUCCESS

  // Handle KYC process completion from iframe
  const handleKycComplete = useCallback(() => {
    console.log('KYC process completed in iframe, starting polling...')
    // Set local KYC status to in progress when user begins the process
    beginKycProcess()
    setIsKycProcessInitiated(true)
  }, [beginKycProcess])

  // Handle done button click
  const handleDone = () => {
    onClose(KYCVerificationStatus.SUCCESS)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="kyc-modal sm:max-w-[650px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Verify Now</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <KYCStepComponent
            kycVerificationStatus={kycVerificationStatus}
            onComplete={handleDone}
            onKycProcessComplete={handleKycComplete}
            vaultType={VaultType.DIRECT}
          />
        </div>
        {isSuccess && !isPolling && (
          <DialogFooter>
            <Button onClick={handleDone}>Done</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
