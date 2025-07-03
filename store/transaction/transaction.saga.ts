import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { transactionActions } from './transaction.slice'
import { processClaimUSDCSaga } from './sagas/processClaimUSDC/processClaimUSDC.saga'
import { processWithdrawUSDCSaga } from './sagas/processWithdrawUSDC/processWithdrawUSDC.saga'
import { processClaimVaultKeySaga } from './sagas/processClaimVaultKey/processClaimVaultKey.saga'
import { processVaultCreationSaga } from './sagas/processVaultCreation/processVaultCreation.saga'
import { processVaultsCreationSaga } from './sagas/processVaultsCreation/processVaultsCreation.saga'
import { processReclaimVaultKeySaga } from './sagas/processReclaimVaultKey/processReclaimVaultKey.saga'
import { processSendFundsToVaultSaga } from './sagas/processSendFundsToVault/processSendFundsToVault.saga'
import { processTransferVaultKeySaga } from './sagas/processTransferVaultKey/processTransferVaultKey.saga'
import { processSelfManagedVaultCreationSaga } from './sagas/processSelfManagedVaultCreation/processSelfManagedVaultCreation.saga'
import { processClaimSelfManagedVaultKeysSaga } from './sagas/processClaimSelfManagedVaultKeys/processClaimSelfManagedVaultKeys.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(transactionActions.processClaimUSDC, processClaimUSDCSaga),
    takeLatest(transactionActions.processWithdrawUSDC, processWithdrawUSDCSaga),
    takeLatest(transactionActions.processVaultCreation, processVaultCreationSaga),
    takeLatest(transactionActions.processClaimVaultKeys, processClaimVaultKeySaga),
    takeLatest(transactionActions.processVaultsCreation, processVaultsCreationSaga),
    takeLatest(transactionActions.processReclaimVaultKeys, processReclaimVaultKeySaga),
    takeLatest(transactionActions.processSendFundsToVault, processSendFundsToVaultSaga),
    takeLatest(transactionActions.processTransferVaultKey, processTransferVaultKeySaga),
    takeLatest(transactionActions.processSelfManagedVaultCreation, processSelfManagedVaultCreationSaga),
    takeLatest(transactionActions.processClaimSelfManagedVaultKeys, processClaimSelfManagedVaultKeysSaga),
  ])
}

export function* transactionSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
