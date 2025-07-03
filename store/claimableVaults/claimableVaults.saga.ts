import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { claimableVaultsActions } from './claimableVaults.slice'
import { fetchVaultSaga } from './saga/fetchVault/fetchVault.saga'
import { fetchVaultKeysSaga } from './saga/fetchVaultKeys/fetchVaultKeys.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(claimableVaultsActions.fetchVaultKeys, fetchVaultKeysSaga),
    takeLatest(claimableVaultsActions.fetchVault, fetchVaultSaga),
  ])
}

export function* claimableVaultsSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
