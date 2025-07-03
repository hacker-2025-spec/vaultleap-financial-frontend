import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'styles/globals.css'
import { store } from './store/store.root'
import { WalletProvider } from './components/features/vaults/WalletProvider/index'
import { PrivyWrapper } from './components/features/auth/PrivyWrapper/index'
import { Toaster } from './components/ui/sonner'
import { NotFound } from '@/components/errors/NotFound'
import { UserDataSyncProvider } from './components/providers/UserDataSyncProvider'
import { WalletAddressProvider } from './components/providers/WalletAddressProvider'
import { UserDataDebug } from './components/debug/UserDataDebug'


import type { RouterContext } from './types/router'
import './api/apiClient.ts'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        // Retry up to 2 times for other errors
        return failureCount < 2
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        // Only retry once for mutations on 5xx errors
        return failureCount < 1
      },
      retryDelay: 1000,
    },
  },
})

// Create a new router instance with queryClient context
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  } as RouterContext,
  defaultNotFoundComponent: NotFound,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <PrivyWrapper>
            <UserDataSyncProvider>
              <WalletAddressProvider>
                <RouterProvider router={router} />
                <Toaster />
                <UserDataDebug />
                <ReactQueryDevtools initialIsOpen={false} />
              </WalletAddressProvider>
            </UserDataSyncProvider>
          </PrivyWrapper>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
