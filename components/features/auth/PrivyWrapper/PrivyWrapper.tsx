import { useConfig } from 'wagmi'
import { base } from 'viem/chains'
import { ReactNode } from 'react'

import { ENV_CONFIG } from '@/config/env'
import { PrivyProvider } from '@privy-io/react-auth'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'

export const PrivyWrapper = ({ children }: { children: ReactNode }) => {
  const config = useConfig()
  const chain = config.chains[0] || base

  return (
    <PrivyProvider
      appId={ENV_CONFIG.privyAppId}
      clientId={ENV_CONFIG.privyClientId}
      config={{
        defaultChain: chain,
        supportedChains: [chain],
        appearance: {
          theme: 'light',
          accentColor: '#007FFF',
          showWalletLoginFirst: false,
          loginMessage: 'You will be automatically redirected after successful login',
          walletList: [],
        },
        loginMethods: ['email', 'sms', 'google', 'passkey'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'smartWalletOnly',
          },
        },
      }}
    >
      <SmartWalletsProvider>
        {children}
      </SmartWalletsProvider>
    </PrivyProvider>
  )
}
