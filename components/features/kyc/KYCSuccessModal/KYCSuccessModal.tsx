'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useIsKycSuccessModalOpen, useUserActions } from '@/stores/userStore'

export const KYCSuccessModal: React.FC = () => {
  const isOpen = useIsKycSuccessModalOpen()
  const { setKycSuccessModalOpen } = useUserActions()

  const handleClose = () => {
    setKycSuccessModalOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setKycSuccessModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            KYC Verification Complete
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verification Successful!
            </h3>
            
            <p className="text-gray-600 text-sm">
              Your identity has been successfully verified. You now have full access to all platform features.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={handleClose} className="w-full">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
