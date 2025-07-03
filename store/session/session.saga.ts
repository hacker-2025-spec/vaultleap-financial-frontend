import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { sessionActions } from './session.slice'
import { loginHandler } from './sagas/loginSaga/login.saga'
import { logoutHandler } from './sagas/logoutSaga/logout.saga'
import { redirectHandler } from './sagas/redirectSaga/redirect.saga'
import { initializeSessionHandler } from './sagas/sessionInitSaga/sessionInit.saga'
import { initializeSessionPrivyHandler } from './sagas/sessionInitPrivySaga/sessionInitPrivy.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(sessionActions.redirectStart.type, redirectHandler),
    takeLatest(sessionActions.initializeSessionStart.type, initializeSessionHandler),
    takeLatest(sessionActions.initializeSessionPrivyStart.type, initializeSessionPrivyHandler),
    takeLatest(sessionActions.loginStart.type, loginHandler),
    takeLatest(sessionActions.logoutStart.type, logoutHandler),
  ])
}

export function* sessionSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
