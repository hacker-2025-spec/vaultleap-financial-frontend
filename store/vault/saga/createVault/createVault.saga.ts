import { put, SagaGenerator, select } from 'typed-redux-saga'

import { TaxInfoService, VaultCreationDto, VaultService } from '@klydo-io/getrewards-backend-api'
import { VAULT_FEE_PERCENT_NORMAL, VAULT_FEE_PERCENT_PREMIUM } from '@/config/config'

import { authorizedApiCall } from '@/utils/httpClient'
import { creatorDataSelectors } from '@/store/creatorData/creatorData.selectors'

import { VaultActions, vaultActions } from '../../vault.slice'

export function* createVaultSaga({ payload }: VaultActions['createVault']): SagaGenerator<void> {
  try {
    const { address, isPremium } = payload
    const isTaxFormEnabled = yield* select(creatorDataSelectors.selectIs1099TaxFormActive)
    const config = yield* select(creatorDataSelectors.selectCreatorConfig)
    const creatorConfig: VaultCreationDto = {
      ...config,
      vaultFeePercentage: isPremium ? VAULT_FEE_PERCENT_PREMIUM : VAULT_FEE_PERCENT_NORMAL,
      taxFormEnabled: isTaxFormEnabled,
      adminWalletAddress: address
    }
    const response = yield* authorizedApiCall(VaultService.createVault, creatorConfig)

    if (isTaxFormEnabled) {
      const creatorTaxInfo = yield* select(creatorDataSelectors.selectCreatorTaxInfo)

      yield* authorizedApiCall(TaxInfoService.createTaxInfo, { ...creatorTaxInfo, vaultId: response.id })
    }

    yield* put(vaultActions.createVaultSuccess(response))
  } catch (error) {
    console.log(error)
  }
}
