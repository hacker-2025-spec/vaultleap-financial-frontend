import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createUnifiedAccountMutation,
  createBankingInfoMutation,
  createLiquidationAddressMutation,
  getLiquidationAddressByAuth0IdQueryKey,
  getUnifiedAccountsOptions,
} from '@/client/@tanstack/react-query.gen'
import type { LiquidationAddressEntity, DirectRecipientEntity, CreateUnifiedAccountDto, BankingInfoEntity } from '@/client/types.gen'
import { showToast } from '@/utils/toast'
import { useUserCustomerDetails } from '@/api/user/userQueries'
import {
  AccountType,
  BankAccountType,
  CreateLiquidationAddressModalFormFields,
  DestinationPaymentRail,
} from '@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal.types'
import { DIRECT_VAULT_FEE_PERCENT_NORMAL, DIRECT_VAULT_FEE_PERCENT_PREMIUM } from '@/config/config'
import { CurrencyCode } from '@/types/currency'

// Helper function to split full name into first and last name
const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
  const trimmedName = fullName.trim()
  const nameParts = trimmedName.split(' ')

  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: '' }
  } else if (nameParts.length === 2) {
    return { firstName: nameParts[0], lastName: nameParts[1] }
  } else {
    // For names with more than 2 parts, first word is firstName, rest is lastName
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')
    return { firstName, lastName }
  }
}

// Helper function to map form data to unified account DTO (for crypto currencies only)
const buildUnifiedAccountPayload = (formData: CreateLiquidationAddressModalFormFields, feePercentage: string): CreateUnifiedAccountDto => {
  const isCrypto = [CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(formData.currency)

  // The unified API currently only supports crypto currencies as the source
  if (!isCrypto) {
    throw new Error('Unified API currently only supports crypto currencies (USDC, USDT, EURC) as source currencies')
  }

  // Map destination payment rail from form enum to API enum
  const mapPaymentRail = (rail: DestinationPaymentRail): 'ach' | 'wire' | 'sepa' | 'base' => {
    switch (rail) {
      case DestinationPaymentRail.ACH:
      case DestinationPaymentRail.ACH_SAME_DAY:
        return 'ach'
      case DestinationPaymentRail.WIRE:
        return 'wire'
      case DestinationPaymentRail.SEPA:
        return 'sepa'
      case DestinationPaymentRail.BASE:
      case DestinationPaymentRail.ETHEREUM:
      case DestinationPaymentRail.POLYGON:
      case DestinationPaymentRail.ARBITRUM:
      case DestinationPaymentRail.AVALANCHE:
      case DestinationPaymentRail.OPTIMISM:
      case DestinationPaymentRail.SOLANA:
      case DestinationPaymentRail.STELLAR:
      case DestinationPaymentRail.TRON:
      case DestinationPaymentRail.BTC:
        return 'base'
      default:
        return 'ach'
    }
  }

  // Map destination currency based on payment rail
  const getDestinationCurrency = (): 'usd' | 'eur' | 'usdc' | 'usdt' | 'eurc' => {
    const paymentRail = mapPaymentRail(formData.destinationPaymentRail)

    if (paymentRail === 'base') {
      // For crypto destinations, use the same currency as source
      return formData.currency.toLowerCase() as 'usdc' | 'usdt' | 'eurc'
    } else if (paymentRail === 'sepa') {
      // SEPA transfers are always EUR
      return 'eur'
    } else {
      // ACH and wire transfers are USD
      return 'usd'
    }
  }

  // Determine transfer type based on destination
  const paymentRail = mapPaymentRail(formData.destinationPaymentRail)
  const transferType: 'bridge' | 'direct_web3' = paymentRail === 'base' ? 'direct_web3' : 'bridge'

  const basePayload: CreateUnifiedAccountDto = {
    vaultName: formData.payeeName,
    transferType,
    feePercentage,
    chain: 'base',
    currency: formData.currency.toLowerCase() as 'usdc' | 'usdt' | 'eurc',
    destinationPaymentRail: paymentRail,
    destinationCurrency: getDestinationCurrency(),
  }

  if (isCrypto) {
    // For crypto destinations, add the destination address
    basePayload.destinationAddress = formData.ethereumAddress
  } else {
    // For fiat destinations, add banking info
    const isIndividual = formData.accountType === AccountType.INDIVIDUAL

    if (formData.type === BankAccountType.IBAN) {
      // IBAN banking info
      basePayload.bankingInfo = {
        iban: {
          account_number: formData.iban!,
          bic: formData.bankId!,
          country: formData.bankCountry,
        },
        account_type: 'iban',
        currency: 'eur',
        account_owner_name: isIndividual ? formData.accountOwnerName! : formData.businessName!,
        account_owner_type: isIndividual ? 'individual' : 'business',
        bank_name: formData.bankName!,
        address: {
          street_line_1: formData.addressLine1!,
          street_line_2: formData.addressLine2 || '',
          city: formData.city!,
          state: formData.state,
          postal_code: formData.zip!,
          country: formData.country,
        },
      }
    } else {
      // ACH banking info
      basePayload.bankingInfo = {
        account: {
          account_number: formData.accountNumber!,
          routing_number: formData.routingNumber!,
        },
        currency: 'usd',
        account_owner_name: formData.accountOwnerName!,
        bank_name: formData.bankName!,
        address: {
          street_line_1: formData.addressLine1!,
          street_line_2: formData.addressLine2 || '',
          city: formData.city!,
          state: formData.state,
          postal_code: formData.zip!,
          country: formData.country,
        },
      }
    }
  }

  return basePayload
}

export const useCreateBankingInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...createBankingInfoMutation(),
    mutationKey: ['createBankingInfo'],
    onSuccess: (data: BankingInfoEntity) => {
      console.log('Banking info created successfully:', data)

      // Invalidate banking info queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: [{ _id: 'getBankingInfo' }],
      })

      showToast.success('Banking information created successfully!')
    },
    onError: (error) => {
      console.error('Failed to create banking info:', error)
      showToast.error('Failed to create banking information')
    },
  })
}

export const useCreateLiquidationAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...createLiquidationAddressMutation(),
    mutationKey: ['createLiquidationAddress'],
    onSuccess: (data: LiquidationAddressEntity) => {
      console.log('Liquidation address created successfully:', data)

      // Invalidate liquidation address queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: getLiquidationAddressByAuth0IdQueryKey(),
      })

      // Also invalidate unified recipients cache
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.some((key) => typeof key === 'object' && key !== null && '_id' in key && key._id === 'getUnifiedAccounts')
        },
      })

      showToast.success('Recipient created successfully!')
    },
    onError: (error) => {
      console.error('Failed to create liquidation address:', error)
      showToast.error('Failed to create recipient')
    },
  })
}

export const useCreateUnifiedAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...createUnifiedAccountMutation(),
    mutationKey: ['createUnifiedAccount'],
    onSuccess: async (data: LiquidationAddressEntity | DirectRecipientEntity) => {
      console.log('Unified account created successfully:', data)

      const { queryKey } = getUnifiedAccountsOptions({})
      await queryClient.refetchQueries({ queryKey: queryKey })
      console.log('query key invlidated', queryKey)

      showToast.success('Recipient created successfully!')
    },
    onError: (error) => {
      console.error('Failed to create unified account:', error)
      showToast.error('Failed to create recipient')
    },
  })
}

// Hybrid hook that uses unified API for crypto and old API for fiat currencies
// TODO: Update to use unified API for fiat currencies once the API supports USD/EUR as source currencies
export const useCreateLiquidationAddressFlow = () => {
  const { data: userData } = useUserCustomerDetails()
  const createUnifiedAccountMutation = useCreateUnifiedAccount()
  const createBankingInfoMutation = useCreateBankingInfo()
  const createLiquidationAddressMutation = useCreateLiquidationAddress()

  const createLiquidationAddressFlow = async (formData: CreateLiquidationAddressModalFormFields) => {
    if (!userData?.customer) {
      throw new Error('Customer info does not exist')
    }

    const customer = userData.customer
    const isPremium = userData.isPremium
    const feePercentage = isPremium ? DIRECT_VAULT_FEE_PERCENT_PREMIUM : DIRECT_VAULT_FEE_PERCENT_NORMAL

    // Check if this is a crypto currency
    const isCrypto = [CurrencyCode.USDC, CurrencyCode.USDT, CurrencyCode.EURC].includes(formData.currency)

    if (isCrypto) {
      // For crypto currencies, use the new unified API
      const unifiedAccountPayload = buildUnifiedAccountPayload(formData, feePercentage.toString())

      return await createUnifiedAccountMutation.mutateAsync({
        body: unifiedAccountPayload,
      })
    } else {
      // For fiat currencies, use the old two-step approach
      const isIndividual = formData.accountType === AccountType.INDIVIDUAL
      const { firstName, lastName } = isIndividual ? splitFullName(formData.accountOwnerName!) : { firstName: '', lastName: '' }

      const bankingInfo =
        formData.type === BankAccountType.IBAN
          ? {
              // IBAN account logic
              iban: {
                account_number: formData.iban!,
                bic: formData.bankId!,
                country: formData.bankCountry,
              },
              account_type: 'iban' as const,
              currency: 'eur' as const,
              account_owner_name: isIndividual ? formData.accountOwnerName! : formData.businessName!,
              account_owner_type: isIndividual ? ('individual' as const) : ('business' as const),
              first_name: isIndividual ? firstName : undefined,
              last_name: isIndividual ? lastName : undefined,
              business_name: !isIndividual ? formData.businessName : undefined,
              bank_name: formData.bankName!,
              address: {
                street_line_1: formData.addressLine1!,
                street_line_2: formData.addressLine2 || '',
                city: formData.city!,
                state: formData.state,
                postal_code: formData.zip!,
                country: formData.country,
              },
            }
          : {
              // ACH account logic
              account: {
                account_number: formData.accountNumber!,
                routing_number: formData.routingNumber!,
              },
              currency: 'usd' as const,
              account_owner_name: formData.accountOwnerName!,
              bank_name: formData.bankName!,
              address: {
                street_line_1: formData.addressLine1!,
                street_line_2: formData.addressLine2 || '',
                city: formData.city!,
                state: formData.state,
                postal_code: formData.zip!,
                country: formData.country,
              },
            }

      const bankingInfoPayload = {
        body: {
          bridgeCustomerId: customer.bridgeCustomerId,
          bankingInfo: bankingInfo,
        },
      }

      const bankingInfoResponse = await createBankingInfoMutation.mutateAsync(bankingInfoPayload)

      // Then create liquidation address
      const liquidationAddressPayload = {
        body: {
          percentage: feePercentage.toString(),
          vaultName: formData.payeeName,
          bridgeExternalAccountId: bankingInfoResponse.id,
        },
      }

      return await createLiquidationAddressMutation.mutateAsync(liquidationAddressPayload)
    }
  }

  return {
    createLiquidationAddressFlow,
    isLoading: createUnifiedAccountMutation.isPending || createBankingInfoMutation.isPending || createLiquidationAddressMutation.isPending,
    isSuccess: createUnifiedAccountMutation.isSuccess || createLiquidationAddressMutation.isSuccess,
    error: createUnifiedAccountMutation.error || createBankingInfoMutation.error || createLiquidationAddressMutation.error,
    reset: () => {
      createUnifiedAccountMutation.reset()
      createBankingInfoMutation.reset()
      createLiquidationAddressMutation.reset()
    },
  }
}
