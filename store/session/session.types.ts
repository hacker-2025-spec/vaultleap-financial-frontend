import { RequestStatus } from '../store.types'

export type LogoutStartPayload = {
  redirectPathname: string
}

export type LoginStartPayload = {
  redirectPathname: string
  isLogin?: boolean
}

export interface ISession {
  loginStatus: RequestStatus
  logoutStatus: RequestStatus
  auth0SessionLoaded: RequestStatus
  initializeSessionStatus: RequestStatus
  activateShareholderAccountStatus: RequestStatus
  redirectStatus: RequestStatus
  error: string | null
}

export type TAppState = {
  returnTo: string
  [key: string]: string
}
