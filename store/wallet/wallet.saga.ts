import type { SagaGenerator } from 'typed-redux-saga'
import { all, call, takeLatest } from 'typed-redux-saga'

import { walletActions } from './wallet.slice'
import { saveUserWalletSaga } from './sagas/saveUserWallet/saveUserWallet.saga'
import { fetchUserWalletsSaga } from './sagas/fetchUserWallets/fetchUserWalllets.saga'
import { checkWalletStatusSaga } from './sagas/checkWalletStatus/checkWalletStatus.saga'

function* actionHandlers(): SagaGenerator<void> {
  yield* all([
    takeLatest(walletActions.fetchUserWallets, fetchUserWalletsSaga),
    takeLatest(walletActions.checkWalletStatus, checkWalletStatusSaga),
    takeLatest(walletActions.saveUserWallet, saveUserWalletSaga),
  ])
}

export function* walletSaga(): SagaGenerator<void> {
  yield* all([call(actionHandlers)])
}
