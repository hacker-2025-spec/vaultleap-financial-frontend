import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios'
import useUserStore from '../stores/userStore.ts'
import { createClient, createConfig } from '@hey-api/client-axios'
import { OpenAPI } from '@klydo-io/getrewards-backend-api'
import { ENV_CONFIG } from '../config/env'
import { client as generatedClient } from '@/client/sdk.gen'

export const BASE_URL = ENV_CONFIG.backendUrl
console.log("BASE_URL", BASE_URL)

// Create a properly configured client with baseURL
export const client = createClient(createConfig({
  baseURL: BASE_URL,
}))

// Configure the generated client to use our baseURL
generatedClient.setConfig({
  baseURL: BASE_URL,
})

// Set OpenAPI base URL to match the backend
OpenAPI.BASE = BASE_URL

// Configure interceptors for both our client and the generated client
const requestInterceptor = async function (config: InternalAxiosRequestConfig) {
  try {
    // Get tokens from userStore
    const { isLoggedIn, userToken } = useUserStore.getState()

    if (isLoggedIn && userToken) {
      const { accessToken, privyToken } = userToken

      console.log("API Client: Using tokens from userStore", {
        hasAccessToken: !!accessToken,
        hasPrivyToken: !!privyToken
      })

      if (accessToken && privyToken) {
        // Set Authorization header with access token and identity token
        config.headers = new AxiosHeaders({
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
          'id-token': privyToken,
          'new-auth': 'true',
        })

        // Also set the OpenAPI token for the old API client (for backward compatibility)
        OpenAPI.TOKEN = accessToken

        console.log('API Client: Added tokens to request', {
          url: config.url,
          hasTokens: true,
        })
      } else {
        console.warn('API Client: Missing tokens in userStore', {
          hasAccessToken: !!accessToken,
          hasPrivyToken: !!privyToken
        })
      }
    } else {
      console.log('API Client: User not logged in or no tokens available')
    }
  } catch (error) {
    console.error('API Client: Error getting tokens from userStore:', error)
  }

  return config
}

const responseInterceptor = function (response: any) {
  // Log successful responses for debugging
  console.log('API Client: Successful response', {
    url: response.config?.url,
    status: response.status,
    method: response.config?.method?.toUpperCase(),
  })
  return response
}

const errorInterceptor = function (error: any) {
  // Log all errors for debugging
  console.error('API Client: Request failed', {
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    message: error.message,
  })

  // Handle 401 Unauthorized errors
  if (error.response?.status === 401) {
    console.warn('API Client: 401 Unauthorized - clearing user session')

    // Clear userStore state (this will also clear tokens)
    const { clearUserInfoAndToken } = useUserStore.getState().actions
    clearUserInfoAndToken()

    // Clear localStorage tokens (for backward compatibility)

    // Clear OpenAPI token
    OpenAPI.TOKEN = undefined

    // Note: Navigation should be handled by the component that receives the 401 error
    // We don't navigate here to avoid conflicts with React Router
    console.log('API Client: 401 error handled, component should handle navigation')
  }

  // Handle other HTTP errors
  if (error.response) {
    // Server responded with error status
    const status = error.response.status
    const statusText = error.response.statusText
    const errorData = error.response.data

    if (status >= 400 && status < 500) {
      // Client errors (4xx)
      console.warn(`API Client: Client error ${status} - ${statusText}`, errorData)
    } else if (status >= 500) {
      // Server errors (5xx)
      console.error(`API Client: Server error ${status} - ${statusText}`, errorData)
    }

    // Enhance error object with more details
    error.isHttpError = true
    error.httpStatus = status
    error.httpStatusText = statusText
    error.httpData = errorData
  } else if (error.request) {
    // Network error (no response received)
    console.error('API Client: Network error - no response received', error.request)
    error.isNetworkError = true
  } else {
    // Other error (request setup, etc.)
    console.error('API Client: Request setup error', error.message)
    error.isRequestError = true
  }

  // Always reject the error so React Query can handle it properly
  return Promise.reject(error)
}

// Apply interceptors to both clients
client.instance.interceptors.request.use(requestInterceptor)
client.instance.interceptors.response.use(responseInterceptor, errorInterceptor)

generatedClient.instance.interceptors.request.use(requestInterceptor)
generatedClient.instance.interceptors.response.use(responseInterceptor, errorInterceptor)

export default client
