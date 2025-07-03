import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EtherInput } from '@/components/ui/ether-input'

import { Combobox } from '@/components/ui/combobox'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Send, UserPlus, Wallet } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'
import { TokenSelector } from '@/components/ui/TokenSelector/TokenSelector'
import { TokenBalance } from '@/constants/tokens'

import { useRecipients } from '@/api/recipients/recipientQueries'
import { parseRecipientInfo, getMinimumAmount } from '@/utils/paymentValidation'
import { isAddress } from 'viem'
import {
  ExternalAccountWidgetPayAndTransferFormFields,
  ExternalAccountWidgetPayAndTransferProps,
} from './ExternalAccountWidgetPayAndTransfer.types'
import { useKycStatusManager } from '@/api/user/userQueries'
import { KYCVerificationStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { useTokenBalances } from '@/api/wallet/walletQueries.ts'

export default function ExternalAccountWidgetPayAndTransfer({
  balance: _balance, // Keep for backward compatibility but use token balances instead
  recipients,
  config: _config,
  onSend,
  onCreatePayee,
}: ExternalAccountWidgetPayAndTransferProps) {
  const [showAddress, setShowAddress] = useState(false)
  const [selectedToken, setSelectedToken] = useState<TokenBalance | undefined>()

  // Smart wallet functionality - use only smart wallet for all payments
  const { isLoading: isSmartWalletLoading } = usePrivySmartWallet()

  // Token balances
  const { availableTokens, isLoading: isTokensLoading } = useTokenBalances()

  // KYC status for button validation
  const { kycStatus } = useKycStatusManager()

  // Get all recipients for validation
  const { bridgeRecipients } = useRecipients()

  // Define Zod schema for form validation with dynamic minimum amounts and token balance
  const formSchema = useMemo(
    () =>
      z
        .object({
          amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
          recipient: z
            .string()
            .min(1, 'Recipient is required')
            .refine((val) => val !== 'new', 'Please select a valid recipient'),
          address: z.string().optional(),
        })
        .superRefine((val, ctx) => {
          // Validate direct web3 address
          if (val.recipient === 'direct') {
            if (!val.address || val.address.trim() === '') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['address'],
                message: 'Web3 address is required for direct transfers',
              })
            } else if (!isAddress(val.address)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['address'],
                message: 'Invalid Ethereum address format',
              })
            }
          }

          // Dynamic minimum amount validation based on recipient type
          if (val.recipient && val.amount) {
            // Use bridge recipients for backward compatibility with parseRecipientInfo
            const recipientInfo = parseRecipientInfo(val.recipient, bridgeRecipients)
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
    [bridgeRecipients, selectedToken, availableTokens] // Include token dependencies
  )

  // Create form with Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      amount: 0,
      recipient: '',
      address: '',
    },
    resolver: zodResolver(formSchema),
    mode: 'onSubmit', // Enable real-time validation
  })

  const { handleSubmit, watch, formState } = form
  const recipient = watch('recipient')
  const amount = watch('amount')

  // Check if form is valid and has required data
  const isFormValid = formState.isValid && selectedToken && amount > 0 && recipient

  // Set default token when tokens are loaded
  useEffect(() => {
    if (availableTokens.length > 0 && !selectedToken) {
      // Default to USDC if available, otherwise first available token
      const defaultToken = availableTokens.find((token) => token.symbol === 'USDC') || availableTokens[0]
      setSelectedToken(defaultToken)
    }
  }, [availableTokens, selectedToken])

  useEffect(() => {
    console.log('🔍 useEffect recipient changed to:', recipient)

    if (recipient === 'direct') {
      setShowAddress(true)
    } else {
      setShowAddress(false)
    }

    // Only trigger onCreatePayee if recipient is explicitly set to 'new'
    if (recipient === 'new') {
      console.log('🔍 Recipient is "new" - calling onCreatePayee()')
      // Reset the form field to prevent the modal from opening again
      setTimeout(() => {
        form.setValue('recipient', '')
      }, 0)
      onCreatePayee()
    }
  }, [recipient])

  const handleSendAction = async (data: ExternalAccountWidgetPayAndTransferFormFields) => {
    console.log('🚀 handleSendAction called with:', data)

    // Validate token balance at submission time
    if (selectedToken && data.amount > selectedToken.decimal) {
      form.setError('amount', {
        type: 'manual',
        message: `Insufficient ${selectedToken.symbol} balance. You have ${selectedToken.formatted} available`,
      })
      return
    }

    try {
      // Always use the Pay Someone modal for all transfers
      console.log('🔄 Opening pay modal for transfer:', data.recipient)
      handleOpenPayModal()
    } catch (error) {
      console.error('Transfer preparation failed:', error)
      form.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Transfer preparation failed. Please try again.',
      })
    }
  }

  const handleOpenPayModal = () => {
    const formData = form.getValues()
    console.log('🔍 handleOpenPayModal called with formData:', formData)

    // Handle direct Web3 payments differently
    if (formData.recipient === 'direct') {
      const dataToSend = {
        recipient: 'direct', // Keep as 'direct' to identify it's a direct Web3 payment
        amount: Number(formData.amount) || 0,
        token: selectedToken?.symbol || 'USDC',
        selectedToken,
        recipientAddress: formData.address, // Pass the wallet address
        isDirectWeb3: true, // Flag to indicate this is a direct Web3 payment
      }
      console.log('🔍 Calling onSend with direct Web3 data:', dataToSend)
      onSend(dataToSend)
    } else {
      // Handle saved recipients
      const recipientValue = formData.recipient && !['new'].includes(formData.recipient) ? formData.recipient : undefined

      const dataToSend = {
        recipient: recipientValue,
        amount: Number(formData.amount) || 0,
        token: selectedToken?.symbol || 'USDC',
        selectedToken,
      }
      console.log('🔍 Calling onSend with saved recipient data:', dataToSend)
      onSend(dataToSend)
    }
  }

  console.log('receipients', recipients)

  return (
    <div className="block bg-primary-600/10 rounded-2xl px-5 py-3 mx-0 md:p-3 md:mx-[46px] text-white mb-0 md:mb-6">
      <h3 className="mb-3">Transfer Funds</h3>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleSendAction)} className="space-y-4 mb-4 p-0">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="relative flex w-full">
                      <>
                        <Input
                          {...field}
                          type="text"
                          inputMode="decimal"
                          pattern="^[0-9]*[.,]?[0-9]*$"
                          placeholder="0.00"
                          className="placeholder:text-white rounded-r-none border-r-0 pr-14"
                          onChange={(e) => {
                            // Only allow numbers and decimal
                            const value = e.target.value.replace(/[^\d.]/g, '')
                            field.onChange(value)
                            setTimeout(() => form.trigger(), 100)
                          }}
                          value={field.value || ''}
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          title="Set to maximum available balance"
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-0.5 text-xs font-semibold text-primary-500 bg-white/15 border border-white/30 rounded-full backdrop-blur-sm hover:bg-white/30 hover:border-white/60 transition-colors duration-150 focus:outline-none"
                          onClick={() => {
                            if (selectedToken) {
                              field.onChange(selectedToken.formatted)
                              setTimeout(() => form.trigger(), 0)
                            }
                          }}
                          tabIndex={-1}
                        >
                          Max
                        </button>
                      </>
                    </div>
                    <TokenSelector
                      selectedToken={selectedToken}
                      availableTokens={availableTokens}
                      onTokenSelect={(token) => {
                        setSelectedToken(token)
                        // Trigger form validation immediately when token changes
                        setTimeout(() => form.trigger(), 0)
                      }}
                      disabled={isTokensLoading}
                    />
                  </div>
                </FormControl>
                {selectedToken && (
                  <p className="text-sm text-white/80 mt-1">
                    💡 You have {selectedToken.formatted} {selectedToken.symbol} available
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient</FormLabel>
                <FormControl className="w-full">
                  <Combobox
                    options={recipients.filter((recipient) => recipient.value && recipient.value !== '')}
                    value={field.value}
                    onValueChange={(value) => {
                      console.log('🔍 Combobox onValueChange called with:', value)
                      field.onChange(value)
                      // Trigger validation after recipient change
                      setTimeout(() => form.trigger(), 100)
                    }}
                    className="w-full [&>button]:w-full"
                    placeholder="Select recipient"
                    searchPlaceholder="Search recipients..."
                    emptyMessage="No recipients found."
                    triggerClassName="bg-white/15 text-white border-white/20 w-full max-w-[300px] sm:max-w-full white-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showAddress && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direct Web3 Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Wallet fontSize="small" />
                      </div>
                      <EtherInput
                        {...field}
                        className="pl-10 placeholder:text-white/40"
                        placeholder="0x..."
                        onFocus={(e) => {
                          // Move cursor to position 2 (after "0x") when focused
                          e.target.setSelectionRange(2, 2)
                        }}
                      />
                    </div>
                  </FormControl>
                  <div className="mt-1 flex items-center text-xs text-amber-400 border p-1 border-white/20 bg-white/20 rounded-sm border-l-2 border-l-[#ffbb33]">
                    <AlertTriangle fill="yellow" className="h-3 w-3 mr-1" />
                    <span className="text-white">
                      <b>Important:</b> Only send ERC20 USDC on Base network to this address.
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex gap-3 mt-4 overflow-hidden">
            <Button
              type="submit"
              variant={'default'}
              disabled={isSmartWalletLoading || !isFormValid}
              className={`rounded-xl bg-[#0A84FF] ${kycStatus === KYCVerificationStatus.SUCCESS ? 'flex-2' : 'flex-1'} text-xs sm:text-sm`}
            >
              <Send fontSize="small" className="sm:mr-2" />
              {isSmartWalletLoading ? 'Processing...' : 'Send'}
            </Button>
            {kycStatus === KYCVerificationStatus.SUCCESS && (
              <Button
                color={'secondary'}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onCreatePayee()
                }}
                className="flex-1 bg-white/10 rounded-xl border border-white/20 text-xs sm:text-sm"
              >
                <UserPlus fontSize="small" className="sm:mr-2" />
                Add Recipient
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
