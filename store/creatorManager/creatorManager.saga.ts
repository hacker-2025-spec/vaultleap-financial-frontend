import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { creatorManagerActions } from './creatorManager.slice'
import { initializeBackendProcessingSaga } from './saga/initializeBackendProcessing/initializeBackendProcessing.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(creatorManagerActions.initializeBackendProcessing, initializeBackendProcessingSaga),
  ])
}

export function* creatorManagerSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
