import { ENV_CONFIG } from '@/config/env'

export const getOpenGraphMeta = () => ({
  openGraph: {
    title: 'Vault Leap',
    description:
      'Vaultleap is a smart payment platform for small-medium businesses making USDC payments —simplify payments, automate tax compliance and manage funds, all from one simple dashboard.',
    url: ENV_CONFIG.nextPublicPath,
  },
})
