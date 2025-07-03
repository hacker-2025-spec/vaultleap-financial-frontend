import { useState, useEffect } from 'react'
import { type DirectWeb3Recipient } from '@/hooks/useRecipients'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CurrencyCode } from '@/types/currency'
import { AddRecipientModalProps, AddRecipientFormData, RecipientStep } from './AddRecipientModal.types'
import { isAddress } from 'viem'
import CreateLiquidationAddressModal from '@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal'
import { useCreateRecipient } from '@/api/recipients/recipientQueries'
import type { CreateUnifiedAccountDto } from '@/client/types.gen'

const formSchema = z
  .object({
    currency: z.nativeEnum(CurrencyCode),
    recipientName: z.string().min(1, 'Recipient name is required'),
    address: z.string().optional(),
  })
  .refine(
    (data) => {
      if ([CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(data.currency)) {
        return data.address && isAddress(data.address)
      }
      return true
    },
    {
      message: 'Valid Ethereum address is required for stablecoin recipients',
      path: ['address'],
    }
  )

export default function AddRecipientModal({ isOpen, onClose, onRecipientCreated }: AddRecipientModalProps) {
  const [step, setStep] = useState<RecipientStep>('currency')
  const [showLiquidationModal, setShowLiquidationModal] = useState(false)
  const createRecipientMutation = useCreateRecipient()

  const form = useForm<AddRecipientFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: CurrencyCode.USD,
      recipientName: '',
      address: '',
    },
  })

  const { watch, reset } = form
  const selectedCurrency = watch('currency')

  useEffect(() => {
    if (isOpen) {
      setStep('currency')
      reset()
    }
  }, [isOpen, reset])

  const handleCurrencyNext = () => {
    setStep('details')
  }

  const handleBack = () => {
    setStep('currency')
  }

  const handleLiquidationAddressCreated = () => {
    setShowLiquidationModal(false)
    onClose()
    // The liquidation address will be automatically available in the recipients list
  }

  const handleSubmit = async (data: AddRecipientFormData) => {
    try {
      if ([CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(data.currency)) {
        // Create direct Web3 recipient using unified API
        const currencyLower = data.currency.toLowerCase() as 'usdc' | 'usdt' | 'eurc'
        const payload: CreateUnifiedAccountDto = {
          vaultName: data.recipientName,
          transferType: 'direct_web3',
          feePercentage: '0', // No fee for direct recipients
          chain: 'base',
          currency: currencyLower,
          destinationPaymentRail: 'base',
          destinationCurrency: currencyLower,
          destinationAddress: data.address!,
        }

        console.log('Creating recipient with payload:', payload)

        const result = await createRecipientMutation.mutateAsync({
          body: payload,
        })

        console.log('Recipient created successfully:', result)

        // Create compatible recipient object for parent component
        const recipient: DirectWeb3Recipient = {
          id: result.id,
          name: data.recipientName,
          currency: data.currency,
          type: 'direct_web3' as const,
          address: data.address!,
        }

        // Notify parent component
        onRecipientCreated?.(recipient)
        onClose()
      } else {
        // Bridge Recipient type - open CreateLiquidationAddressModal
        setShowLiquidationModal(true)
      }
    } catch (error) {
      console.error('Error creating recipient:', error)
    }
  }

  const renderCurrencyStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose Recipient Currency</h3>
        <p className="text-sm text-gray-600">Select the currency type for your recipient</p>
      </div>

      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CurrencyCode.USD}>USD (Bank Transfer)</SelectItem>
                  <SelectItem value={CurrencyCode.EUR}>EUR (Bank Transfer)</SelectItem>
                  <SelectItem value={CurrencyCode.USDC}>USDC (Direct Web3 - Base)</SelectItem>
                  {/* <SelectItem value={CurrencyCode.USDT}>USDT (Direct Web3 - Base)</SelectItem> */}
                  <SelectItem value={CurrencyCode.EURC}>EURC (Direct Web3 - Base)</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button onClick={handleCurrencyNext} disabled={!selectedCurrency}>
          Next
        </Button>
      </div>
    </div>
  )

  const renderDetailsStep = () => {
    console.log('🔍 renderDetailsStep - selectedCurrency:', selectedCurrency)
    console.log('🔍 renderDetailsStep - CurrencyCode.EURC:', CurrencyCode.EURC)
    console.log('🔍 renderDetailsStep - includes check:', [CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(selectedCurrency))

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Recipient Details</h3>
          <p className="text-sm text-gray-600">
            {[CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(selectedCurrency)
              ? 'Enter recipient name and Base address'
              : 'Enter recipient name (banking details will be configured next)'}
          </p>
        </div>

      <FormField
        control={form.control}
        name="recipientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipient Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter recipient name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(() => {
        const shouldShowAddressField = [CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(selectedCurrency)
        console.log('🔍 Address field condition:', {
          selectedCurrency,
          shouldShowAddressField,
          currencyCodes: { USDC: CurrencyCode.USDC, USDT: CurrencyCode.USDT, EURC: CurrencyCode.EURC }
        })

        return shouldShowAddressField ? (
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{selectedCurrency} Base Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null
      })()}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)} disabled={createRecipientMutation.isPending}>
            {createRecipientMutation.isPending ? 'Creating...' : 'Create Recipient'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog open={isOpen && !showLiquidationModal} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]"  onInteractOutside={(e) => {
          e.preventDefault()
        }}>
          <DialogHeader>
            <DialogTitle>Add Recipient</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-6">{step === 'currency' ? renderCurrencyStep() : renderDetailsStep()}</form>
          </Form>
        </DialogContent>
      </Dialog>

      <CreateLiquidationAddressModal
        isOpen={showLiquidationModal}
        onClose={() => setShowLiquidationModal(false)}
        onPayNow={handleLiquidationAddressCreated}
      />
    </>
  )
}
