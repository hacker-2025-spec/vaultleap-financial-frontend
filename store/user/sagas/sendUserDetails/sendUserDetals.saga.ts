import { put, type SagaGenerator } from 'typed-redux-saga'

import { UserService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions, UserActions } from '../../user.slice'

export function* sendUserDetailsSaga({ payload }: UserActions['sendUserData']): SagaGenerator<void> {
  try {
    console.log('payload', payload)
    const returnData = yield* authorizedApiCall(UserService.updateUserDetails, payload)

    yield* put(userActions.sendUserDataSuccess(returnData))
  } catch (error) {
    console.error(error)
  }
}
