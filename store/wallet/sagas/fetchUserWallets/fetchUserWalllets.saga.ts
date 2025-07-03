import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { WalletService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { walletActions } from '../../wallet.slice'

export function* fetchUserWalletsSaga(): SagaGenerator<void> {
  try {
    const userWallets = yield* authorizedApiCall(WalletService.getCurrentUserWallets)

    yield* put(walletActions.fetchUserWalletsSuccess(userWallets))
  } catch (error) {
    yield* put(walletActions.fetchUserWalletsFailure())
    console.log(error)
  }
}
