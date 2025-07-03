'use client'

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { WalletProviderManager } from './WalletProvider.manager'
import type { WalletProviderContainerProps } from './WalletProvider.types'
import { prodConfig } from './config'

// Use the appropriate config based on environment
export const config = prodConfig
const queryClient = new QueryClient()

export const WalletProvider: React.FC<WalletProviderContainerProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <WalletProviderManager>{children}</WalletProviderManager>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
