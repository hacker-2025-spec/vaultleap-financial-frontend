import {
  Transaction,
  TRANSACTION_TYPES,
  CREATE_VAULT_STAGES,
  SAGA_TRANSACTION_STATUS,
  TAvailableTransactionStages,
} from './transaction.types'

export class TransactionState implements Transaction {
  isModalOpen: boolean = false
  currentProcessedTransaction: TRANSACTION_TYPES | null = null
  currentStage: TAvailableTransactionStages | null = null
  error: string | null = null
  reaminingStages: TAvailableTransactionStages[] = []
  allStages: CREATE_VAULT_STAGES[] = []
  transactionSucceded: boolean = false
  sagaTransactionStatus: SAGA_TRANSACTION_STATUS = SAGA_TRANSACTION_STATUS.IDLE
}
