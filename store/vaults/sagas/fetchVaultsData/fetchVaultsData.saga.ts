import { put, SagaGenerator } from 'typed-redux-saga'

import { VaultsCreatorService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { vaultsActions, VaultsActions } from '../../vaults.slice'

export function* fetchVaultsDataSaga({ payload }: VaultsActions['fetchVaultsData']): SagaGenerator<void> {
  try {
    const response = yield* authorizedApiCall(VaultsCreatorService.getVaultsInfo, payload)

    yield* put(vaultsActions.fetchVaultsDataSuccess(response))
  } catch (error) {
    console.error(error)
  }
}
