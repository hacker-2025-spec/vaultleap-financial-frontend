import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, ExternalLink, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'

export interface ReviewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (transactionHash?: string) => void
  initialData?: {
    amount: number
    recipient: string
    recipientAddress?: string
    token?: 'USDC' | 'EURC' | 'USDT'
  }
}

type ModalStep = 'review' | 'sending' | 'success' | 'error'

interface TransactionData {
  amount: number
  recipient: string
  recipientAddress: string
  note?: string
  token: 'USDC' | 'EURC' | 'USDT'
}

export default function ReviewTransactionModal({ isOpen, onClose, onSuccess, initialData }: ReviewTransactionModalProps) {
  const [step, setStep] = useState<ModalStep>('review')
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [note, setNote] = useState<string>('')

  const { sendToken, getTokenBalance, isReady: isSmartWalletReady } = usePrivySmartWallet()

  // Initialize transaction data from props
  const [transactionData, setTransactionData] = useState<TransactionData>(() => ({
    amount: initialData?.amount || 0,
    recipient: initialData?.recipient || '',
    recipientAddress: initialData?.recipientAddress || '',
    note: '',
    token: initialData?.token || 'USDC',
  }))

  // Reset modal state when opened/closed
  React.useEffect(() => {
    if (isOpen && initialData) {
      setTransactionData({
        amount: initialData.amount,
        recipient: initialData.recipient,
        recipientAddress: initialData.recipientAddress || '',
        note: '',
        token: initialData.token || 'USDC',
      })
      setStep('review')
      setTransactionHash('')
      setError('')
      setNote('')
    }
  }, [isOpen, initialData])

  const handleConfirmTransaction = async () => {
    if (!isSmartWalletReady) {
      setError('Smart wallet not ready. Please try again.')
      setStep('error')
      return
    }

    if (!transactionData.recipientAddress) {
      setError('Recipient address is required.')
      setStep('error')
      return
    }

    // Validate recipient address format
    if (!transactionData.recipientAddress.startsWith('0x') || transactionData.recipientAddress.length !== 42) {
      setError('Invalid Ethereum address format.')
      setStep('error')
      return
    }

    // Check balance for the specific token
    try {
      const balance = await getTokenBalance(transactionData.token)
      if (!balance || balance.decimal < transactionData.amount) {
        setError(`Insufficient ${transactionData.token} balance for this transaction.`)
        setStep('error')
        return
      }
    } catch (err) {
      console.error('Error checking balance:', err)
      setError('Failed to check balance. Please try again.')
      setStep('error')
      return
    }

    // Close this modal before showing Privy confirmation to avoid overlap
    onClose()

    try {
      // Execute the transaction - this will show Privy confirmation modal
      const result = await sendToken({
        recipient: transactionData.recipientAddress as `0x${string}`,
        amountDecimal: transactionData.amount.toString(),
        token: transactionData.token,
      })

      if (result?.transactionHash) {
        // Call onSuccess with transaction hash to let parent handle success state
        onSuccess?.(result.transactionHash)
      } else {
        throw new Error('Transaction failed - no hash returned')
      }
    } catch (err) {
      console.error('Transaction failed:', err)
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed. Please try again.'
      // For now, just show a toast for errors since modal is closed
      const toastModule = await import('@/utils/toast')
      toastModule.showToast.error(errorMessage)
    }
  }

  const handleRetry = () => {
    setStep('review')
    setError('')
  }

  const handleClose = () => {
    setStep('review')
    setTransactionHash('')
    setError('')
    setNote('')
    onClose()
  }

  const getStepTitle = () => {
    switch (step) {
      case 'review':
        return 'Review Transaction'
      case 'sending':
        return 'Sending Transaction'
      case 'success':
        return 'Transaction Successful'
      case 'error':
        return 'Transaction Failed'
      default:
        return 'Review Transaction'
    }
  }

  const renderReviewStep = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Token</span>
              <span className="font-semibold">{transactionData.token}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Amount</span>
              <span className="font-semibold text-lg">
                {transactionData.amount} {transactionData.token}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-600">Recipient</span>
              <div className="text-right">
                {transactionData.recipient && <div className="font-medium">{transactionData.recipient}</div>}
                <div className="text-sm text-gray-500 font-mono break-all max-w-[200px]">{transactionData.recipientAddress}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="note">What's this for? (Optional)</Label>
        <Textarea
          id="note"
          placeholder="Add a note for your records..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirmTransaction} className="min-w-[140px]">
          Confirm and Send
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  const renderSendingStep = () => (
    <div className="text-center py-8">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
      <h3 className="text-lg font-semibold mb-2">Processing Transaction</h3>
      <p className="text-gray-600 mb-4">Please wait while we process your {transactionData.token} transfer...</p>
      <p className="text-sm text-gray-500">Gas fees are sponsored - you won't pay any network fees!</p>
    </div>
  )

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
      <h3 className="text-lg font-semibold mb-2">Transaction Successful!</h3>
      <p className="text-gray-600 mb-6">
        Your {transactionData.amount} {transactionData.token} has been sent successfully.
      </p>

      {transactionHash && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Transaction Hash:</p>
          <div className="flex items-center justify-center gap-2">
            <code className="text-xs bg-white px-2 py-1 rounded border font-mono break-all">{transactionHash}</code>
            <Button variant="ghost" size="sm" onClick={() => window.open(`https://basescan.org/tx/${transactionHash}`, '_blank')}>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => {
          onSuccess?.() // Call onSuccess when user clicks Done
          handleClose()
        }}
        className="min-w-[120px]"
      >
        Done
      </Button>
    </div>
  )

  const renderErrorStep = () => (
    <div className="text-center py-8">
      <XCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
      <h3 className="text-lg font-semibold mb-2">Transaction Failed</h3>
      <p className="text-gray-600 mb-6">{error}</p>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleRetry}>Try Again</Button>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (step) {
      case 'review':
        return renderReviewStep()
      case 'sending':
        return renderSendingStep()
      case 'success':
        return renderSuccessStep()
      case 'error':
        return renderErrorStep()
      default:
        return renderReviewStep()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
        </DialogHeader>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  )
}
