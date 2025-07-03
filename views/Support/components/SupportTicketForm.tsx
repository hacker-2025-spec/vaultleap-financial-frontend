'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useUserCustomerDetails } from '@/api/user'
import { useFileTicket } from '@/api/support'

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
})

// Define the form values type
type FormValues = z.infer<typeof formSchema>

export const SupportTicketForm: React.FC = () => {
  const { data: customer } = useUserCustomerDetails()
  const fileTicketMutation = useFileTicket()
  const userName = customer?.name
  const userEmail = customer?.email

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName || '',
      email: userEmail || '',
      subject: '',
      message: '',
    },
  })

  const { formState } = form
  const isSubmitting = fileTicketMutation.isPending

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      // Call the real API endpoint
      await fileTicketMutation.mutateAsync({
        body: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      })

      // Reset form fields except name and email
      form.reset({
        name: data.name,
        email: data.email,
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      // Error handling is done in the mutation's onError callback
    }
  }

  return (
    <Card className="flex flex-col gap-6 h-full">
      <CardContent className="flex flex-col gap-6 h-full">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground m-0">File a Support Ticket</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-auto pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto h-11 text-base">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Ticket'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
