import type { SagaGenerator } from 'typed-redux-saga'
import { put, take } from 'typed-redux-saga'

import { userActions } from '@/store/user/user.slice'
import { SessionActions, sessionActions } from '../../session.slice'
import { SessionCustomErrorMessages } from '../../session.const'

export function* initializeSessionPrivyHandler({ payload: { isLoggedIn } }: SessionActions['initializeSessionPrivyStart']): SagaGenerator<void> {
  try {

    if (!isLoggedIn) {
      throw new Error(SessionCustomErrorMessages.USER_NOT_AUTHENTICATED)
    }

        yield* put(userActions.fetchUserData())

    yield* take([userActions.fetchUserDataSuccess, userActions.fetchUserDataFailed])

    yield* put(sessionActions.initializeSessionSuccess())
  } catch (error) {
    if (error instanceof Error)
      yield* put(sessionActions.initializeSessionError(error.message))
    }
  }
