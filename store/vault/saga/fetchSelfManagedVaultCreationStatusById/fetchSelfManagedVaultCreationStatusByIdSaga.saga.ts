import { call, delay, put, SagaGenerator } from 'typed-redux-saga'

import { SelfManagedVaultTransactionStatusDTO, TRANSACTION_STATUS, VaultService } from '@klydo-io/getrewards-backend-api'

import { VaultActions, vaultActions } from '../../vault.slice'
import { authorizedApiCall } from '@/utils/httpClient'

function* fetchSelfManagedVaultCreationStatusSaga(
  vaultId: string
): SagaGenerator<SelfManagedVaultTransactionStatusDTO & { info?: { a?: string; p?: string } }> {
  for (let i = 0; i < 100; i++) {
    try {
      const response: SelfManagedVaultTransactionStatusDTO & { info?: { a?: string; p?: string } } = yield* authorizedApiCall(
        VaultService.getSelfManagedVaultTransactionStatus,
        vaultId
      )
      if (response.status === TRANSACTION_STATUS.SUCCESSFUL || response.status === TRANSACTION_STATUS.REJECTED) {
        return {
          status: response.status,
          info: response.info,
        }
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

export function* listenToSelfManagedVaultCreationStatusByIdSaga({ payload }: VaultActions["fetchSelfManagedVaultCreationStatusById"]): SagaGenerator<void> {
  try {
    const { vaultId } = payload
    const status = yield* call(fetchSelfManagedVaultCreationStatusSaga, vaultId)

    yield* put(vaultActions.updateSelfManagedVaultCreationStatus(status))
  } catch (error) {
    console.error(error)
  }
}
