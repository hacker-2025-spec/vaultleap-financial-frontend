import { put, select, take } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { WalletService, WALLET_STATUS } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { sessionActions } from '@/store/session/session.slice'
import { walletSelectors } from '@/store/wallet/wallet.selectors'
import { sessionSelectors } from '@/store/session/session.selectors'

import { WalletActions, walletActions } from '../../wallet.slice'

export function* checkWalletStatusSaga({ payload }: WalletActions['checkWalletStatus']): SagaGenerator<void> {
  try {
    const { address, walletType } = payload
    
    const wallets = yield* select(walletSelectors.selectAllWallets)

    if (wallets.length > 0) {
      const walletIndex = wallets.findIndex((wallet) => wallet.address === address)
      
      if (walletIndex >= 0) {
        yield* put(walletActions.checkWalletStatusSuccess(WALLET_STATUS.WALLET_ALREADY_ADDED))
        return
      }
    }

    const isSessionLoaded = yield* select(sessionSelectors.selectIsSessionLoadedSuccessful)
    if (!isSessionLoaded)
      yield* take(sessionActions.initializeSessionSuccess)

    const walletStatus = yield* authorizedApiCall(WalletService.checkWallet, { address, walletType })

    yield* put(walletActions.checkWalletStatusSuccess(walletStatus.status))
  } catch (error) {
    console.log(error)
  }
}
