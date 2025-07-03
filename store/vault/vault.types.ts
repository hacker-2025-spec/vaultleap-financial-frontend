import { VaultDto } from '@klydo-io/getrewards-backend-api'

export interface Vault extends VaultDto {}

export type IVaultState = {
  isReady: boolean,
  isLoading: boolean,
  hasError: boolean,
  data: Vault
}
