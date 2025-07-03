import { SagaGenerator, all, call, takeLatest } from 'typed-redux-saga'

import { vaultsActions } from './vaults.slice'
import { createVaultsSaga } from './sagas/createVaults/createVaults.saga'
import { fetchVaultsDataSaga } from './sagas/fetchVaultsData/fetchVaultsData.saga'
import { listenToVaultsCreationStatusSaga } from './sagas/fetchVaultsCreationStatus/fetchVaultsCreationStatus.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(vaultsActions.createVaults, createVaultsSaga),
    takeLatest(vaultsActions.fetchVaultsData, fetchVaultsDataSaga),
    takeLatest(vaultsActions.fetchVaultsCreationStatus, listenToVaultsCreationStatusSaga)
  ])
}

export function* vaultsSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}