import { put, SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions } from '../../user.slice'

export function* watchAllUserVaultsSaga(): SagaGenerator<void> {
  try {
    yield* authorizedApiCall(VaultService.watchAllVaults)
    
    yield* put(userActions.watchAllUserVaultsSuccess())
  } catch (error) {
    console.log(error)
    yield* put(userActions.watchAllUserVaultsFailed())
  }
}
