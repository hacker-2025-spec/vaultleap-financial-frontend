import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'
import { RecipientOption } from '@/api/recipients/recipientQueries'
import { TokenBalance } from '@/constants/tokens'
import { z } from 'zod'

// Base schema - will be enhanced with dynamic validation in the component
export const paymentFormSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  note: z.string().optional(),
})

export type PaymentFormData = z.infer<typeof paymentFormSchema> & {
  selectedToken?: TokenBalance
}

export interface PaySomeoneModalFormFields {
  amount: number
  recipient: string
  note: string
}

export interface PaymentStep {
  id: string
  name: string
  icon: React.ReactNode
}

export interface PaySomeoneModalProps {
  isOpen: boolean
  onClose: () => void
  recipients: RecipientOption[]
  config: UnitedWalletConfig
  onPaymentConfirmed?: (data: PaymentFormData) => void
  initialValues?: {
    recipient?: string
    amount?: number
    note?: string
    recipientAddress?: string
  }
  onStartLoading?: () => void
  // New props for direct web3 transfers
  isDirectWeb3?: boolean
  directWeb3Data?: {
    recipient: string
    recipientAddress: string
    amount: number
    token: 'USDC' | 'EURC' | 'USDT'
  }
  onDirectWeb3Success?: (transactionHash: string) => void
}
