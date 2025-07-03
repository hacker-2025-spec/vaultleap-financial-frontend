import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { userActions } from './user.slice'
import { sendUserInfoSaga } from './sagas/sendUserInfo/sendUserInfo.saga'
import { fetchUserDataSaga } from './sagas/fetchUserData/fetchUserData.saga'
import { fetchUserVaultSaga } from './sagas/fetchUserVault/fetchUserVault.saga'
import { sendUserDetailsSaga } from './sagas/sendUserDetails/sendUserDetals.saga'
import { fetchSumSubDataSaga } from './sagas/fetchSumSubData/fetchSumSubData.saga'
import { fetchUserVaultsSaga } from './sagas/fetchUserVaults/fetchUserVaults.saga'
import { unwatchUserVaultSaga } from './sagas/unwatchUserVault/unwatchUserVault.saga'
import { setApplicantDataSaga } from './sagas/sendApplicantData/sendApplicantData.saga'
import { fetchUserTaxFormsSaga } from './sagas/fetchUserTaxForms/fetchUserTaxForms.saga'
import { watchAllUserVaultsSaga } from './sagas/watchAllUserVaults/watchAllUserVaults.saga'
import { downloadTaxDocumentSaga } from './sagas/downloadTaxDocument/downloadTaxDocument.saga'
import { requestAccessTaxDocumentSaga } from './sagas/requestAccessTaxDocument/requestAccessTaxDocument.saga'
import { uploadUserAvatarSaga } from './sagas/uploadUserAvatar/uploadUserAvatar.saga'
import { deleteUserAvatarSaga } from './sagas/deleteUserAvatar/deleteUserAvatar.saga'
import { fetchUserLiquidationAddressSaga } from './sagas/fetchUserLiquidationAddress/fetchUserLiquidationAddress.saga'
import { fetchUserVirtualAccountSaga } from './sagas/fetchUserVirtualAccount/fetchUserVirtualAccount.saga'
import { setPersonaApplicantDataSaga } from './sagas/sendPersonaApplicantData/sendPersonaApplicantData.saga'
import { fetchPersonaDataSaga } from './sagas/fetchPersonaData/fetchPersonaData.saga'
import { fetchUserVaultsNew } from './sagas/new/fetchUserVaultsNew.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(userActions.fetchUserData, fetchUserDataSaga),
    takeLatest(userActions.sendUserData, sendUserDetailsSaga),
    takeLatest(userActions.sendUserInfo, sendUserInfoSaga),
    takeLatest(userActions.fetchUserTaxForms, fetchUserTaxFormsSaga),
    takeLatest(userActions.fetchUserVaults, fetchUserVaultsSaga),
    takeLatest(userActions.downloadTaxDocument, downloadTaxDocumentSaga),
    takeLatest(userActions.requestAccessTaxDocument, requestAccessTaxDocumentSaga),
    takeLatest(userActions.unwatchUserVault, unwatchUserVaultSaga),
    takeLatest(userActions.watchAllUserVaults, watchAllUserVaultsSaga),
    takeLatest(userActions.fetchUserVault, fetchUserVaultSaga),
    takeLatest(userActions.fetchUserLiquidationAddress, fetchUserLiquidationAddressSaga),
    takeLatest(userActions.fetchUserVirtualAccount, fetchUserVirtualAccountSaga),
    takeLatest(userActions.fetchSumSubData, fetchSumSubDataSaga),
    takeLatest(userActions.setApplicantData, setApplicantDataSaga),
    takeLatest(userActions.uploadUserAvatar, uploadUserAvatarSaga),
    takeLatest(userActions.deleteUserAvatar, deleteUserAvatarSaga),
    takeLatest(userActions.fetchPersonaData, fetchPersonaDataSaga),
    takeLatest(userActions.setPersonaApplicantData, setPersonaApplicantDataSaga),
    takeLatest(userActions.fetchUserVaultsNew, fetchUserVaultsNew),
  ])
}

export function* userSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
