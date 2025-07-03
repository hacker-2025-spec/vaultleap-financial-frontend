import { CurrencyCode } from '@/types/currency'

export interface AddRecipientModalProps {
  isOpen: boolean
  onClose: () => void
  onRecipientCreated?: (recipient: RecipientData) => void
}

export interface RecipientData {
  id: string
  name: string
  currency: CurrencyCode
  type: 'direct_web3' | 'bridge_recipient'
  address?: string
  liquidationAddressId?: string
}

export interface AddRecipientFormData {
  currency: CurrencyCode
  recipientName: string
  address?: string
}

export type RecipientStep = 'currency' | 'details'
