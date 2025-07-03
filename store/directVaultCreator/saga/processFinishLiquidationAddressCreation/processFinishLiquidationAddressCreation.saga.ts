import { delay, put, select } from "typed-redux-saga"
import { DirectVaultCreatorActions, directVaultCreatorActions } from "../../directVaultCreator.slice"
import { directVaultCreatorSelectors } from "../../directVaultCreator.selectors"
import { authorizedApiCall } from "@/utils/httpClient"
import { DirectVaultsService } from "@klydo-io/getrewards-backend-api"

export function* processFinishLiquidationAddressCreationSaga({ payload }: DirectVaultCreatorActions['finishLiquidationAddressCreation']) {
  const { feePercentage, router, vaultName, bridgeExternalAccountId } = payload
  
  const isNextStepLoading = yield* select(directVaultCreatorSelectors.selectIsNextStepLoading)

  if (!isNextStepLoading) {
    try {
      yield* put(directVaultCreatorActions.setNextStepLoading())

      // Note: destination_payment_rail is not supported by the API yet
      // We're collecting it in the UI but not sending it to the API
      const createdLiqAddressInfo = yield* authorizedApiCall(DirectVaultsService.createLiquidationAddress, {
        percentage: feePercentage.toString(),
        vaultName,
        bridgeExternalAccountId,
      })
  
      yield* put(directVaultCreatorActions.setCreatedLiqAddressInfo(createdLiqAddressInfo))

      router.push('/direct/summary/')

      yield* delay(1000)
    } catch (error) {
      console.error(error)
    } finally {
      yield* put(directVaultCreatorActions.clearNextStepLoading())
    }
  }
}
