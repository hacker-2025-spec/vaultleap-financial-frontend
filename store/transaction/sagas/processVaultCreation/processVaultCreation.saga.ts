import { delay, put, SagaGenerator, select, take } from 'typed-redux-saga'

import { vaultActions } from '@/store/vault/vault.slice'
import { vaultSelectors } from '@/store/vault/vault.selectors'
import { creatorManagerActions } from '@/store/creatorManager/creatorManager.slice'

import { SAGA_TRANSACTION_STATUS } from '../../transaction.types'
import { transactionActions, TransactionActions } from '../../transaction.slice'

export function* processVaultCreationSaga({ payload }: TransactionActions['processVaultCreation']): SagaGenerator<void> {
  try {
    const { config, router, isPremium } = payload
    const address = config.wallet?.address

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    yield* put(vaultActions.createVault({ address: address as string, isPremium }))
    yield* take(vaultActions.createVaultSuccess)
    yield* put(transactionActions.nextStage())

    yield* put(creatorManagerActions.initializeBackendProcessing({ address: address as string }))
    yield* take(creatorManagerActions.initializeBackendProcessingSuccess)
    yield* put(transactionActions.nextStage())

    yield* put(vaultActions.fetchVaultCreationStatus())
    yield* take(vaultActions.updateVaultCreationStatus)
    yield* put(transactionActions.nextStage())

    yield* put(transactionActions.nextStage())

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))
    // yield* put(creatorDataActions.resetPreviousData())

    const vaultId = yield* select(vaultSelectors.selectVaultId)
    yield* put(vaultActions.fetchVaultData(vaultId))
    yield* take(vaultActions.fetchVaultDataSuccess)

    yield* delay(4000)
    router.push(`/summary/?vaultId=${vaultId}`)
    yield* put(transactionActions.closeModal())
  } catch (error) {
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      console.error(error)
      yield* put(transactionActions.setError(error.message))
    }
    console.log(error)
  }
}
