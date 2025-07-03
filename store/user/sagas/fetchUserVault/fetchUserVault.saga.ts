import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { UserActions, userActions } from '../../user.slice'

export function* fetchUserVaultSaga({ payload }: UserActions['fetchUserVault']): SagaGenerator<void> {
  try {
    const vaultData = yield* authorizedApiCall(VaultService.getVaultInfoById, payload.id, payload.role)

    yield* put(userActions.fetchUserVaultSuccess(vaultData))
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserVaultFailed())
  }
}
