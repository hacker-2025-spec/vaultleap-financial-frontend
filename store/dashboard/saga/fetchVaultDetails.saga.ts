import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { dashboardActions, DashboardActions } from '../dashboard.slice'

export function* fetchUserVaultDetailsSaga({ payload }: DashboardActions['fetchVaultDetails']): SagaGenerator<void> {
  try {
    const vaultData = yield* authorizedApiCall(VaultService.getVaultInfoById, payload.id, payload.role)

    yield* put(dashboardActions.addVaultDetails(vaultData))
    yield* put(dashboardActions.fetchVaultDetailsSuccess())
  } catch (error) {
    console.log(error)
    yield* put(dashboardActions.fetchVaultDetailsFailed())
  }
}
