import { createSelector } from '@reduxjs/toolkit'
import { Auth0Client } from '@auth0/auth0-spa-js'

import { ENV_CONFIG } from '@/config/env'

import { StoreKeys } from '../store.keys'
import { RequestStatus } from '../store.types'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.Session)], (state) => state)

const selectAuth0Client = createSelector([selectState], () => {
  const auth0Client = new Auth0Client({
    useRefreshTokens: true,
    domain: ENV_CONFIG.auth0Domain,
    clientId: ENV_CONFIG.auth0ClientId,
    cacheLocation: 'localstorage',
    authorizationParams: {
      scope: 'all:user profile email offline_access',
      redirect_uri: ENV_CONFIG.auth0RedirectUri,
      audience: ENV_CONFIG.auth0Audience,
    },
  })
  return auth0Client
})

const selectIsLoggedIn = createSelector([selectState], (state) => state.loginStatus === RequestStatus.Succeeded)

const selectIsSessionLoading = createSelector([selectState], (state) => state.initializeSessionStatus === RequestStatus.Loading || state.initializeSessionStatus === RequestStatus.Idle)
const selectIsSessionFailed = createSelector([selectState], (state) => state.initializeSessionStatus === RequestStatus.Failed)
const selectIsSessionLoadedSuccessful = createSelector([selectState], (state) => state.initializeSessionStatus === RequestStatus.Succeeded)

const isAuth0SessionLoaded = createSelector([selectState], (state) => state.auth0SessionLoaded === RequestStatus.Succeeded)

const selectLogoutStatus = createSelector([selectState], (state) => state.logoutStatus)

const selectIsSessionLoaded = createSelector(
  [selectState],
  (state) => state.initializeSessionStatus !== RequestStatus.Loading && state.initializeSessionStatus !== RequestStatus.Idle
)

const selectSessionInitializationStatus = createSelector([selectState], (session) => {
  return session.initializeSessionStatus
})

export const sessionSelectors = {
  selectSessionInitializationStatus,
  selectLogoutStatus,
  selectIsSessionLoading,
  selectIsSessionLoadedSuccessful,
  selectIsSessionLoaded,
  selectIsSessionFailed,
  selectIsLoggedIn,
  selectAuth0Client,
  isAuth0SessionLoaded,
}
