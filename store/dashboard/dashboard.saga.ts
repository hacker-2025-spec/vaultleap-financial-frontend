import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { dashboardActions } from './dashboard.slice'
import { fetchUserVaultDetailsSaga } from './saga/fetchVaultDetails.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([takeLatest(dashboardActions.fetchVaultDetails, fetchUserVaultDetailsSaga)])
}

export function* dashboardSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
