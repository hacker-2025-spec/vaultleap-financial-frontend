import { call, delay, put, SagaGenerator, select } from 'typed-redux-saga'

import { VaultsCreationStatus, VaultsCreationStatusDto, VaultsCreatorService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { vaultsActions } from '../../vaults.slice'
import { vaultsSelectors } from '../../vaults.selectors'

function* fetchVaultsCreationStatusSaga(vaultsId: string): SagaGenerator<VaultsCreationStatus> {
  for (let i = 0; i < 100; i++) {
    try {
      const response: VaultsCreationStatusDto = yield* authorizedApiCall(VaultsCreatorService.getVaultsCreationStatus, vaultsId)
      if (response.status === VaultsCreationStatus.SUCCESS || response.status === VaultsCreationStatus.REJECTED) {
        return response.status
      }
    } catch (err) {
      console.log('Retrying to fetch vaults creation status')
    }
    if (i < 99) {
      yield* delay(3000)
    }
  }

  throw new Error('Fetching vaults creation status failed')
}

export function* listenToVaultsCreationStatusSaga(): SagaGenerator<void> {
  try {
    const vaultsId = yield* select(vaultsSelectors.selectVaultsId)
    const status = yield* call(fetchVaultsCreationStatusSaga, vaultsId)

    yield* put(vaultsActions.updateVaultsCreationStatus({ status }))
  } catch (error) {
    console.error(error)
  }
}