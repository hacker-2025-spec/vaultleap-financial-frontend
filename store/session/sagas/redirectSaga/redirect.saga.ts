import { call, put, select } from 'typed-redux-saga'

import type { RedirectLoginResult } from '@auth0/auth0-spa-js'

import type { TAppState } from '../../session.types'
import { sessionSelectors } from '../../session.selectors'
import { SessionActions, sessionActions } from '../../session.slice'

export function* redirectHandler({ payload }: SessionActions['redirectStart']) {
  try {
    const { router } = payload
    const auth0Client = yield* select(sessionSelectors.selectAuth0Client)

    const result = yield* call([auth0Client, auth0Client.handleRedirectCallback])

    const { appState } = result as RedirectLoginResult<TAppState>

    yield* call([router, router.push], appState?.returnTo || '/')

    yield* put(sessionActions.redirectSuccess())
    yield* put(sessionActions.initializeSessionStart({}))
  } catch (error) {
    if (error instanceof Error) yield* put(sessionActions.redirectError(error.message))
  }
}
