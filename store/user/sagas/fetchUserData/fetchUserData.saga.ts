import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { UserService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions } from '../../user.slice'

export function* fetchUserDataSaga(): SagaGenerator<void> {
  try {
    const userDataResponse = yield* authorizedApiCall(UserService.getMe)

    console.log("fetchUserDataSaga - userDataResponse:", userDataResponse)
    console.log("fetchUserDataSaga - bridgeKyc:", userDataResponse.bridgeKyc)

    yield* put(userActions.fetchUserDataSuccess(userDataResponse))
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserDataFailed())
  }
}
