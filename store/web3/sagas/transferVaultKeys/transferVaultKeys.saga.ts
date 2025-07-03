import type { SagaGenerator } from 'typed-redux-saga'
import { put } from 'typed-redux-saga'
import { web3Actions } from '../../web3.slice'
import { RequestStatus } from '@/store/store.types'

export function* transferVaultKeysSaga(): SagaGenerator<void> {
  try {
    yield* put(web3Actions.updateTransferVaultKeysStatus({ status: RequestStatus.Loading }))
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      yield* put(web3Actions.updateTransferVaultKeysStatus({ status: RequestStatus.Failed, error: error.message }))
    }
  }
}
