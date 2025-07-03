import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { vaultActions } from './vault.slice'
import { createVaultSaga } from './saga/createVault/createVault.saga'
import { fetchVaultDataSaga } from './saga/fetchVaultData/fetchVaultData.saga'
import { listenToVaultCreationStatusSaga } from './saga/fetchVaultCreationStatus/fetchVaultCreationStatus.saga'
import { createSelfManagedVaultSaga } from './saga/createSelfManagedVault/createSelfManagedVault.saga'
import { listenToSelfManagedVaultCreationStatusSaga } from './saga/fetchSelfManagedVaultCreationStatus/fetchSelfManagedVaultCreationStatus.saga'
import { listenToSelfManagedVaultCreationStatusByIdSaga } from './saga/fetchSelfManagedVaultCreationStatusById/fetchSelfManagedVaultCreationStatusByIdSaga.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(vaultActions.fetchVaultData, fetchVaultDataSaga),
    takeLatest(vaultActions.createVault, createVaultSaga),
    takeLatest(vaultActions.createSelfManagedVault, createSelfManagedVaultSaga),
    takeLatest(vaultActions.fetchVaultCreationStatus, listenToVaultCreationStatusSaga),
    takeLatest(vaultActions.fetchSelfManagedVaultCreationStatus, listenToSelfManagedVaultCreationStatusSaga),
    takeLatest(vaultActions.fetchSelfManagedVaultCreationStatusById, listenToSelfManagedVaultCreationStatusByIdSaga)
  ])
}

export function* vaultSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
