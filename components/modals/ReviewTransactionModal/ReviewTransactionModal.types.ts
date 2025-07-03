export interface ReviewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  initialData?: {
    amount: number
    recipient: string
    recipientAddress?: string
    token?: 'USDC' | 'EURC' | 'USDT'
  }
}

export type ModalStep = 'review' | 'sending' | 'success' | 'error'

export interface TransactionData {
  amount: number
  recipient: string
  recipientAddress: string
  note?: string
  token: 'USDC' | 'EURC' | 'USDT'
}

export interface TransactionResult {
  transactionHash: string
  userOperationHash?: string
}
