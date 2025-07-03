import type { SagaGenerator } from 'typed-redux-saga'
import { call, put, select, take } from 'typed-redux-saga'

import { RequestStatus } from '@/store/store.types'
import { userActions } from '@/store/user/user.slice'
import { userSelectors } from '@/store/user/user.selectors'
import { walletActions } from '@/store/wallet/wallet.slice'
import { walletSelectors } from '@/store/wallet/wallet.selectors'

import { SessionActions, sessionActions } from '../../session.slice'
import { sessionSelectors } from '../../session.selectors'
import { SessionCustomErrorMessages } from '../../session.const'

export function* initializeSessionHandler({ payload }: SessionActions['initializeSessionStart']): SagaGenerator<void> {
  try {
    const auth0Client = yield* select(sessionSelectors.selectAuth0Client)

    yield* call([auth0Client, auth0Client.checkSession], { detailedResponse: true })

    const isAuthenticated = yield* call([auth0Client, auth0Client.isAuthenticated])

    if (!isAuthenticated) {

      if (payload.unAuthAction) {
        payload.unAuthAction()
        return
      }

      throw new Error(SessionCustomErrorMessages.USER_NOT_AUTHENTICATED)
    }

    yield* put(sessionActions.auth0SessionLoadedSuccess())
    const auth0User = yield* call([auth0Client, auth0Client.getUser])

    if (!auth0User) throw new Error(SessionCustomErrorMessages.USER_DATA_UNDEFINED)
    yield* put(userActions.loadAuth0User(auth0User))

    yield* put(userActions.fetchUserData())

    yield* take([userActions.fetchUserDataSuccess, userActions.fetchUserDataFailed])
    const userDataLoadStatus = yield* select(userSelectors.selectFetchUserDataStatus)
    if (userDataLoadStatus === RequestStatus.Failed) throw new Error(SessionCustomErrorMessages.USER_DATA_UNDEFINED)

    yield* put(walletActions.fetchUserWallets())
    yield* take([walletActions.fetchUserWalletsSuccess, walletActions.fetchUserWalletsFailure])
    const walletDataLoadStatus = yield* select(walletSelectors.selectFetchWalletsStatus)
    if (walletDataLoadStatus === RequestStatus.Failed) throw new Error(SessionCustomErrorMessages.COULD_NOT_FETCH_WALLETS_DATA)

    yield* put(sessionActions.initializeSessionSuccess())
  } catch (error) {
    if (error instanceof Error)
      // When user is not logged in, it will throw error => User is not authenticated
      // Message is hardcoded in Auth0Messages.USER_NOT_AUTHENTICATED

      yield* put(sessionActions.initializeSessionError(error.message))
  }
}
