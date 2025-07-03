import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { UserActions, userActions } from '../../user.slice'

export function* unwatchUserVaultSaga({ payload }: UserActions['unwatchUserVault']): SagaGenerator<void> {
  try {
    yield* authorizedApiCall(VaultService.unwatchVault, payload.id, payload.role)

    yield* put(userActions.fetchUserVaults())
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserVaultsFailed())
  }
}
