/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string
  readonly VITE_NEXT_PUBLIC_PATH: string
  readonly VITE_NEXT_PUBLIC_RPC_URL: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_AUTH0_REDIRECT_URI: string
  readonly VITE_AUTH0_ISSUER_BASE_URL: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_AUTH0_BASE_URL: string
  readonly VITE_AUTH0_API_AUDIENCE: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
  readonly VITE_PRIVY_APP_ID: string
  readonly VITE_PRIVY_CLIENT_ID: string
  readonly VITE_BASESCAN_API_KEY: string
  readonly VITE_ALCHEMY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
