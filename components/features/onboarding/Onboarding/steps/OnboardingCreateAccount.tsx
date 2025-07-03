'use client'

import { CustomerType } from '@/store/directVaultCreator/directVaultCreator.types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from '@tanstack/react-router'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import type { UserResponseDto } from '@/client/index'
import { useState } from 'react'
import 'styles/toggle.css' // Make sure to import the CSS file

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  type: z.nativeEnum(CustomerType),
  tosAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service',
  }),
  developerTosAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must agree to Bridge Terms of Service',
  }),
})

// Define the form values type
type FormValues = z.infer<typeof formSchema>

interface Props {
  onSubmit: (params: FormValues) => Promise<void>
  userData?: UserResponseDto
}

export const OnboardingCreateAccount = ({ onSubmit, userData }: Props) => {
  const email = userData?.email || ''

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: email,
      type: CustomerType.INDIVIDUAL,
      tosAccepted: true,
      developerTosAccepted: true,
    },
  })

  // Watch form values for dynamic UI updates
  const formValues = form.watch()

  const [toggleState, setToggleState] = useState<CustomerType>(CustomerType.INDIVIDUAL)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleFormSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggle = (value: CustomerType) => {
    setToggleState(value)
    form.setValue('type', value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-2 justify-between items-center">
          <FormLabel>Account type</FormLabel>
          <FormField
            control={form.control}
            name="type"
            render={({ field: _field }) => (
              <FormItem>
                <FormControl>
                  <div className="custom-toggle" data-state={toggleState === CustomerType.BUSINESS ? 'business' : 'individual'}>
                    <div
                      className="custom-toggle-item"
                      data-state={toggleState === CustomerType.INDIVIDUAL ? 'active' : 'inactive'}
                      onClick={() => handleToggle(CustomerType.INDIVIDUAL)}
                    >
                      Individual
                    </div>
                    <div
                      className="custom-toggle-item"
                      data-state={toggleState === CustomerType.BUSINESS ? 'active' : 'inactive'}
                      onClick={() => handleToggle(CustomerType.BUSINESS)}
                    >
                      Business
                    </div>
                    <div className="custom-toggle-slider"></div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formValues.type === CustomerType.INDIVIDUAL ? 'Full Name' : 'Business Full Legal Name'}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={formValues.type === CustomerType.INDIVIDUAL ? 'John Doe' : 'John Doe LLC'}
                  className="placeholder:text-muted-foreground/50"
                />
              </FormControl>
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
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="mt-6">
          <FormField
            control={form.control}
            name="tosAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Switch checked={field.value} color="green" onCheckedChange={field.onChange} />
                </FormControl>
                <div className="text-sm">
                  I agree to Klydo's{' '}
                  <Link to="/terms-of-service" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <FormField
            control={form.control}
            name="developerTosAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Switch checked={field.value} color="green" onCheckedChange={field.onChange} />
                </FormControl>
                <div className="text-sm">This application uses Bridge to securely connect accounts and move funds.</div>
              </FormItem>
            )}
          />
          <div className="text-sm text-muted-foreground mt-2">
            By clicking on Create Account, you agree to Bridge's{' '}
            <a href="https://bridge.xyz/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="https://bridge.xyz/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={isSubmitting || !form.formState.isValid} className="w-full">
            {isSubmitting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
