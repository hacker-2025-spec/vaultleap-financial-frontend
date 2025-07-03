import { delay, put, SagaGenerator, select, take } from 'typed-redux-saga'

import { vaultsActions } from '@/store/vaults/vaults.slice'
import { vaultsSelectors } from '@/store/vaults/vaults.selectors'

import { SAGA_TRANSACTION_STATUS } from '../../transaction.types'
import { transactionActions, TransactionActions } from '../../transaction.slice'

export function* processVaultsCreationSaga({ payload }: TransactionActions['processVaultsCreation']): SagaGenerator<void> {
  try {
    const { config, router, isPremium } = payload
    const address = config.wallet?.address

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    yield* put(vaultsActions.createVaults({ address: address as string, isPremium }))
    yield* take(vaultsActions.createVaultsSuccess)
    yield* put(transactionActions.nextStage())

    yield* put(vaultsActions.fetchVaultsCreationStatus())
    yield* take(vaultsActions.updateVaultsCreationStatus)
    yield* put(transactionActions.nextStage())

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))
    // yield* put(creatorDataActions.resetPreviousData())

    const vaultsId = yield* select(vaultsSelectors.selectVaultsId)
    yield* put(vaultsActions.fetchVaultsData(vaultsId))
    yield* take(vaultsActions.fetchVaultsDataSuccess)

    yield* delay(4000)
    router.push(`/summary/?vaultsId=${vaultsId}`)
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
