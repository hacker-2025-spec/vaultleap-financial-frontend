import { VaultsCreationStatus } from '@klydo-io/getrewards-backend-api'
import type { Vaults, IVaultsState } from './vaults.types'

export class VaultsState implements IVaultsState {
  isReady = false
  isLoading = false
  hasError = false
  data: Vaults = {
    id: '',
    auth0Id: '',
    vaults: [],
    creationStatus: VaultsCreationStatus.CREATED
  }
}