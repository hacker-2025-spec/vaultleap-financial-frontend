import { put, SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { claimableVaultsActions, ClaimableVaultsActions } from '../../claimableVaults.slice'

export function* fetchVaultKeysSaga({ payload: walletAddress }: ClaimableVaultsActions['fetchVaultKeys']): SagaGenerator<void> {
  try {
    const response = yield* authorizedApiCall(VaultService.getVaultKeys, walletAddress)

    yield* put(claimableVaultsActions.fetchVaultKeysSuccess(response))
    if (response.length === 0) {
      yield* put(claimableVaultsActions.fetchVaultSuccess({
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }))
    }
  } catch (error) {
    console.error(error)
    yield* put(claimableVaultsActions.fetchVaultKeysFailure())
  }
}
