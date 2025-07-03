import { useEffect, useState, Suspense, lazy } from 'react'
import { StepperNew } from '@/components/shared/ui/Stepper/StepperNew.component'
import { CurrencyCode } from '@/types/currency'
import {
  AccountType,
  BankAccountType,
  CreateLiquidationAddressModalProps,
  DestinationPaymentRail,
} from './CreateLiquidationAddressModal.types'
import { CurrencyTypeSelector, defaultCurrencyTypeOptions } from './CurrencyTypeSelector'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import countries3To2 from 'i18n-iso-countries'
import { countries } from '@/config/countries'
import { useCreateLiquidationAddressFlow } from '@/api/recipients/recipientMutations'
import { CurrencyOption } from '@/components/features/vaults/CurrencyOption/CurrencyOption'
import { CreateLiquidationAddressModalFormFields } from './CreateLiquidationAddressModal.types'
import { Check, Loader2 } from 'lucide-react'

// Constants for transaction costs
const TRANSACTION_COSTS = {
  // Fiat payment rails
  USD: {
    ACH: { fee: '$0.5', minimum: 1 },
    WIRE: { fee: '$20', minimum: 1 },
    ACH_SAME_DAY: { fee: '$1', minimum: 1 },
  },
  EUR: {
    SEPA: { fee: '$1', minimum: 1 },
  },
  // Crypto payment rails
  USDC: {
    ETHEREUM: { fee: '$1.00 - $1.10', minimum: 1 },
    POLYGON: { fee: '<$0.001', minimum: 1 },
    BASE: { fee: '<$0.001', minimum: 1 },
    ARBITRUM: { fee: '<$0.001', minimum: 1 },
    AVALANCHE: { fee: '<$0.001', minimum: 1 },
    OPTIMISM: { fee: '<$0.001', minimum: 1 },
    SOLANA: { fee: '<$0.001', minimum: 1 },
    STELLAR: { fee: '<$0.001', minimum: 1 },
  },
  USDT: {
    ETHEREUM: { fee: '$1.00 - $1.10', minimum: 2, destinationMinimum: 20 },
    BASE: { fee: '<$0.001', minimum: 1 },
    TRON: { fee: '$2', minimum: 5, destinationMinimum: 5 },
  },
  EURC: {
    BASE: { fee: '<$0.001', minimum: 1 },
    SOLANA: { fee: '<$0.001', minimum: 1 },
  },
}

// Dynamically import dropdown components
const CountryDropdown = lazy(() => import('@/components/ui/country-dropdown'))
const RegionSelect = lazy(() => import('@/components/ui/region-dropdown'))
const CitySelect = lazy(() => import('@/components/ui/city-dropdown'))

// Helper function to convert 3-letter country code to 2-letter code
const convertCountryCode = (alpha3Code: string): string => {
  try {
    return countries3To2.alpha3ToAlpha2(alpha3Code) || alpha3Code
  } catch (error) {
    console.error('Error converting country code:', error)
    return alpha3Code
  }
}

export default function CreateLiquidationAddressModal({ isOpen, onClose, onPayNow }: CreateLiquidationAddressModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [filteredCountries, setFilteredCountries] = useState<
    {
      code: string
      name: string
      eu: boolean
    }[]
  >(countries.filter(({ code }) => code === 'USA'))
  const [step, setStep] = useState(0)
  const [currencyType, setCurrencyType] = useState<'fiat' | 'stablecoin' | ''>('fiat')
  const [shouldSetPaymentRailDefaults, setShouldSetPaymentRailDefaults] = useState(true)

  const { createLiquidationAddressFlow, isLoading, isSuccess, reset } = useCreateLiquidationAddressFlow()
  const [createdRecipient, setCreatedRecipient] = useState<any>(null)

  // Define Zod schema for form validation
  const formSchema = z.object({
    currency: z.nativeEnum(CurrencyCode, {
      errorMap: (issue, ctx) => {
        if (issue.code === 'invalid_enum_value') {
          return { message: 'Please select a currency' }
        }
        return { message: ctx.defaultError }
      },
    }),
    payeeName: z.string().min(1, 'Payee name is required'),
    email: z.string().email('Invalid email address'),
    ethereumAddress: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          if ([CurrencyCode.USDC, CurrencyCode.EURC].includes(currency)) {
            return val && val.startsWith('0x')
          }
          return true
        },
        {
          message: 'Ethereum address should start with 0x',
        }
      ),
    type: z.nativeEnum(BankAccountType).refine(
      (val) => {
        const currency = form.getValues().currency
        // Enforce EUR can only use IBAN bank account type
        if (currency === CurrencyCode.EUR) {
          return val === BankAccountType.IBAN
        }
        // Enforce USD can only use ACH bank account type
        if (currency === CurrencyCode.USD) {
          return val === BankAccountType.ACH
        }
        return true
      },
      {
        message: 'EUR currency requires IBAN bank account type',
      }
    ),
    accountType: z.nativeEnum(AccountType),
    accountOwnerName: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
            return !!val
          }
          return true
        },
        {
          message: 'Account owner name is required',
        }
      ),
    bankName: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
            return !!val
          }
          return true
        },
        {
          message: 'Bank name is required',
        }
      ),
    accountNumber: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const type = form.getValues().type
          // Only require account number for USD currency with ACH type (US transfers)
          if (currency === CurrencyCode.USD && type === BankAccountType.ACH) {
            return val && /^\d{4,17}$/.test(val)
          }
          return true
        },
        {
          message: 'Account number should be 4-17 digits long',
        }
      ),
    routingNumber: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const type = form.getValues().type
          // Only require routing number for USD currency with ACH type (US transfers)
          if (currency === CurrencyCode.USD && type === BankAccountType.ACH) {
            return val && /^\d{9}$/.test(val)
          }
          return true
        },
        {
          message: 'Routing number should be 9 digits long',
        }
      ),
    bankId: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const type = form.getValues().type
          // Only require BIC for EUR currency with IBAN type (SEPA transfers)
          if (currency === CurrencyCode.EUR && type === BankAccountType.IBAN) {
            return val && /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(val)
          }
          return true
        },
        {
          message: 'Invalid bank identifier code',
        }
      ),
    iban: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const type = form.getValues().type
          // Only require IBAN for EUR currency with IBAN type (SEPA transfers)
          if (currency === CurrencyCode.EUR && type === BankAccountType.IBAN) {
            return val && /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(val)
          }
          return true
        },
        {
          message: 'Invalid IBAN',
        }
      ),
    bankCountry: z.string().min(1, 'Bank country is required'),
    holderFirstName: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const type = form.getValues().type
          const accountType = form.getValues().accountType
          // Only require holder names for EUR currency with IBAN type (SEPA transfers)
          if (currency === CurrencyCode.EUR && type === BankAccountType.IBAN && accountType === AccountType.INDIVIDUAL) {
            return !!val
          }
          return true
        },
        {
          message: 'Holder first name is required',
        }
      ),
    holderLastName: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const type = form.getValues().type
          const accountType = form.getValues().accountType
          // Only require holder names for EUR currency with IBAN type (SEPA transfers)
          if (currency === CurrencyCode.EUR && type === BankAccountType.IBAN && accountType === AccountType.INDIVIDUAL) {
            return !!val
          }
          return true
        },
        {
          message: 'Holder last name is required',
        }
      ),
    businessName: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const accountType = form.getValues().accountType
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency) && accountType === AccountType.BUSINESS) {
            return !!val
          }
          return true
        },
        {
          message: 'Business name is required',
        }
      ),
    addressLine1: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
            return !!val
          }
          return true
        },
        {
          message: 'Address Line 1 is required',
        }
      ),
    addressLine2: z.string().optional(),
    city: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
            return !!val
          }
          return true
        },
        {
          message: 'City is required',
        }
      ),
    state: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          const country = form.getValues().country
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency) && country === 'USA') {
            return !!val
          }
          return true
        },
        {
          message: 'State is required for US addresses',
        }
      ),
    country: z.string().min(1, 'Country is required'),
    zip: z
      .string()
      .optional()
      .refine(
        (val) => {
          const currency = form.getValues().currency
          if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
            return !!val
          }
          return true
        },
        {
          message: 'ZIP is required',
        }
      ),
    destinationPaymentRail: z.nativeEnum(DestinationPaymentRail).refine(
      (val) => {
        const currency = form.getValues().currency
        // Enforce EUR can only use SEPA payment rail
        if (currency === CurrencyCode.EUR) {
          return val === DestinationPaymentRail.SEPA
        }
        // Enforce USD cannot use SEPA payment rail
        if (currency === CurrencyCode.USD) {
          return val !== DestinationPaymentRail.SEPA
        }
        return true
      },
      {
        message: 'EUR currency can only use SEPA payment rail',
      }
    ),
  })

  // Create form with Zod validation
  const form = useForm<CreateLiquidationAddressModalFormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: CurrencyCode.USD,
      country: 'USA',
      bankCountry: 'USA',
      type: BankAccountType.ACH,
      accountType: AccountType.INDIVIDUAL,
      destinationPaymentRail: DestinationPaymentRail.ACH,
      state: '', // Initialize state field
      // Initialize other fields to prevent carrying over values
      payeeName: '',
      email: '',
      ethereumAddress: '',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      zip: '',
      accountOwnerName: '',
      iban: '',
      bankId: '',
      businessName: '',
      holderFirstName: '',
      holderLastName: '',
    },
  })

  // Update resolver when step changes
  useEffect(() => {
    form.clearErrors()
    const isCrypto = [CurrencyCode.USDC, CurrencyCode.EURC].includes(form.getValues('currency'))
    form.setFocus(step === 0 ? 'currency' : isCrypto ? 'ethereumAddress' : 'accountNumber')
  }, [step, form])

  // Watch currency to auto-set payment rail and reset step if needed
  useEffect(() => {
    const currentCurrency = form.watch('currency')
    const isCrypto = [CurrencyCode.USDC, CurrencyCode.EURC].includes(currentCurrency)

    // Only set defaults if we should set defaults (when currency type or currency changes)
    if (shouldSetPaymentRailDefaults) {
      if (currentCurrency === CurrencyCode.USD) {
        form.setValue('destinationPaymentRail', DestinationPaymentRail.ACH)
        form.setValue('type', BankAccountType.ACH)
      } else if (currentCurrency === CurrencyCode.EUR) {
        form.setValue('destinationPaymentRail', DestinationPaymentRail.SEPA)
        form.setValue('type', BankAccountType.IBAN)
      } else if (isCrypto) {
        // Always set Base as payment rail for all stablecoins (no user selection needed)
        form.setValue('destinationPaymentRail', DestinationPaymentRail.BASE)
      }
      // Reset the flag after setting defaults
      setShouldSetPaymentRailDefaults(false)
    }

    // Reset to step 2 (Destination) if we're on a step that doesn't exist for crypto currencies
    if (isCrypto && step > 2) {
      setStep(2)
    }
  }, [form.watch('currency'), form, step, shouldSetPaymentRailDefaults, setShouldSetPaymentRailDefaults])

  // Watch form values for conditional logic
  const currency = form.watch('currency')
  const bankAccountType = form.watch('type')
  const accountType = form.watch('accountType')
  const destinationPaymentRail = form.watch('destinationPaymentRail')

  // Dynamic stepper steps based on currency
  const getStepperSteps = (currency: CurrencyCode): { name: string; icon: string }[] => {
    const isCrypto = [CurrencyCode.USDC, CurrencyCode.EURC].includes(currency) // USDC and EURC supported
    const isFiat = [CurrencyCode.USD, CurrencyCode.EUR].includes(currency)

    console.log('🔍 getStepperSteps called:', { currency, isCrypto, isFiat, currencyType })

    if (isCrypto) {
      return [
        { name: 'Currency', icon: '1' },
        { name: 'Payee Info', icon: '2' },
        { name: 'Destination', icon: '3' },
      ]
    }

    // Fiat currencies need banking steps
    if (isFiat) {
      return [
        { name: 'Currency', icon: '1' },
        { name: 'Payee Info', icon: '2' },
        { name: 'Payment Details', icon: '3' },
        { name: 'Address', icon: '4' },
      ]
    }

    // Fallback based on currency type if currency is empty/invalid
    if (currencyType === 'stablecoin') {
      console.log('🔄 Using stablecoin fallback steps')
      return [
        { name: 'Currency', icon: '1' },
        { name: 'Payee Info', icon: '2' },
        { name: 'Destination', icon: '3' },
      ]
    }

    if (currencyType === 'fiat') {
      console.log('🔄 Using fiat fallback steps')
      return [
        { name: 'Currency', icon: '1' },
        { name: 'Payee Info', icon: '2' },
        { name: 'Payment Details', icon: '3' },
        { name: 'Address', icon: '4' },
      ]
    }

    // Final fallback
    console.log('🔄 Using final fallback steps')
    return [
      { name: 'Currency', icon: '1' },
      { name: 'Payee Info', icon: '2' },
    ]
  }

  const stepperSteps = getStepperSteps(currency)

  // Ensure step is always within bounds when stepperSteps changes
  useEffect(() => {
    console.log('🔍 Stepper steps changed:', {
      currency,
      stepperStepsLength: stepperSteps.length,
      currentStep: step,
      stepperSteps: stepperSteps.map((s) => s.name),
    })

    if (step >= stepperSteps.length) {
      const newStep = Math.max(0, stepperSteps.length - 1)
      console.log('🔄 Step out of bounds, resetting from', step, 'to', newStep)
      setStep(newStep)
    }
  }, [stepperSteps.length, step, currency, stepperSteps])

  // Auto-select default currency when currency type changes
  useEffect(() => {
    if (currencyType && !form.getValues('currency')) {
      const defaultCurrency = currencyType === 'fiat' ? CurrencyCode.USD : CurrencyCode.USDC
      console.log('🔄 Auto-selecting default currency:', defaultCurrency, 'for type:', currencyType)
      form.setValue('currency', defaultCurrency)

      if (currencyType === 'stablecoin') {
        form.setValue('destinationPaymentRail', DestinationPaymentRail.BASE)
      }
    }
  }, [currencyType, form])

  // Get transaction cost information
  const getTransactionCost = (
    currency: CurrencyCode,
    paymentRail: DestinationPaymentRail
  ): { fee: string; minimum: number; destinationMinimum?: number } | null => {
    try {
      // Handle fiat currencies
      if (currency === CurrencyCode.USD) {
        const costs = TRANSACTION_COSTS.USD
        if (paymentRail === DestinationPaymentRail.ACH) return costs.ACH
        if (paymentRail === DestinationPaymentRail.WIRE) return costs.WIRE
        if (paymentRail === DestinationPaymentRail.ACH_SAME_DAY) return costs.ACH_SAME_DAY
      }

      if (currency === CurrencyCode.EUR && paymentRail === DestinationPaymentRail.SEPA) {
        return TRANSACTION_COSTS.EUR.SEPA
      }

      // Handle crypto currencies
      if (currency === CurrencyCode.USDC) {
        const costs = TRANSACTION_COSTS.USDC
        if (paymentRail === DestinationPaymentRail.ETHEREUM) return costs.ETHEREUM
        if (paymentRail === DestinationPaymentRail.POLYGON) return costs.POLYGON
        if (paymentRail === DestinationPaymentRail.BASE) return costs.BASE
        if (paymentRail === DestinationPaymentRail.ARBITRUM) return costs.ARBITRUM
        if (paymentRail === DestinationPaymentRail.AVALANCHE) return costs.AVALANCHE
        if (paymentRail === DestinationPaymentRail.OPTIMISM) return costs.OPTIMISM
        if (paymentRail === DestinationPaymentRail.SOLANA) return costs.SOLANA
        if (paymentRail === DestinationPaymentRail.STELLAR) return costs.STELLAR
      }

      if (currency === CurrencyCode.USDT) {
        const costs = TRANSACTION_COSTS.USDT
        if (paymentRail === DestinationPaymentRail.ETHEREUM) return costs.ETHEREUM
        if (paymentRail === DestinationPaymentRail.BASE) return costs.BASE
        if (paymentRail === DestinationPaymentRail.TRON) return costs.TRON
      }

      if (currency === CurrencyCode.EURC) {
        const costs = TRANSACTION_COSTS.EURC
        if (paymentRail === DestinationPaymentRail.BASE) return costs.BASE
        if (paymentRail === DestinationPaymentRail.SOLANA) return costs.SOLANA
      }

      return null
    } catch (error) {
      console.error('Error getting transaction cost:', error)
      return null
    }
  }

  // Handle form submission
  const onSubmit = async (data: CreateLiquidationAddressModalFormFields) => {
    // Only proceed if the form is valid
    if (form.formState.isValid) {
      try {
        const result = await createLiquidationAddressFlow(data)
        setCreatedRecipient(result)
      } catch (error) {
        console.error('Failed to create liquidation address:', error)
      }
    }
  }

  // Handle step navigation
  const nextStep = async () => {
    // Special validation for currency step
    if (step === 0) {
      if (!currencyType) {
        // Show error or prevent navigation
        return
      }
      if (!form.getValues('currency')) {
        // Trigger form validation to show error
        await form.trigger('currency')
        return
      }
    }

    // Validate the current step's fields before proceeding
    const fieldsToValidate = getFieldsForCurrentStep()
    const isStepValid = await validateFields(fieldsToValidate)

    if (isStepValid && step < stepperSteps.length - 1) {
      // Only set default values if they haven't been set by the user
      if (step === 1) {
        // After Payee Info step
        // Only set defaults if the user hasn't already made selections
        if (!form.getValues('type')) {
          form.setValue('type', BankAccountType.ACH)
        }
        if (!form.getValues('accountType')) {
          form.setValue('accountType', AccountType.INDIVIDUAL)
        }
      }

      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      // Simply navigate back without resetting any values
      setStep(step - 1)
    }
  }

  // Helper function to get fields for the current step
  const getFieldsForCurrentStep = (): string[] => {
    switch (step) {
      case 0: // Currency step
        // Validate that both currency type is selected and currency is selected
        if (!currencyType) return []
        return ['currency']
      case 1: // Payee Info step
        return ['payeeName', 'email']
      case 2: // Payment Rail step (fiat) or Destination step (crypto)
        if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
          // Fiat currencies - Payment Rail step
          const fields = ['accountType', 'accountOwnerName', 'bankName', 'destinationPaymentRail']
          if (bankAccountType === BankAccountType.ACH) {
            fields.push('accountNumber', 'routingNumber')
          } else if (bankAccountType === BankAccountType.IBAN) {
            fields.push('bankId', 'iban', 'bankCountry')
            if (accountType === AccountType.BUSINESS) {
              fields.push('businessName')
            }
          }
          return fields
        } else if ([CurrencyCode.USDC, CurrencyCode.EURC].includes(currency)) {
          // Crypto currencies - Destination step (only address needed, payment rail is always Base)
          return ['ethereumAddress']
        }
        return []
      case 3: // Address step (fiat only)
        if ([CurrencyCode.USD, CurrencyCode.EUR].includes(currency)) {
          const fields = ['addressLine1', 'city', 'country', 'zip']
          if (form.watch('country') === 'USA') {
            fields.push('state')
          }
          return fields
        }
        return []
      default:
        return []
    }
  }

  // Validate specific fields
  const validateFields = async (fields: string[]): Promise<boolean> => {
    await form.trigger(fields as any)

    // Check if any of the fields have errors
    const hasErrors = fields.some((field) => !!form.formState.errors[field as keyof CreateLiquidationAddressModalFormFields])
    return !hasErrors
  }

  // Update region and city when country changes
  useEffect(() => {
    const country = form.watch('country')
    if (country) {
      // Only reset region and city if the user is changing the country
      // and not when navigating back to a previous step
      const previousCountry = form.getValues('country')
      if (country !== previousCountry) {
        // If country is not USA, we need a different state format
        if (country !== 'USA') {
          // Only set a default if the state is empty or was previously set for USA
          const currentState = form.getValues('state')
          if (!currentState || currentState === '') {
            form.setValue('state', 'abc')
          }
        }
      }
    }
  }, [form.watch('country'), form])

  // Update city when region changes
  useEffect(() => {
    if (selectedRegion) {
      // Store the current region to avoid unnecessary resets
      const storedRegion = form.getValues('state')

      // Only reset city if the region has actually changed AND we're not just navigating back
      // This prevents losing city selection when navigating between steps
      // We also check if we have a city value to avoid resetting it unnecessarily
      if (selectedRegion !== storedRegion && !form.getValues('city')) {
        form.setValue('city', '')
      }

      // Make sure the region value is always preserved
      if (selectedRegion !== storedRegion && storedRegion !== '') {
        // Update the form's state value to match the selectedRegion
        form.setValue('state', selectedRegion)
      }
    }
  }, [selectedRegion, form])

  // Update filtered countries based on currency
  useEffect(() => {
    if (currency === CurrencyCode.EUR) {
      setFilteredCountries(countries.filter(({ eu }) => eu))
    } else {
      setFilteredCountries(countries)
    }

    // Only set default account type fields if they haven't been set by the user
    if (!form.getValues('accountType')) {
      form.setValue('accountType', AccountType.INDIVIDUAL)
    }
  }, [currency, form])

  // Set default values for payment rail step if not already set
  useEffect(() => {
    // When entering Payment Rail step, ensure defaults are set only if not already set
    if (step === 2) {
      // Only set defaults if the user hasn't already made selections
      if (!form.getValues('accountType')) {
        form.setValue('accountType', AccountType.INDIVIDUAL)
      }
    }
  }, [step, form])

  // Handle success state - call onPayNow callback when successful
  // useEffect(() => {
  //   if (isSuccess && createdRecipient) {
  //     reset()
  //     onClose()
  //     if (onPayNow) {
  //       onPayNow(createdRecipient)
  //     }
  //   }
  // }, [isSuccess, createdRecipient, reset, onClose, onPayNow])

  // Reset form when modal is closed
  const handleModalClose = () => {
    // Reset form to default values
    form.reset({
      currency: CurrencyCode.USD,
      country: 'USA',
      bankCountry: 'USA',
      type: BankAccountType.ACH,
      accountType: AccountType.INDIVIDUAL,
      destinationPaymentRail: DestinationPaymentRail.ACH,
      state: '',
      payeeName: '',
      email: '',
      ethereumAddress: '',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      zip: '',
      accountOwnerName: '',
      iban: '',
      bankId: '',
      businessName: '',
      holderFirstName: '',
      holderLastName: '',
    })
    // Reset currency type selection to fiat (pre-selected)
    setCurrencyType('fiat')
    // Reset step to first step
    setStep(0)
    // Reset selected region for address forms
    setSelectedRegion('')
    // Reset payment rail defaults flag
    setShouldSetPaymentRailDefaults(true)
    // Reset mutation state
    reset()
    onClose()
  }

  // Render all form steps and use CSS to show/hide them
  const renderAllFormSteps = () => {
    return (
      <>
        {/* Currency step */}
        <div className={`space-y-4 ${step === 0 ? 'block' : 'hidden'}`}>
          <CurrencyTypeSelector
            selectedType={currencyType}
            options={defaultCurrencyTypeOptions}
            onOptionClick={(value) => {
              const newCurrencyType = value as 'fiat' | 'stablecoin'
              const isChangingType = currencyType !== newCurrencyType

              console.log('🔍 Currency type change:', {
                from: currencyType,
                to: newCurrencyType,
                isChangingType,
                currentStep: step,
                currentCurrency: form.getValues('currency'),
                willSetCurrency: value === 'fiat' ? 'USD' : 'USDC',
              })

              // Set currency FIRST to prevent empty state
              if (value === 'fiat') {
                // Pre-select USD for fiat (first option)
                form.setValue('currency', CurrencyCode.USD)
              } else if (value === 'stablecoin') {
                // Pre-select USDC for stablecoin (first option) with Base as default payment rail
                form.setValue('currency', CurrencyCode.USDC)
                form.setValue('destinationPaymentRail', DestinationPaymentRail.BASE)
              }

              setCurrencyType(newCurrencyType)
              // Set flag to allow setting defaults when currency changes
              setShouldSetPaymentRailDefaults(true)

              // Reset step to 0 when changing currency type to ensure proper flow
              if (isChangingType && step > 0) {
                console.log('🔄 Resetting step from', step, 'to 0 due to currency type change')
                setStep(0)
              }
            }}
          />

          {currencyType === 'fiat' && (
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Currency</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const previousCurrency = field.value
                        field.onChange(value)
                        // Set flag to allow setting defaults when currency changes
                        setShouldSetPaymentRailDefaults(true)

                        // Reset step if switching between different currency types
                        const wasCrypto = [CurrencyCode.USDC, CurrencyCode.EURC].includes(previousCurrency)
                        const isCrypto = [CurrencyCode.USDC, CurrencyCode.EURC].includes(value as CurrencyCode)

                        if (wasCrypto !== isCrypto && step > 0) {
                          setStep(0)
                        }
                      }}
                      value={
                        field.value || (currencyType === 'fiat' ? CurrencyCode.USD : currencyType === 'stablecoin' ? CurrencyCode.USDC : '')
                      }
                      disabled={!currencyType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={currencyType ? 'Select currency' : 'Select currency type first'} />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyType === 'fiat' && (
                          <>
                            <SelectItem value={CurrencyCode.USD}>
                              <CurrencyOption name="USD - US Dollar" description="ACH, Wire transfers" />
                            </SelectItem>
                            <SelectItem value={CurrencyCode.EUR}>
                              <CurrencyOption name="EUR - Euro" description="SEPA transfers" />
                            </SelectItem>
                          </>
                        )}
                        {currencyType === 'stablecoin' && (
                          <>
                            <SelectItem value={CurrencyCode.USDC}>
                              <CurrencyOption name="USDC - USD Coin" description="Base" />
                            </SelectItem>
                            {/* <SelectItem value={CurrencyCode.USDT}>
                            <CurrencyOption name="USDT - Tether USD" description="Base" />
                          </SelectItem> */}
                            <SelectItem value={CurrencyCode.EURC}>
                              <CurrencyOption name="EURC - Euro Coin" description="Base" />
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Payee Info step */}
        <div className={`space-y-4 ${step === 1 ? 'block' : 'hidden'}`}>
          <FormField
            control={form.control}
            name="payeeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payee Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Account Type step */}
        <div className={`space-y-4 ${step === 2 ? 'block' : 'hidden'}`}>
          {[CurrencyCode.USD, CurrencyCode.EUR].includes(currency) && (
            <>
              <FormField
                control={form.control}
                name="destinationPaymentRail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How do you want to send money?</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            // Auto-set bank account type based on payment rail and currency
                            if (
                              value === DestinationPaymentRail.ACH ||
                              value === DestinationPaymentRail.ACH_SAME_DAY ||
                              value === DestinationPaymentRail.WIRE
                            ) {
                              // US transfers (ACH, ACH Same Day, and Wire) all use routing numbers
                              form.setValue('type', BankAccountType.ACH)
                            } else if (value === DestinationPaymentRail.SEPA) {
                              // Only SEPA transfers use IBAN
                              form.setValue('type', BankAccountType.IBAN)
                            }
                          }}
                          value={field.value === DestinationPaymentRail.ACH_SAME_DAY ? DestinationPaymentRail.ACH : field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select transfer method" />
                          </SelectTrigger>
                          <SelectContent>
                            {currency === CurrencyCode.USD && (
                              <>
                                <SelectItem value={DestinationPaymentRail.ACH}>
                                  <CurrencyOption name="ACH Transfer (US Domestic)" description="Lower cost, 1-2 days" />
                                </SelectItem>
                                <SelectItem value={DestinationPaymentRail.WIRE}>
                                  <CurrencyOption name="Wire Transfer (International)" description="Instant, higher fees, works globally" />
                                </SelectItem>
                              </>
                            )}
                            {currency === CurrencyCode.EUR && (
                              <SelectItem value={DestinationPaymentRail.SEPA}>
                                <CurrencyOption name="SEPA Transfer (European)" description="Low cost, same-day or next-day within EU" />
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>

                        {(field.value === DestinationPaymentRail.ACH || field.value === DestinationPaymentRail.ACH_SAME_DAY) && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="same-day-ach"
                              checked={field.value === DestinationPaymentRail.ACH_SAME_DAY}
                              onCheckedChange={(checked) => {
                                const newValue = checked ? DestinationPaymentRail.ACH_SAME_DAY : DestinationPaymentRail.ACH
                                field.onChange(newValue)
                                // Ensure bank account type stays as ACH for both ACH and ACH_SAME_DAY
                                form.setValue('type', BankAccountType.ACH)
                              }}
                            />
                            <label
                              htmlFor="same-day-ach"
                              className="text-[13px] sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Same-Day ACH (faster processing, higher fees)
                            </label>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => {
                  // Ensure default selection is visible
                  if (!field.value) {
                    field.onChange(AccountType.INDIVIDUAL)
                  }

                  return (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value || AccountType.INDIVIDUAL}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={AccountType.INDIVIDUAL}>Individual</SelectItem>
                            <SelectItem value={AccountType.BUSINESS}>Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="accountOwnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Owner Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {bankAccountType === BankAccountType.ACH && (
                <>
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="routingNumber"
                    render={({ field }) => {
                      const isWire = destinationPaymentRail === DestinationPaymentRail.WIRE
                      const routingLabel = isWire ? 'Wire Routing Number' : 'ACH Routing Number'
                      const routingHelp = isWire
                        ? "Wire routing numbers can differ from ACH - check your bank's wire instructions"
                        : 'Usually found on checks or bank statements'

                      return (
                        <FormItem>
                          <FormLabel>{routingLabel}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="9-digit routing number" maxLength={9} />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">{routingHelp}</p>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </>
              )}

              {bankAccountType === BankAccountType.IBAN && (
                <>
                  <FormField
                    control={form.control}
                    name="bankId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Identifier Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="iban"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Country</FormLabel>
                        <FormControl>
                          <Suspense
                            fallback={
                              <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm animate-pulse" />
                            }
                          >
                            <CountryDropdown
                              onChange={(country) => {
                                // Store the 3-letter code in the form
                                field.onChange(country.alpha3)
                              }}
                              defaultValue={field.value}
                              className="w-full"
                            />
                          </Suspense>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {accountType === AccountType.BUSINESS && (
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Crypto Destination step */}
        <div className={`space-y-4 ${step === 2 ? 'block' : 'hidden'}`}>
          {[CurrencyCode.USDC, CurrencyCode.EURC].includes(currency) && (
            <>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>ERC20 on Base:</strong> All transactions are processed on the Base network for low fees and fast confirmation
                  times.
                </p>
              </div>

              <FormField
                control={form.control}
                name="ethereumAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Onchain Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0x..." />
                    </FormControl>
                    <FormDescription>The onchain address where you want to receive the converted crypto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Address step */}
        <div className={`space-y-4 ${step === 3 ? 'block' : 'hidden'}`}>
          {[CurrencyCode.USD, CurrencyCode.EUR].includes(currency) && (
            <>
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Suspense
                        fallback={
                          <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm animate-pulse" />
                        }
                      >
                        <CountryDropdown
                          onChange={(data) => {
                            // Store the 3-letter code in the form
                            field.onChange(data.alpha3)

                            // Only reset region if the country has actually changed
                            if (field.value !== data.alpha3) {
                              setSelectedRegion('')
                            }
                          }}
                          defaultValue={field.value}
                          className="w-full"
                        />
                      </Suspense>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>State/Region</FormLabel>
                      <FormControl>
                        <Suspense
                          fallback={
                            <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm animate-pulse" />
                          }
                        >
                          <RegionSelect
                            countryCode={convertCountryCode(form.watch('country'))}
                            onChange={(value) => {
                              // Update both the form field and our local state
                              field.onChange(value)

                              // Only update selectedRegion if it's actually changing
                              if (value !== selectedRegion) {
                                setSelectedRegion(value)
                              }
                            }}
                            className="w-full"
                            disabled={!form.watch('country')}
                            value={field.value}
                          />
                        </Suspense>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      {selectedRegion ? (
                        <Suspense
                          fallback={
                            <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm animate-pulse" />
                          }
                        >
                          <CitySelect
                            countryCode={convertCountryCode(form.watch('country'))}
                            regionCode={selectedRegion}
                            onChange={(cityValue) => {
                              // Update the city value without affecting the region
                              field.onChange(cityValue)

                              // Ensure the region value is preserved
                              const currentRegion = form.getValues('state')
                              if (currentRegion !== selectedRegion && selectedRegion) {
                                form.setValue('state', selectedRegion)
                              }
                            }}
                            className="w-full"
                            value={field.value}
                            disabled={!selectedRegion || !form.watch('country')}
                          />
                        </Suspense>
                      ) : (
                        <Input {...field} disabled={!selectedRegion} placeholder="Select a region first" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP / Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!form.watch('city')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
        <DialogContent
          className="sm:max-w-[520px] w-[520px] p-4 sm:p-6 overflow-y-auto max-h-[90vh]"
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Payee</DialogTitle>
          </DialogHeader>

          {isSuccess && createdRecipient ? (
            <div className="flex flex-col items-center justify-center py-6 px-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 shadow-lg">
                <Check className="h-7 w-7 text-green-600" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold">Payee Created Successfully</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your payee has been created and is
                <br /> ready to use.
              </p>
              <div className="mt-8 flex w-full flex-col items-center gap-3 border-t pt-6">
                {/* <Button
                  className="w-4/5"
                  onClick={() => {
                    if (onPayNow) {
                      onPayNow(createdRecipient)
                    }
                    handleModalClose()
                  }}
                >
                  Pay Now
                </Button> */}
                <Button className="w-4/5" variant="outline" onClick={handleModalClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="min-w-1/2 w-fit">
                  <StepperNew steps={stepperSteps} activeStep={step} />
                </div>
                <div className="w-full">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 p-2">
                      {renderAllFormSteps()}
                    </form>
                  </Form>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                  Back
                </Button>
                <Button
                  onClick={async () => {
                    if (step === stepperSteps.length - 1) {
                      // On final step, validate all fields before submission
                      const isValid = await form.trigger()
                      if (isValid) {
                        form.handleSubmit(onSubmit)()
                      }
                    } else {
                      nextStep()
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {step === stepperSteps.length - 1 ? 'Save Payee' : 'Continue'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
