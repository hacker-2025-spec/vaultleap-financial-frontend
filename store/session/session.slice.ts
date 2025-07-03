import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { RequestStatus, type ActionsType } from '../store.types'
import type { ISession, LoginStartPayload, LogoutStartPayload } from './session.types'

export const initSessionSliceState: ISession = {
  redirectStatus: RequestStatus.Idle,
  logoutStatus: RequestStatus.Idle,
  loginStatus: RequestStatus.Idle,
  initializeSessionStatus: RequestStatus.Idle,
  activateShareholderAccountStatus: RequestStatus.Idle,
  error: null,
  auth0SessionLoaded: RequestStatus.Idle,
}

export const sessionSlice = createSlice({
  reducers: {
    redirectSuccess: (state) => {
      state.redirectStatus = RequestStatus.Succeeded
      return state
    },
    redirectStart: (state, __: PayloadAction<{ router: AppRouterInstance }>) => {
      state.redirectStatus = RequestStatus.Loading
      return state
    },
    redirectError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.redirectStatus = RequestStatus.Failed
      return state
    },
    logoutSuccess: (state) => {
      state.logoutStatus = RequestStatus.Succeeded
      state.loginStatus = RequestStatus.Idle
      state.auth0SessionLoaded = RequestStatus.Idle
      return state
    },
    logoutStart: (state, _: PayloadAction<LogoutStartPayload | undefined>) => {
      state.logoutStatus = RequestStatus.Loading
      return state
    },
    setLogoutStatusLoading: (state) => {
      state.loginStatus = RequestStatus.Loading
      return state
    },
    logoutError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.logoutStatus = RequestStatus.Failed
      return state
    },
    loginSuccess: (state) => {
      state.loginStatus = RequestStatus.Succeeded

      state.logoutStatus = RequestStatus.Idle
      return state
    },
    loginStart: (state, _: PayloadAction<LoginStartPayload | undefined>) => {
      state.loginStatus = RequestStatus.Loading
      return state
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loginStatus = RequestStatus.Failed
      return state
    },
    setLoginStatusLoading: (state) => {
      state.loginStatus = RequestStatus.Loading
      return state
    },
    setLoginStatusIdle: (state) => {
      state.loginStatus = RequestStatus.Idle
      return state
    },
    initializeSessionSuccess: (state) => {
      state.initializeSessionStatus = RequestStatus.Succeeded
      state.loginStatus = RequestStatus.Succeeded
      return state
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initializeSessionStart: (state, action: PayloadAction<{ unAuthAction?: () => void }>) => {
      state.initializeSessionStatus = RequestStatus.Loading
      return state
    },
    initializeSessionPrivyStart: (_, __: PayloadAction<{ isLoggedIn: boolean }>) => {},
    initializeSessionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.initializeSessionStatus = RequestStatus.Failed
      return state
    },
    auth0SessionLoadedSuccess: (state) => {
      state.auth0SessionLoaded = RequestStatus.Succeeded
      return state
    },
  },
  name: StoreKeys.Session,
  initialState: initSessionSliceState,
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
export type SessionActions = ActionsType<typeof sessionActions>
