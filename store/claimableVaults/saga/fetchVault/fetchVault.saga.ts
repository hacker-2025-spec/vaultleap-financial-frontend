import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { claimableVaultsActions, ClaimableVaultsActions } from '../../claimableVaults.slice'

export function* fetchVaultSaga({ payload }: ClaimableVaultsActions['fetchVault']): SagaGenerator<void> {
  try {
    const vaultData = yield* authorizedApiCall(VaultService.getVaultInfoByIdAndTokenId, payload.id, payload.tokenId)

    yield* put(claimableVaultsActions.fetchVaultSuccess(vaultData))
  } catch (error) {
    console.log(error)
    yield* put(claimableVaultsActions.fetchVaultFailed())
  }
}
