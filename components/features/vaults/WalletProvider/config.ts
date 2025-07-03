import { createConfig, http } from 'wagmi'
import { getDefaultConfig } from 'connectkit'
import { base, baseSepolia, mainnet } from 'viem/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'

export const stageConfig = createConfig(
  getDefaultConfig({
    appName: 'Vaultleap',
    appIcon: 'https://app.vaultleap.com/images/vaulty.png',
    chains: [baseSepolia],
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ?? '',
    connectors: [
      coinbaseWallet({
        appName: 'Vaultleap',
        appLogoUrl: 'https://app.vaultleap.com/images/vaulty.png',
        chainId: baseSepolia.id,
        preference: 'all',
      }),
      injected({ target: 'metaMask', shimDisconnect: false }),
    ],
  })

)

export const prodConfig = createConfig(
  getDefaultConfig({
    appName: 'Vaultleap',
    appIcon: 'https://app.vaultleap.com/images/vaulty.png',
    chains: [base],
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ?? '',
    connectors: [
      coinbaseWallet({
        appName: 'Vaultleap',
        appLogoUrl: 'https://app.vaultleap.com/images/vaulty.png',
        chainId: base.id,
        preference: 'all',
      }),
      injected({ target: 'metaMask', shimDisconnect: false }),
    ],
  })
)
