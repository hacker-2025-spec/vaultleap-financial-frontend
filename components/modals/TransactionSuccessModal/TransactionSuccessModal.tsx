import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle, ExternalLink } from 'lucide-react'

export interface TransactionSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  transactionHash: string
  amount: number
  token: string
  recipient: string
}

export default function TransactionSuccessModal({
  isOpen,
  onClose,
  transactionHash,
  amount,
  token,
  recipient
}: TransactionSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transaction Successful</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-lg font-semibold mb-2">Transaction Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your {amount} {token} has been sent to {recipient} successfully.
          </p>

          {transactionHash && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Transaction Hash:</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-xs bg-white px-2 py-1 rounded border font-mono break-all">
                  {transactionHash}
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.open(`https://basescan.org/tx/${transactionHash}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <Button onClick={onClose} className="min-w-[120px]">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
