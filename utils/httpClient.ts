/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV_CONFIG } from '@/config/env'
import { walletSharedMethods } from '@/helpers/wallet-shared-methods.helper'
import { sessionSelectors } from '@/store/session/session.selectors'
import { OpenAPI } from '@klydo-io/getrewards-backend-api'
import { getAccessToken } from '@privy-io/react-auth'
import { SagaReturnType } from 'redux-saga/effects'
import { call, select } from 'typed-redux-saga'

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// export function* authorizedApiCall<T, Args extends [], ApiCallFunction>(
//   apiCallFunction: ApiCallFunction,
//   ...args: Args
// ): Generator<any, ReturnType<ApiCallFunction>, any> {
//   try {
//     const auth0Client = yield* select(sessionSelectors.selectAuth0Client)

//     if (typeof window !== 'undefined') {
//       const isAuth = yield* call([auth0Client, auth0Client.isAuthenticated])
//       if (isAuth) {
//         OpenAPI.TOKEN = yield* call([auth0Client, auth0Client.getTokenSilently])
//       }
//     }

//     const response = yield* call(apiCallFunction, ...args)
//   } catch (error) {
//     if (error instanceof Error && error.message === 'Unauthorized') {
//       yield* put(sessionActions.logoutStart())
//     }
//     throw error
//   }
// }

// export function* authorizedApiCall<Fn extends (...args: any[]) => any>(
//   action: Fn,
//   ...args: Parameters<Fn>
// ): Generator<any, SagaReturnType<Fn>, any> {
//   try {
//     const auth0Client = yield* select(sessionSelectors.selectAuth0Client)
//     OpenAPI.BASE = ENV_CONFIG.backendUrl

//     if (typeof window !== 'undefined') {
//       const isAuth = yield* call([auth0Client, auth0Client.isAuthenticated])
//       if (isAuth) {
//         OpenAPI.TOKEN = yield* call([auth0Client, auth0Client.getTokenSilently])
//       }
//     }

//     OpenAPI.HEADERS = {}

//     const response = yield* call(action, ...args)

//     return response
//   } catch (error) {
//     if (error instanceof Error && error.message.includes('Unauthorized')) {
//       yield* put(sessionActions.logoutStart())
//     }
//     throw error
//   }
// }

export function* authorizedApiCall<Fn extends (...args: any[]) => any>(
  action: Fn,
  ...args: Parameters<Fn>
): Generator<any, SagaReturnType<Fn>, any> {
  try {
    // Get the identity token from Privy's localStorage
    const privyIdentityToken = localStorage.getItem('privy:id_token')
    const privyAccessToken = yield* call(getAccessToken)

    const headers: Record<string, string> = {}

    OpenAPI.BASE = ENV_CONFIG.backendUrl

    if (typeof window !== 'undefined' && privyIdentityToken && privyAccessToken) {
      OpenAPI.TOKEN = privyAccessToken
      headers['id-token'] = privyIdentityToken
    }

    headers['new-auth'] = 'true'

    OpenAPI.HEADERS = headers

    const response = yield* call(action, ...args)

    return response
  } catch (error) {
    console.log('Unauthorized')
    if (error instanceof Error && error.message.includes('Unauthorized') && walletSharedMethods.logout) {
        yield* call(walletSharedMethods.logout)
      }
    throw error
  }
}

export function* apiCall<ReposneJson>(...args: [string, MethodType, RequestInit?]): Generator<any, ReposneJson, any> {
  try {
    const urlParam: string = args[0] as string
    const methodParam: MethodType = args[1] as MethodType
    const optionsParam = args[2] || {}

    const auth0Client = yield* select(sessionSelectors.selectAuth0Client)

    const options: RequestInit = {
      ...optionsParam,
      method: methodParam,
    }

    if (typeof window !== 'undefined') {
      const isAuth = yield* call([auth0Client, auth0Client.isAuthenticated])
      if (isAuth) {
        const token = yield* call([auth0Client, auth0Client.getTokenSilently])
        options.headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        }
      }
    }

    const response = yield* call(fetch, `${ENV_CONFIG.backendUrl}/${urlParam}`, options)

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized')
      }
      throw new Error(response.statusText)
    }

    return yield* call([response, response.json])
  } catch (error) {
    // if (error instanceof Error && error.message === 'Unauthorized') {
    //   yield* put(sessionActions.logoutStart())
    // }
    console.log('Unauthorized')
    throw error
  }
}
