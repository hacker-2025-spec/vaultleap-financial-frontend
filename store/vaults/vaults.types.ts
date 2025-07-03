import { VaultsCreatorDto } from '@klydo-io/getrewards-backend-api'

export interface Vaults extends VaultsCreatorDto {}

export type IVaultsState = {
  isReady: boolean,
  isLoading: boolean,
  hasError: boolean,
  data: Vaults
}
