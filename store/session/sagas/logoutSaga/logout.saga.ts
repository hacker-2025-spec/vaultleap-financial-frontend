import { call, put, select } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { ENV_CONFIG } from '@/config/env'

import { sessionActions } from '../../session.slice'
import { sessionSelectors } from '../../session.selectors'
import { SessionCustomErrorMessages } from '../../session.const'
import { clearIsOnboardingCompleted } from '@/components/features/onboarding/Onboarding/OnboardingModal.helper'

export function* logoutHandler(): SagaGenerator<void> {
  try {
    if (!ENV_CONFIG.auth0BaseUrl) throw new Error(SessionCustomErrorMessages.AUTH0_BASE_URL_MISSING)

    const auth0Client = yield* select(sessionSelectors.selectAuth0Client)

    const url = `${ENV_CONFIG.auth0BaseUrl}/`

    yield* call([auth0Client, auth0Client.logout], { logoutParams: { returnTo: url } })

    yield* put(sessionActions.logoutSuccess())

    clearIsOnboardingCompleted()
  } catch (error) {
    if (error instanceof Error) yield* put(sessionActions.logoutError(error.message))
  }
}
