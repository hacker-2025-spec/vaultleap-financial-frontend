'use client'

import { userActions } from '@/store/user/user.slice'
import { useDispatch, useSelector } from 'react-redux'
import { userSelectors } from '@/store/user/user.selectors'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Define the form schema with Zod
const formSchema = z.object({
  securityCode: z.string()
    .min(6, { message: 'Security code must be 6 digits' })
    .max(6, { message: 'Security code must be 6 digits' })
    .regex(/^\d+$/, { message: 'Security code must contain only digits' })
})

// Define the form values type
type FormValues = z.infer<typeof formSchema>

interface Props {
  close: () => void
  taxFormId: string
  open?: boolean
}

export const RequestTaxFormModal = ({ close, taxFormId, open = true }: Props) => {
  const dispatch = useDispatch()
  const email = useSelector(userSelectors.selectUserEmailTruncated)
  const isLoading = useSelector(userSelectors.selectIsDownloadDocumentLoading)
  const isError = useSelector(userSelectors.selectIsDownloadDocumentFailed)

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      securityCode: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: FormValues) => {
    dispatch(userActions.downloadTaxDocument({
      taxFormId,
      securityCode: data.securityCode
    }))
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tax Form Access</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Please enter the 6-digit code sent to {email} to download file:
          </p>

          {isError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This access code is not correct or has expired. Please request a new code to continue.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="securityCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Security Code"
                        disabled={isLoading}
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Code'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
