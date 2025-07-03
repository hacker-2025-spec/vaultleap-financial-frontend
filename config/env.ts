/// <reference types="vite/client" />

export type TEnvironment = 'local' | 'stage' | 'production'

export type TEnvConfig = {
  nextPublicPath: string
  environment: TEnvironment
  auth0RedirectUri: string
  auth0Domain: string
  auth0ClientId: string
  auth0BaseUrl: string
  auth0Audience: string
  backendUrl: string
  walletConnectProjectId: string
  privyAppId: string
  privyClientId: string
  bundlerRpc: string
  paymasterPolicyId: string
}

export const ENV_CONFIG: TEnvConfig = {
  nextPublicPath: import.meta.env.VITE_NEXT_PUBLIC_PATH ?? 'https://stage.vaultleap.com',
  environment: (import.meta.env.VITE_ENVIRONMENT ?? 'stage') as TEnvironment,
  auth0RedirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI ?? 'https://stage.vaultleap.com',
  auth0Domain: import.meta.env.VITE_AUTH0_ISSUER_BASE_URL ?? 'https://dev-i30bktnwxomv4ur8.us.auth0.com',
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? '2nxCqB14JWhs6fUGuoJoJRSV2kbhhOHG',
  auth0BaseUrl: import.meta.env.VITE_AUTH0_BASE_URL ?? 'http://localhost:80',
  auth0Audience: import.meta.env.VITE_AUTH0_API_AUDIENCE ?? 'https://stage.vaultleap.com',
  backendUrl: import.meta.env.VITE_BACKEND_URL ?? 'https://stage-api.vaultleap.com',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ?? '8cff1fdde4ba8fa36fb478bab00c29e4',
  privyAppId: import.meta.env.VITE_PRIVY_APP_ID ?? 'cm8sjipsp006ael81uo63qf2f',
  privyClientId: import.meta.env.VITE_PRIVY_CLIENT_ID ?? 'client-WY5i4HAMGoXVJocoP1X22sW3PmQr7TyecrC1u3SCwoJ6s',
  bundlerRpc: import.meta.env.VITE_BUNDLER_RPC ?? 'https://arb-sepolia.g.alchemy.com/v2/ctVRdio4bXLULKofh4dkXiSSSvNztmsH',
  paymasterPolicyId: import.meta.env.VITE_PAYMASTER_POLICY_ID ?? 'a804cd7d-8057-4628-bcf6-795b4e89deee',
}
console.log('Backend url', ENV_CONFIG)
