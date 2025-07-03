import { put, SagaGenerator, select } from 'typed-redux-saga'

import { VaultsCreatorConfigDto, VaultsCreatorService } from '@klydo-io/getrewards-backend-api'
import { VAULT_FEE_PERCENT_PREMIUM, VAULT_FEE_PERCENT_NORMAL } from '@/config/config'

import { authorizedApiCall } from '@/utils/httpClient'
import { creatorDataSelectors } from '@/store/creatorData/creatorData.selectors'

import { vaultsActions, VaultsActions } from '../../vaults.slice'

export function* createVaultsSaga({ payload }: VaultsActions['createVaults']): SagaGenerator<void> {
  try {
    const { address, isPremium } = payload
    const config = yield* select(creatorDataSelectors.selectVaultsCreatorConfig)
    const creatorConfig: VaultsCreatorConfigDto = {
      ...config,
      vaults: config.vaults.map((vault) => ({
        ...vault,
        vaultFeePercentage: isPremium ? VAULT_FEE_PERCENT_PREMIUM : VAULT_FEE_PERCENT_NORMAL,
        adminWalletAddress: address
      })),
    }
    const response = yield* authorizedApiCall(VaultsCreatorService.createVaults, creatorConfig)

    yield* put(vaultsActions.createVaultsSuccess(response))
  } catch (error) {
    console.log(error)
  }
}
