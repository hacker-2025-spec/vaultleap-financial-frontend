import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { PaySomeoneModalProps, PaymentFormData } from './PaySomeoneModal.types'
import { useRecipients } from '@/api/recipients/recipientQueries'
import { parseRecipientInfo, getMinimumAmount } from '@/utils/paymentValidation'
import { showToast } from '@/utils/toast'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import {
  calculateTotalAmountWithDeveloperFee,
  calculateDeveloperFeeAmount,
  getDeveloperFeePercent,
  getDeveloperFeePercentFromLiquidationAddress,
  formatAmount,
} from '@/utils/developerFeeCalculations'
import { TokenBalance } from '@/constants/tokens'
import { useTokenBalances } from '@/api/wallet/walletQueries.ts'

export default function PaySomeoneModal({
  isOpen,
  onClose,
  recipients,
  config: _config,
  onPaymentConfirmed,
  initialValues,
  onStartLoading,
  isDirectWeb3 = false,
  directWeb3Data,
  onDirectWeb3Success,
}: PaySomeoneModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<TokenBalance | undefined>()

  // Direct web3 transaction state
  const [isExecutingTransaction, setIsExecutingTransaction] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [transactionError, setTransactionError] = useState<string>('')
  const [showSuccessState, setShowSuccessState] = useState(false)

  // Smart wallet for direct web3 transactions
  const { sendUsdc, isReady: isSmartWalletReady } = usePrivySmartWallet()

  // User data for premium status
  const { data: userData } = useUserCustomerDetails()
  const isPremium = userData?.isPremium || false

  // Token balances
  const { availableTokens, hasMultipleTokens, isLoading: isTokensLoading } = useTokenBalances()

  // All recipients for validation
  const { bridgeRecipients = [], directRecipients = [] } = useRecipients()

  // Combine both types for validation (backward compatibility) - memoized to prevent re-renders
  const liquidationAddresses = useMemo(() => [...bridgeRecipients, ...directRecipients], [bridgeRecipients, directRecipients])

  // Dynamic validation schema with minimum amount and token balance validation
  const dynamicFormSchema = useMemo(
    () =>
      z
        .object({
          recipient: z.string().min(1, 'Recipient is required'),
          amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
          note: z.string().optional(),
        })
        .superRefine((val, ctx) => {
          // Dynamic minimum amount validation based on recipient type
          if (val.recipient && val.amount) {
            const recipientInfo = parseRecipientInfo(val.recipient, liquidationAddresses)
            const minimumAmount = getMinimumAmount(recipientInfo)

            if (val.amount < minimumAmount) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['amount'],
                message: `Minimum amount is ${minimumAmount} for this recipient type`,
              })
            }
          }

          // Token balance validation
          if (val.amount && selectedToken) {
            if (val.amount > selectedToken.decimal) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['amount'],
                message: `Insufficient ${selectedToken.symbol} balance. You have ${selectedToken.formatted} available`,
              })
            }
          }

          // Token selection validation
          if (!selectedToken && availableTokens.length > 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['amount'],
              message: 'Please select a token to send',
            })
          }
        }),
    [liquidationAddresses, selectedToken, availableTokens]
  )

  // Create form with react-hook-form and dynamic zod resolver
  const form = useForm<PaymentFormData>({
    defaultValues: {
      recipient: initialValues?.recipient || '',
      amount: initialValues?.amount || undefined,
      note: initialValues?.note || '',
    },
    resolver: zodResolver(dynamicFormSchema),
    mode: 'onChange',
  })

  // Watch form values for validation
  const watchedValues = form.watch()
  const isFormValid = form.formState.isValid && selectedToken && watchedValues.amount > 0 && watchedValues.recipient

  // Handle dialog open/close
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  // Set default token when tokens are loaded
  useEffect(() => {
    if (availableTokens.length > 0 && !selectedToken) {
      // Default to USDC if available, otherwise first available token
      const defaultToken = availableTokens.find((token) => token.symbol === 'USDC') || availableTokens[0]
      setSelectedToken(defaultToken)
    }
  }, [availableTokens, selectedToken])

  // Trigger form validation when token selection changes
  useEffect(() => {
    if (selectedToken) {
      form.trigger()
    }
  }, [selectedToken, form])

  // Trigger form validation when amount or recipient changes
  useEffect(() => {
    if (watchedValues.amount || watchedValues.recipient) {
      form.trigger()
    }
  }, [watchedValues.amount, watchedValues.recipient, form])

  // Handle initial values separately to ensure proper form reset
  useEffect(() => {
    console.log('🔍 PaySomeoneModal initialValues changed:', initialValues)
    console.log(
      '🔍 Available recipients:',
      recipients.map((r) => ({ value: r.value, label: r.label }))
    )

    if (isOpen && initialValues) {
      // Use setTimeout to ensure the form is fully rendered before resetting
      setTimeout(() => {
        const resetValues = {
          recipient: initialValues.recipient || '',
          amount: initialValues.amount || undefined,
          note: initialValues.note || '',
        }
        console.log('🔍 Resetting form with values:', resetValues)

        // Check if the recipient exists in the list OR if it's a direct Web3 payment
        const recipientExists = recipients.some((r) => r.value === initialValues.recipient) || initialValues.recipient === 'direct'
        console.log('🔍 Recipient exists in list:', recipientExists, 'Looking for:', initialValues.recipient)

        form.reset(resetValues)

        // Force update the recipient field specifically
        if (initialValues.recipient && recipientExists) {
          form.setValue('recipient', initialValues.recipient, { shouldValidate: true })
          console.log('🔍 Force setting recipient to:', initialValues.recipient)
        } else if (initialValues.recipient && !recipientExists && initialValues.recipient !== 'direct') {
          console.log('🔍 Recipient not found in list, waiting for recipients to load...')
          // Try again after a longer delay to allow recipients to load
          setTimeout(() => {
            const updatedRecipientExists = recipients.some((r) => r.value === initialValues.recipient)
            console.log('🔍 Retry - Recipient exists in list:', updatedRecipientExists)
            if (updatedRecipientExists) {
              form.setValue('recipient', initialValues.recipient, { shouldValidate: true })
              console.log('🔍 Retry - Force setting recipient to:', initialValues.recipient)
            }
          }, 500)
        }
      }, 200)
    }
  }, [isOpen, initialValues, form, recipients])

  // Define the submit handler with loading modal and delay
  const onSubmit = async (data: PaymentFormData) => {
    console.log('🔍 PaySomeoneModal onSubmit called with data:', data)
    console.log('🔍 Amount type:', typeof data.amount, 'Amount value:', data.amount)

    if (form.formState.isValid) {
      try {
        if (onStartLoading) onStartLoading()

        onClose()

        // Ensure amount is a number before passing to parent
        const paymentData: PaymentFormData = {
          ...data,
          amount: Number(data.amount) || 0,
          selectedToken,
        }

        console.log('🔍 Processed payment data:', paymentData)

        // Pass the payment data to parent component to handle the actual transaction
        if (onPaymentConfirmed) {
          onPaymentConfirmed(paymentData)
        }
      } catch (error) {
        console.error('Payment preparation failed:', error)
        showToast.error('Failed to prepare payment')
      }
    }
  }

  // Handle dialog close
  const handleClose = () => {
    onClose()
  }

  // Calculate fee information for the current form values
  const calculateFeeInfo = () => {
    const formValues = form.getValues()
    const recipientId = formValues.recipient
    const amountValue = formValues.amount

    // Convert amount to number and validate
    const amount = typeof amountValue === 'string' ? parseFloat(amountValue) : amountValue

    if (!recipientId || !amount || isNaN(amount) || amount <= 0) {
      return null
    }

    // Find the recipient details to determine if it's a Bridge transfer
    const savedRecipient = bridgeRecipients.find((r) => r.id === recipientId) || directRecipients.find((r) => r.id === recipientId)

    // Check if this is a direct web3 transfer
    const isDirectWeb3Transfer = savedRecipient ? 'destinationAddress' in savedRecipient : false
    const isBridgeTransfer = !isDirectWeb3Transfer

    if (!isBridgeTransfer) {
      // No fees for direct Web3 transfers
      return {
        isBridgeTransfer: false,
        intendedAmount: amount,
        developerFee: 0,
        totalAmount: amount,
        developerFeePercent: 0,
      }
    }

    // Calculate Bridge transfer fees using liquidation address data
    let developerFeePercent = getDeveloperFeePercent(isPremium) // fallback

    // Try to get fee from liquidation address if it's a Bridge recipient
    if (savedRecipient && 'developer_fee' in savedRecipient) {
      developerFeePercent = getDeveloperFeePercentFromLiquidationAddress(savedRecipient as any)
    }

    const developerFee = calculateDeveloperFeeAmount(amount, developerFeePercent)
    const totalAmount = calculateTotalAmountWithDeveloperFee(amount, developerFeePercent)

    return {
      isBridgeTransfer: true,
      intendedAmount: amount,
      developerFee,
      totalAmount,
      developerFeePercent,
    }
  }

  // Add this helper function to get the recipient display text
  const getRecipientDisplayText = () => {
    const recipientValue = form.getValues('recipient')

    // Handle direct Web3 payments
    if (recipientValue === 'direct' && initialValues?.recipientAddress) {
      return initialValues.recipientAddress
    }

    // Handle saved recipients
    const savedRecipient = recipients.find((r) => r.value === recipientValue)
    if (savedRecipient) {
      return savedRecipient.label
    }

    // Fallback
    return recipientValue || 'Unknown recipient'
  }

  // Helper function to truncate long addresses
  const truncateAddress = (address: string, startChars: number = 6, endChars: number = 4) => {
    if (address.length <= startChars + endChars + 3) {
      return address
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
  }

  // Helper function to format recipient display
  const formatRecipientDisplay = (text: string) => {
    // Check if it looks like an Ethereum address (0x followed by 40 hex chars)
    const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(text)

    if (isEthAddress) {
      return <span>{truncateAddress(text)}</span>
    }

    // For other long text, just truncate if needed
    if (text.length > 50) {
      return <span>{text.slice(0, 50)}...</span>
    }

    return <span className="text-sm">{text}</span>
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          className="pay-someone-modal sm:max-w-[500px]"
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Review Payment</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Payment Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Payment Summary</h3>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="rounded-md border p-4 space-y-3">
                    <div className="grid grid-cols-2">
                      <span className="font-medium">Recipient:</span>
                      <div className="ml-0">{formatRecipientDisplay(getRecipientDisplayText())}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="font-medium">Recipient gets:</span>
                      <span>
                        {formatAmount(form.getValues('amount'))} {selectedToken?.symbol || 'USDC'}
                      </span>
                    </div>
                    {(() => {
                      const feeInfo = calculateFeeInfo()
                      if (feeInfo?.isBridgeTransfer && feeInfo.developerFee > 0) {
                        return (
                          <>
                            <div className="grid grid-cols-2 text-sm text-gray-600">
                              <span>Our fees ({feeInfo.developerFeePercent}%):</span>
                              <span>+${formatAmount(feeInfo.developerFee)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="grid grid-cols-2 font-medium">
                                <span>Total you pay:</span>
                                <span>${formatAmount(feeInfo.totalAmount)}</span>
                              </div>
                            </div>
                          </>
                        )
                      }
                      return null
                    })()}
                  </div>

                  {/* Transfer Type Info */}
                  {(() => {
                    const feeInfo = calculateFeeInfo()
                    if (feeInfo?.isBridgeTransfer) {
                      return (
                        <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
                          <p className="font-medium text-blue-700 mb-1">Transfer</p>
                          <p>The recipient will receive exactly ${formatAmount(form.getValues('amount'))} in their bank account.</p>
                          {feeInfo.developerFee > 0 && (
                            <p className="mt-1">
                              A {feeInfo.developerFeePercent}% fee (${formatAmount(feeInfo.developerFee)}) is added to cover processing
                              costs.
                            </p>
                          )}
                        </div>
                      )
                    } else {
                      return (
                        <div className="text-xs text-gray-500 bg-green-50 p-3 rounded-md">
                          <p className="font-medium text-green-700 mb-1">Direct Web3 Transfer</p>
                          <p>This payment will be sent directly to the recipient's crypto wallet. No additional fees apply.</p>
                        </div>
                      )
                    }
                  })()}
                </div>

                {/* Note Field */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What's this payment for?" {...field} className="min-h-[80px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Show note in summary if it exists */}
                {form.getValues('note') && (
                  <div className="rounded-md border p-3 bg-gray-50">
                    <div className="flex flex-row items-center gap-4">
                      <span className="font-medium text-sm">Note:</span>
                      <span className="text-sm text-gray-600">{form.getValues('note')}</span>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>

          <DialogFooter className="flex justify-end">
            <Button
              onClick={async () => {
                const isValid = await form.trigger()
                if (isValid) {
                  form.handleSubmit(onSubmit)()
                }
              }}
              disabled={!isFormValid}
              className="w-full"
            >
              Proceed with Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
