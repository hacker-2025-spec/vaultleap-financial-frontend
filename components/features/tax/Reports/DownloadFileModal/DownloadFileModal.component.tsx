import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { useDownloadFileModalForm } from './DownloadFileModal.form'
import { DownloadFileModalFormFields, DownloadFileModalComponentProps } from './DownloadFileModal.types'

// Define form schema with Zod
const formSchema = z.object({
  [DownloadFileModalFormFields.SECURITY_CODE]: z.string().min(6, "Security code must be 6 digits").max(6)
})

type FormValues = z.infer<typeof formSchema>

export const DownloadFileModalComponent: React.FC<DownloadFileModalComponentProps> = ({ taxFormId }) => {
  const {
    email,
    isLoading,
    isDownloadDocumentFailed,
  } = useDownloadFileModalForm(taxFormId)

  // Create form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [DownloadFileModalFormFields.SECURITY_CODE]: ''
    },
    mode: 'onChange',
  })

  const onSubmit = (data: FormValues) => {
    // Dispatch the action to download the tax document
    form.handleSubmit((formData) => {
      // Use the existing action from the hook
      const { onSubmit } = useDownloadFileModalForm(taxFormId)
      onSubmit()
    })()
  }

  return (
    <div className="w-full space-y-4">
      <Card className="bg-card">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold text-center mb-4">
            Please enter the 6-digit code sent to {email} to download file
          </h2>

          <Separator className="my-4" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <FormLabel className="text-base font-semibold min-w-24">
                  Security Code
                </FormLabel>

                <FormField
                  control={form.control}
                  name={DownloadFileModalFormFields.SECURITY_CODE}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Enter Security Code"
                          className="text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isDownloadDocumentFailed && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This access code is not correct or has expired. Please request a new code to continue.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center mt-10">
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          size="lg"
          className="font-semibold"
        >
          SUBMIT CODE
        </Button>
      </div>
    </div>
  )
}
