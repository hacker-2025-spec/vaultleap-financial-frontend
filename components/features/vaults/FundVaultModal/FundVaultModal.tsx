import { UserVaultDto } from '@/store/user/user.types'
import { transactionActions } from '@/store/transaction/transaction.slice'
import { useDispatch } from 'react-redux'
import { useWalletConfig } from '@/hooks/useWalletConfig'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Loader2, DollarSign, Percent } from 'lucide-react'

interface Props {
  vault: UserVaultDto
  close: () => void
  balance: number
}

// Define form schema with Zod
const formSchema = z.object({
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .refine(val => val > 0, {
      message: "Amount must be greater than 0",
    }),
  memo: z.string().optional(),
  notifyRecipients: z.boolean().default(true),
})

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>

export const FundVaultModal = ({ vault, close, balance }: Props) => {
  const dispatch = useDispatch()
  const config = useWalletConfig()
  const isLoading = false;
  // Create form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 10,
      memo: '',
      notifyRecipients: true,
    },
  })

  const amount = form.watch('amount')
  const memo = form.watch('memo')

  const totalDeposit = Number((Number(amount) / (1 - vault.vaultFeePercentage / 100)).toFixed(2))
  const isSubmitDisabled = totalDeposit >= balance || totalDeposit <= 0 || isLoading

  const onSubmit = (data: FormValues) => {
    dispatch(
      transactionActions.processSendFundsToVault({
        amount: totalDeposit,
        config,
        vaultAddress: vault.vaultAddress!,
        vaultId: vault.id,
        note: data.memo || '',
      })
    )
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund {vault.projectName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Available to deposit</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={balance.toString()}
                  disabled
                  className="pl-8 bg-muted/50 text-right w-32"
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Fund (USDC)</FormLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        className="pl-8"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memo (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., March Project Payment" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <Label>Transaction fee</Label>
              <div className="relative">
                <Input
                  value={vault.vaultFeePercentage.toString()}
                  disabled
                  className="bg-muted/50 text-right w-32 pr-8"
                />
                <Percent className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Label>Total Deposit</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={totalDeposit.toString()}
                  disabled
                  className="pl-8 bg-muted/50 text-right w-32"
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="notifyRecipients"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Notify Recipients</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitDisabled}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fund Now
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
