import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'
import { claimFundsSaga } from './sagas/claimFunds/claimFunds.saga'
import { transferVaultKeysSaga } from './sagas/transferVaultKeys/transferVaultKeys.saga'
import { withdrawFundsSaga } from './sagas/withdrawFunds/withdrawFunds.saga'
import { web3Actions } from './web3.slice'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(web3Actions.claimFundsTrigger.type, claimFundsSaga),
    takeLatest(web3Actions.transferVaultKeysTrigger.type, transferVaultKeysSaga),
    takeLatest(web3Actions.withdrawFundsTrigger.type, withdrawFundsSaga),
  ])
}

export function* web3Saga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
