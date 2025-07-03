import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { SumSubService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions } from '../../user.slice'

export function* fetchSumSubDataSaga(): SagaGenerator<void> {
  try {
    const sumSubData = yield* authorizedApiCall(SumSubService.getToken)

    yield* put(userActions.fetchSumSubDataSuccess(sumSubData))
  } catch (error) {
    yield* put(userActions.fetchSumSubDataFailure())
  }
}
