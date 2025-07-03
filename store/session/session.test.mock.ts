import type { Auth0Client } from '@auth0/auth0-spa-js'

export const mockAuth0Client = {
  logout: jest.fn(),
  loginWithRedirect: jest.fn(),
  isAuthenticated: jest.fn(),
  handleRedirectCallback: jest.fn(),
  getUser: jest.fn(),
  getTokenSilently: jest.fn(),
  checkSession: jest.fn(),
} as unknown as Auth0Client
