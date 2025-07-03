import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'
import { directVaultCreatorActions } from './directVaultCreator.slice'
import { processFinishPersonalInfoFormSaga } from './saga/processFinishPersonalInfoForm/processFinishPersonalInfoForm.saga'
import { processConfirmKYCDocumentsSaga } from './saga/processConfirmKYCDocuments/processConfirmKYCDocuments.saga'
// KYC functionality has been moved to the KnowYourCustomer store
import { processFinishLiquidationAddressCreationSaga } from './saga/processFinishLiquidationAddressCreation/processFinishLiquidationAddressCreation.saga'
import { initCurrentCreationStageSaga } from './saga/initCurrentCreationStage/initCurrentCreationStage.saga'
import { processFinishBankInfoForm } from './saga/processFinishBankInfoForm/processFinishBankInfoForm.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    // takeLatest(directVaultCreatorActions.initializeBackendProcessing, initializeBackendProcessingSaga),
    takeLatest(directVaultCreatorActions.finishPersonalInfoForm, processFinishPersonalInfoFormSaga),
    takeLatest(directVaultCreatorActions.confirmKYCDocuments, processConfirmKYCDocumentsSaga),
    takeLatest(directVaultCreatorActions.createBankingInfo, processFinishBankInfoForm),
    takeLatest(directVaultCreatorActions.finishLiquidationAddressCreation, processFinishLiquidationAddressCreationSaga),
    takeLatest(directVaultCreatorActions.initCurrentCreationStage, initCurrentCreationStageSaga)
  ])
}

export function* directVaultCreatorManagerSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
