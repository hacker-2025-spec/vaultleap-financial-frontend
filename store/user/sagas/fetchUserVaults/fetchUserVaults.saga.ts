import { all, call, put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import {
  LiquidationAddressEntity,
  LiquidationAddressesService,
  VaultService,
  VirtualAccountEntity,
  VirtualAccountsService,
} from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { UserActions, userActions } from '../../user.slice'
import { UserVaultDto, VaultUserRole } from '../../user.types'

export function* fetchUserVaultsSaga({ payload }: UserActions['fetchUserVault']): SagaGenerator<void> {
  try {
    // Try to get virtual accounts from the new endpoint
    let virtualAccounts: VirtualAccountEntity[] = []
    try {
      virtualAccounts = yield* call(authorizedApiCall, VirtualAccountsService.getVirtualAccountsByAuth0Id)
    } catch (endpointError) {
      console.error('Error fetching from /virtual-accounts endpoint:', endpointError)
      // If the new endpoint fails, we'll fetch using the old method below
    }


    const results = yield* all([
      call(authorizedApiCall, VaultService.getAllUserVaults, VaultUserRole.CONTRACTOR),
      call(authorizedApiCall, VaultService.getAllUserVaults, VaultUserRole.MANAGER),
      call(authorizedApiCall, LiquidationAddressesService.getLiquidationAddressByAuth0Id),
    ])

    console.log("virtualAccounts", virtualAccounts, results)


    const [rawContractorVaults, rawUserVaults, liquidationAddresses] = results as [
      UserVaultDto[],
      UserVaultDto[],
      LiquidationAddressEntity[],
    ]

    const contractorVaults = rawContractorVaults.map((e) => ({
      ...e,
      roleRelativeToUser: VaultUserRole.CONTRACTOR,
    }))

    const userVaults = rawUserVaults.map((e) => ({
      ...e,
      roleRelativeToUser: VaultUserRole.MANAGER,
    }))

    const managerVaults = userVaults.filter((vault) => {
      const oppositeVault = contractorVaults.find((e) => e.vaultAddress && e.vaultAddress === vault.vaultAddress)

      if (oppositeVault) {
        oppositeVault.heldBySelf = true
        return false
      }

      return true
    })

    const allUserVaultsWithRoles: UserVaultDto[] = [...contractorVaults, ...managerVaults]
    console.log("allUserVaults", virtualAccounts)
    console.log("success,allUserVaults ", virtualAccounts, allUserVaultsWithRoles, liquidationAddresses)


    if (allUserVaultsWithRoles.length > 0 || liquidationAddresses.length) {
      if (allUserVaultsWithRoles.length > 0) yield* put(userActions.setUserVaults(allUserVaultsWithRoles))
      if (liquidationAddresses.length > 0) yield* put(userActions.setUserLiquidationAddresses(liquidationAddresses))
      if (virtualAccounts?.length > 0) yield* put(userActions.setUserVirtualAccounts(virtualAccounts))
      yield* put(userActions.setFetchUserVaultsSuccess())
    } else {
      yield* put(
        userActions.setUserVaults([
          {
            projectName: 'Hello World',
            ownerEmail: '',
            ownerName: '',
            adminWalletAddress: '',
            roles: [
              {
                name: 'Role',
                emails: [],
                watching: true,
                sharePercentage: 100,
                count: 1,
              },
            ],
            userId: '',
            vaultFeePercentage: 0,
            id: '',
            shareholderManagerAddress: '',
            watching: true,
            agreeToTOSAndPP: true,
            roleRelativeToUser: VaultUserRole.CONTRACTOR,
          },
        ] as unknown as UserVaultDto[])
      )
      yield* put(userActions.setFetchUserVaultsSuccess())
      yield* put(
        userActions.fetchUserVaultSuccess({
          projectName: '',
          ownerEmail: '',
          ownerName: '',
          adminWalletAddress: '',
          roles: [
            {
              name: 'Role',
              emails: [],
              watching: true,
              sharePercentage: 100,
              count: 1,
            },
          ],
          userId: '',
          vaultFeePercentage: 0,
          id: '',
          shareholderManagerAddress: '',
          watching: true,
          vaultFundsStatistics: [],
        })
      )
    }
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserVaultsFailed())
  }
}
