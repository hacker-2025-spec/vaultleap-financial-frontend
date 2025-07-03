import { put, select } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { WalletService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { sessionSelectors } from '@/store/session/session.selectors'

import { WalletActions, walletActions } from '../../wallet.slice'

export function* saveUserWalletSaga({ payload }: WalletActions['saveUserWallet']): SagaGenerator<void> {
  try {
    const { address, walletType } = payload

    const isSessionLoaded = yield* select(sessionSelectors.selectIsSessionLoadedSuccessful)
    if (!isSessionLoaded) throw new Error('User session not loaded')

    const savedUserWallet = yield* authorizedApiCall(WalletService.createWallet, { address, walletType })

    console.log('savedUserWallet', savedUserWallet)

    yield* put(walletActions.saveUserWalletSuccess(savedUserWallet))
  } catch (error) {
    console.log(error)
  }
}
