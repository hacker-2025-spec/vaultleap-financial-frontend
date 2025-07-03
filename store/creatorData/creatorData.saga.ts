import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { creatorDataActions } from './creatorData.slice'
import { fetchPreviousDataSaga } from './sagas/fetchPreviousData/fetchPreviousData.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(creatorDataActions.fetchPreviousData, fetchPreviousDataSaga),
  ])
}

export function* creatorDataSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
