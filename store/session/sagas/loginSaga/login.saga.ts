import { call, put, select } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { ENV_CONFIG } from '@/config/env'

import { sessionActions } from '../../session.slice'
import type { TAppState } from '../../session.types'
import type { SessionActions } from '../../session.slice'
import { sessionSelectors } from '../../session.selectors'

export function* loginHandler({ payload }: SessionActions['loginStart']): SagaGenerator<void> {
  try {
    const auth0Client = yield* select(sessionSelectors.selectAuth0Client)

    const url = `${ENV_CONFIG.auth0BaseUrl}`
    const { isLogin = true, redirectPathname = '' } = payload || {}

    const returnUrl = url + redirectPathname
    const appState: TAppState = { returnTo: returnUrl }

    yield* call([auth0Client, auth0Client.loginWithRedirect], {
      authorizationParams: {
        scope: 'offline_access',
        screen_hint: isLogin ? 'login' : 'signup',
        redirect_uri: returnUrl.slice(-1) !== '/' ? returnUrl + '/' : returnUrl,
      },
      appState,
    })
  } catch (error) {
    if (error instanceof Error) yield* put(sessionActions.loginError(error.message))
  }
}
