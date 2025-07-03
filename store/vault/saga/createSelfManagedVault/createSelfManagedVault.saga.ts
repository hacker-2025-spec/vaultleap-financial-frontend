import { put, SagaGenerator, select } from "typed-redux-saga"
import { vaultActions, VaultActions } from "../../vault.slice"
import { creatorDataSelectors } from "@/store/creatorData/creatorData.selectors"
import { TaxInfoService, VaultCreationDto, VaultService } from "@klydo-io/getrewards-backend-api"
import { VAULT_FEE_PERCENT_NORMAL, VAULT_FEE_PERCENT_PREMIUM } from "@/config/config"
import { authorizedApiCall } from "@/utils/httpClient"


export function* createSelfManagedVaultSaga({ payload }: VaultActions['createSelfManagedVault']): SagaGenerator<void> {
  try {
    
    const { address, isPremium } = payload
    const isTaxFormEnabled = yield* select(creatorDataSelectors.selectIs1099TaxFormActive)
    const config = yield* select(creatorDataSelectors.selectSelfManagedVaultCreatorConfig)
    
    const creatorConfig: VaultCreationDto = {
      ...config,
      vaultFeePercentage: isPremium ? VAULT_FEE_PERCENT_PREMIUM : VAULT_FEE_PERCENT_NORMAL,
      taxFormEnabled: isTaxFormEnabled,
      adminWalletAddress: address
    }

    const response = yield* authorizedApiCall(VaultService.createSelfManagedVault, creatorConfig)

    if (isTaxFormEnabled) {
      const creatorTaxInfo = yield* select(creatorDataSelectors.selectCreatorTaxInfo)

      yield* authorizedApiCall(TaxInfoService.createTaxInfo, { ...creatorTaxInfo, vaultId: response.id })
    }

    yield* put(vaultActions.createSelfManagedVaultSuccess(response))


  } catch (error) {
    console.log(error)
  }
}
