import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import {
  getUnifiedAccountsOptions,
  createUnifiedAccountMutation
} from '@/client/@tanstack/react-query.gen'
import type { DirectRecipientEntity, LiquidationAddressEntity } from '@/client/types.gen'
import { showToast } from '@/utils/toast'
import { useIsLoggedIn } from '@/stores/userStore'

// Unified recipient type that combines both direct and bridge recipients
export type UnifiedRecipient = (DirectRecipientEntity | LiquidationAddressEntity) & {
  transferType: 'direct_web3' | 'bridge'
}

// UI-ready recipient option for dropdowns
export interface RecipientOption {
  value: 'direct' | 'new' | string
  label: string
  hidden?: boolean
  currency?: string
  type?: 'direct_web3' | 'bridge_recipient'
  address?: string
  id?: string
}

// Main hook - the only one you should use for recipients
export const useRecipients = (options?: { savedOnly?: boolean }) => {
  const { savedOnly = false } = options || {}

  const { data: unifiedData, isLoading, error } = useQuery({
    ...getUnifiedAccountsOptions(),
    select: (data: any) => data || { bridgeAccounts: [], directRecipients: [] }
  })

  const directRecipients = unifiedData?.directRecipients || []
  const bridgeRecipients = unifiedData?.bridgeAccounts || []

  // Combine and normalize both types
  const allRecipients: UnifiedRecipient[] = useMemo(() => [
    ...directRecipients.map((recipient: DirectRecipientEntity) => ({
      ...recipient,
      transferType: 'direct_web3' as const
    })),
    ...bridgeRecipients.map((recipient: LiquidationAddressEntity) => ({
      ...recipient,
      transferType: 'bridge' as const
    }))
  ], [directRecipients, bridgeRecipients])

  // UI-ready recipient options for dropdowns
  const recipientOptions: RecipientOption[] = useMemo(() => {
    // Map direct Web3 recipients
    const directOptions = directRecipients.map((recipient: DirectRecipientEntity) => ({
      value: recipient.id,
      label: `${recipient.vaultName} (${recipient.currency.toUpperCase()})`,
      currency: recipient.currency.toUpperCase(),
      type: 'direct_web3' as const,
      address: recipient.destinationAddress,
      id: recipient.id
    }))
    console.log("directOptions", directOptions)



    // Map bridge recipients (liquidation addresses)
    const bridgeOptions = bridgeRecipients.map((recipient: LiquidationAddressEntity) => ({
      value: recipient.id,
      label: `${recipient.vault_name} (${recipient.currency.toUpperCase()} → ${recipient.destination_currency.toUpperCase()})`,
      currency: recipient.destination_currency.toUpperCase(),
      type: 'bridge_recipient' as const,
      id: recipient.id
    }))

    return [
      {
        label: '-- Choose an option --',
        value: '',
        hidden: true,
      },
      ...directOptions,
      ...bridgeOptions,
      ...(savedOnly ? [] : [
        {
          label: 'Direct Web3 Address (USDC)',
          value: 'direct',
          currency: 'USDC',
          type: 'direct_web3' as const,
        },
        {
          label: 'New recipient',
          value: 'new',
        }
      ]),
    ]
  }, [directRecipients, bridgeRecipients, savedOnly])

  console.log(recipientOptions, directRecipients, bridgeRecipients, "RECEIPT")

  return {
    // UI-ready data
    recipients: recipientOptions,

    // Raw data for advanced use cases
    allRecipients,
    directRecipients,
    bridgeRecipients,

    // Status
    isLoading,
    error,

    // Helper functions
    getRecipientById: (id: string) => allRecipients.find(r => r.id === id),
    getDirectRecipients: () => directRecipients,
    getBridgeRecipients: () => bridgeRecipients,
  }
}

// Legacy hook for backward compatibility - use useRecipients() instead
export const useAllRecipients = () => {
  const { allRecipients, directRecipients, bridgeRecipients, isLoading, error } = useRecipients()

  return {
    data: allRecipients,
    isLoading,
    error,
    directRecipients,
    bridgeRecipients
  }
}

// Get recipient by ID (works for both types)
export const useRecipientById = (id: string) => {
  const { getRecipientById, isLoading, error } = useRecipients()

  return {
    data: getRecipientById(id) || null,
    isLoading,
    error
  }
}

// Legacy liquidation addresses hook - use useRecipients() instead
// This is just bridge recipients with the old API structure
export const useLiquidationAddresses = () => {
  const isLoggedIn = useIsLoggedIn()
  const { bridgeRecipients, isLoading, error } = useRecipients()

  return {
    data: bridgeRecipients,
    isLoading: !isLoggedIn ? false : isLoading,
    error: !isLoggedIn ? null : error,
    // Legacy properties for backward compatibility
    isSuccess: !isLoading && !error,
    isFetching: isLoading,
  }
}

// Create unified recipient (handles both direct web3 and bridge)
export const useCreateRecipient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...createUnifiedAccountMutation(),
    onSuccess: async (data: DirectRecipientEntity | LiquidationAddressEntity, variables) => {
      console.log('Recipient created successfully:', data)

      // Invalidate all unified accounts queries using the correct query key structure
      // The generated query keys use objects with _id property, not simple strings
      await queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.some(key =>
            typeof key === 'object' &&
            key !== null &&
            '_id' in key &&
            key._id === 'getUnifiedAccounts'
          )
        }
      })

      // Force refetch to ensure immediate update
      await queryClient.refetchQueries({
        predicate: (query) => {
          return query.queryKey.some(key =>
            typeof key === 'object' &&
            key !== null &&
            '_id' in key &&
            key._id === 'getUnifiedAccounts'
          )
        }
      })

      console.log('Cache invalidated and refetched for recipients using correct query key structure')

      // Determine success message based on transfer type
      const transferType = (variables as any)?.body?.transferType
      const recipientType = transferType === 'direct_web3' ? 'Direct Web3' : 'Bridge'

      showToast.success(`${recipientType} recipient created successfully!`)
    },
    onError: (error) => {
      console.error('Failed to create recipient:', error)
      showToast.error('Failed to create recipient')
    },
  })
}
