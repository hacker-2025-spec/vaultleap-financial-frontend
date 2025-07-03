import { put, select } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { CreatorHandlerService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { vaultSelectors } from '@/store/vault/vault.selectors'
import { CreatorManagerActions, creatorManagerActions } from '@/store/creatorManager/creatorManager.slice'

export function* initializeBackendProcessingSaga({ payload }: CreatorManagerActions['initializeBackendProcessing']): SagaGenerator<void> {
  try {
    const { address } = payload

    const vaultId = yield* select(vaultSelectors.selectVaultId)

    const response = yield* authorizedApiCall(CreatorHandlerService.processCreatorConfig, vaultId, { walletAddress: address })
    console.log('response', response)

    yield* put(creatorManagerActions.initializeBackendProcessingSuccess())
  } catch (error) {
    console.error(error)
  }
}
