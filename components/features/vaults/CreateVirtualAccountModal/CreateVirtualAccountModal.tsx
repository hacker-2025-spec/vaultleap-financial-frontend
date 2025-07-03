import { useState, useEffect } from 'react'
import { CurrencyCode } from '@/types/currency'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreateVirtualAccountModalProps } from './CreateVirtualAccountModal.types'
import { useCreateVirtualAccount } from '@/api/virtual-accounts'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import { CheckCircle, Loader } from 'lucide-react'
import { VIRTUAL_ACCOUNT_FEE_PERCENT_NORMAL, VIRTUAL_ACCOUNT_FEE_PERCENT_PREMIUM } from '@/config/config'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'

export default function CreateVirtualAccountModal({
  isOpen,
  onClose,
  preferredCurrency,
}: CreateVirtualAccountModalProps) {

  const createVirtualAccount = useCreateVirtualAccount()
  const { data: userData } = useUserCustomerDetails()
  const { smartWalletAddress } = usePrivySmartWallet()
  console.log("re-rendering")

  const processing = createVirtualAccount.isPending
  const succeed = createVirtualAccount.isSuccess
  const customer = userData?.customer
  const isPremium = userData?.isPremium || false

  // Define form schema with Zod
  const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    currency: z.nativeEnum(CurrencyCode),
  })

  // Create form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
        name: 'My Euro Account',
      currency: preferredCurrency || CurrencyCode.EUR,
    },
    resolver: zodResolver(formSchema),
  })

  // Handle dialog open/close
  useEffect(() => {
    // Set open state based on isOpen prop

    // Reset mutation state and form when modal opens
    if (isOpen) {
      createVirtualAccount.reset()
      // Reset form with preferred currency if provided
      form.reset({
        name: 'My Euro Account',
        currency: preferredCurrency || CurrencyCode.EUR,
      })
    }
  }, [])

  // Auto-close modal when account is successfully created
  useEffect(() => {
    if (succeed) {
      // Close modal immediately after successful creation
      onClose()
    }
  }, [succeed, onClose])

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!customer?.bridgeCustomerId || !smartWalletAddress) {
      return
    }

    try {
      await createVirtualAccount.mutateAsync({
        body: {
          bridgeCustomerId: customer.bridgeCustomerId,
          vaultName: data.name,
          virtualAccountData: {
            source: {
              currency: data.currency.toLowerCase() as 'usd' | 'eur',
            },
            destination: {
              payment_rail: 'base',
              address: smartWalletAddress,
              currency: 'usdc',
            },
            developer_fee_percent: (isPremium ? VIRTUAL_ACCOUNT_FEE_PERCENT_PREMIUM : VIRTUAL_ACCOUNT_FEE_PERCENT_NORMAL).toString(),
          },
        },
      })
    } catch (error) {
      console.error('Failed to create virtual account:', error)
      // Error handling is done by the mutation's onError callback
    }
  }

  // Handle dialog close
  const handleClose = () => {
    onClose()
  }

  // Handle back to dashboard click
  const handleBackToDashboardClick = () => {
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose()
      }}
    >
      <DialogContent className="create-virtual-account-modal sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Euro Account</DialogTitle>
        </DialogHeader>

        {!succeed ? (
          <>
            <div className="py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} disabled={processing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            <DialogFooter>
              <Button onClick={form.handleSubmit(onSubmit)} disabled={processing}>
                {processing ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="create-virtual-account-modal__success flex flex-col items-center justify-center py-8">
            <div className="create-virtual-account-modal__success--check mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Deposit Account Created Successfully</h3>
            <p className="text-center mb-6">Your deposit account has been created and is now available for payments.</p>
            <div className="create-virtual-account-modal__success--actions">
              <Button variant="ghost" onClick={handleBackToDashboardClick}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
