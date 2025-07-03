import { all, call, put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { VaultService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions } from '../../user.slice'
import { UserVaultDto, VaultUserRole } from '../../user.types'

const prepareContractorVault = (e: UserVaultDto) => {
  return {
    ...e,
    roleRelativeToUser: VaultUserRole.CONTRACTOR,
  }
}
const prepareManagerVault = (e: UserVaultDto) => {
  return {
    ...e,
    roleRelativeToUser: VaultUserRole.MANAGER,
  }
}
const filterManagerVault = (vaults: UserVaultDto[]) => (vault: UserVaultDto) => {
  const oppositeVault = vaults.find((e) => e.vaultAddress && e.vaultAddress === vault.vaultAddress)

  if (!oppositeVault) return true
  oppositeVault.heldBySelf = true
  return false
}

export function* fetchUserVaultsNew(): SagaGenerator<void> {
  try {
    const results = yield* all([
      call(authorizedApiCall, VaultService.getAllUserVaults, VaultUserRole.CONTRACTOR),
      call(authorizedApiCall, VaultService.getAllUserVaults, VaultUserRole.MANAGER),
    ])

    const [rawContractorVaults, rawManagerVaults] = results as [UserVaultDto[], UserVaultDto[]]
    const contractorVaults = rawContractorVaults.map(prepareContractorVault)
    const managerVaults = rawManagerVaults.map(prepareManagerVault).filter(filterManagerVault(contractorVaults))
    const vaults = [...contractorVaults, ...managerVaults].sort((a, b) => a.projectName.localeCompare(b.projectName))
    yield* put(userActions.fetchUserVaultsSuccess(vaults))
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserVaultsFailure())
  }
}
