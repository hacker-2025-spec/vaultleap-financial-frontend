import { put, SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { vaultActions, VaultActions } from '../../vault.slice'

export function* fetchVaultDataSaga({ payload: vaultId }: VaultActions['fetchVaultData']): SagaGenerator<void> {
  try {
    const response = yield* authorizedApiCall(VaultService.getVaultById, vaultId)

    yield* put(vaultActions.fetchVaultDataSuccess(response))
  } catch (error) {
    console.error(error)
  }
}
