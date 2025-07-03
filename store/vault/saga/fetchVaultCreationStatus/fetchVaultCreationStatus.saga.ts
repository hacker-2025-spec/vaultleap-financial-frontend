import { call, delay, put, SagaGenerator, select } from 'typed-redux-saga'

import { TRANSACTION_STATUS, VaultService, VaultTransactionStatusDTO } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { vaultActions } from '../../vault.slice'
import { vaultSelectors } from '../../vault.selectors'

function* fetchVaultCreationStatusSaga(vaultId: string): SagaGenerator<TRANSACTION_STATUS> {
  for (let i = 0; i < 100; i++) {
    try {
      const response: VaultTransactionStatusDTO = yield* authorizedApiCall(VaultService.getVaultTransactionStatus, vaultId)
      if (response.status === TRANSACTION_STATUS.SUCCESSFUL || response.status === TRANSACTION_STATUS.REJECTED) {
        return response.status
      }
    } catch (err) {
      console.log('Retrying to fetch vault creation status')
    }
    if (i < 99) {
      yield* delay(3000)
    }
  }

  throw new Error('Fetching vault creation status failed')
}

export function* listenToVaultCreationStatusSaga(): SagaGenerator<void> {
  try {
    const vaultId = yield* select(vaultSelectors.selectVaultId)
    const status = yield* call(fetchVaultCreationStatusSaga, vaultId)

    yield* put(vaultActions.updateVaultCreationStatus({ status }))
  } catch (error) {
    console.error(error)
  }
}
