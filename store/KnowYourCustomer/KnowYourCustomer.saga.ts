import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'
import { knowYourCustomerActions } from './KnowYourCustomer'
import { confirm } from './saga/confirm.saga'
import { startPolling } from './saga/polling.saga'
import { startTosPolling } from './saga/tosPolling.saga'
import { retry } from './saga/retry.saga'
import { init } from './saga/init.saga'
import { checkKycStatus } from './saga/checkKycStatus.saga'
import { checkTosStatus } from './saga/checkTosStatus.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(knowYourCustomerActions.init, init),
    takeLatest(knowYourCustomerActions.confirm, confirm),
    takeLatest(knowYourCustomerActions.startPolling, startPolling),
    takeLatest(knowYourCustomerActions.startTosPolling, startTosPolling),
    takeLatest(knowYourCustomerActions.retry, retry),
    takeLatest(knowYourCustomerActions.checkKycStatus, checkKycStatus),
    takeLatest(knowYourCustomerActions.checkTosStatus, checkTosStatus),
  ])
}

export function* knowYourCustomerSaga(): SagaGenerator<void> {
  yield* call(actionHandlers)
}