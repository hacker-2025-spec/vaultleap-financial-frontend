import { put, SagaGenerator } from 'typed-redux-saga'

import { TaxInfoService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { creatorDataActions } from '../../creatorData.slice'

export function* fetchPreviousDataSaga(): SagaGenerator<void> {
  try {
    const response = yield* authorizedApiCall(TaxInfoService.getLatestVaultOwnerTaxInfo)

    yield* put(creatorDataActions.fetchPreviousDataSuccess(response))
  } catch (error) {
    console.error(error)
  }
}
