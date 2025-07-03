import { Auth0Client } from '@auth0/auth0-spa-js'

import { ENV_CONFIG } from '@/config/env'

export const auth0Client = () => {
  return new Auth0Client({
    useRefreshTokens: true,
    domain: ENV_CONFIG.auth0Domain,
    clientId: ENV_CONFIG.auth0ClientId,
    cacheLocation: 'localstorage',
    authorizationParams: {
      scope: 'all:user profile email offline_access',
      redirect_uri: ENV_CONFIG.auth0RedirectUri,
      audience: ENV_CONFIG.auth0Audience,
    },
  })
}
