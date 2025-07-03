import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'
import { virtualAccountCreatorActions } from './virtualAccountCreator.slice'
import { processFinishPersonalInfoFormSaga } from './saga/processFinishPersonalInfoForm/processFinishPersonalInfoForm.saga'
import { processConfirmKYCDocumentsSaga } from './saga/processConfirmKYCDocuments/processConfirmKYCDocuments.saga'
// KYC functionality has been moved to the KnowYourCustomer store
import { initCurrentCreationStageSaga } from './saga/initCurrentCreationStage/initCurrentCreationStage.saga'
import { processFinishVirtualAccountCreation } from './saga/processFinishVirtualAccountCreation/processFinishVirtualAccountCreation.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(virtualAccountCreatorActions.finishPersonalInfoForm, processFinishPersonalInfoFormSaga),
    takeLatest(virtualAccountCreatorActions.confirmKYCDocuments, processConfirmKYCDocumentsSaga),
    takeLatest(virtualAccountCreatorActions.initCurrentCreationStage, initCurrentCreationStageSaga),
    takeLatest(virtualAccountCreatorActions.createVirtualAccount, processFinishVirtualAccountCreation),
  ])
}

export function* virtualAccountCreatorManagerSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
