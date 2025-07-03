import { put, select } from 'typed-redux-saga'
import { authorizedApiCall } from '@/utils/httpClient'
import { VirtualAccountsService } from '@klydo-io/getrewards-backend-api'
import { virtualAccountCreatorSelectors } from '../../virtualAccountCreator.selectors'
import { virtualAccountCreatorActions, VirtualAccountCreatorActions } from '../../virtualAccountCreator.slice'

export function* processFinishVirtualAccountCreation({ payload }: VirtualAccountCreatorActions['createVirtualAccount']) {
  const { bridgeCustomerId, vaultName, virtualAccountData, router } = payload

  const isNextStepLoading = yield* select(virtualAccountCreatorSelectors.selectIsNextStepLoading)

  if (!isNextStepLoading) {
    try {
      yield* put(virtualAccountCreatorActions.setNextStepLoading())

      const virtualAccount = yield* authorizedApiCall(VirtualAccountsService.createVirtualAccount, {
        virtualAccountData,
        vaultName,
        bridgeCustomerId,
      })

      yield* put(virtualAccountCreatorActions.setVirtualAccount(virtualAccount))
      router?.push('/virtual-account/summary/')
    } catch (error) {
      console.error(error)
    } finally {
      yield* put(virtualAccountCreatorActions.clearNextStepLoading())
    }
  }
}
