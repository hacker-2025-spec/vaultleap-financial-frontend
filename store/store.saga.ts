import { all, fork } from 'typed-redux-saga'

import { userSaga } from './user/user.saga'
import { web3Saga } from './web3/web3.saga'
import { vaultSaga } from './vault/vault.saga'
import { walletSaga } from './wallet/wallet.saga'
import { vaultsSaga } from './vaults/vaults.saga'
import { sessionSaga } from './session/session.saga'
import { creatorDataSaga } from './creatorData/creatorData.saga'
import { transactionSaga } from './transaction/transaction.saga'
import { creatorManagerSaga } from './creatorManager/creatorManager.saga'
import { claimableVaultsSaga } from './claimableVaults/claimableVaults.saga'
import { directVaultCreatorManagerSaga } from './directVaultCreator/directVaultCreator.saga'
import { virtualAccountCreatorManagerSaga } from './virtualAccountCreator/virtualAccountCreator.saga'
import { dashboardSaga } from './dashboard/dashboard.saga'
import PayeeCreatorSaga from './PayeeCreator/PayeeCreator.sagas'
import VACreator from './VACreator/VACreator.sagas'
import { knowYourCustomerSaga } from './KnowYourCustomer/KnowYourCustomer.saga'

export function* rootSaga(): Generator {
  yield all([
    fork(sessionSaga),
    fork(creatorDataSaga),
    fork(creatorManagerSaga),
    fork(userSaga),
    fork(walletSaga),
    fork(web3Saga),
    fork(vaultSaga),
    fork(vaultsSaga),
    fork(transactionSaga),
    fork(claimableVaultsSaga),
    fork(directVaultCreatorManagerSaga),
    fork(virtualAccountCreatorManagerSaga),
    fork(dashboardSaga),
    fork(PayeeCreatorSaga),
    fork(VACreator),
    fork(knowYourCustomerSaga)
  ])
}
