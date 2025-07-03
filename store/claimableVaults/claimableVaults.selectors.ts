import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'
import { TEMP_TUserShare } from '../claimableVaults/claimableVaults.types'

const selectState = createSelector([selectReducer(StoreKeys.ClaimableVaults)], (state) => state)

const selectVaultKeysStatus = createSelector([selectState], (state) => state.fetchVaultKeysStatus)
const selectVaultStatus = createSelector([selectState], (state) => state.fetchVaultStatus)

const selectFormattedVaults = createSelector([selectState], (state) => {
  const formattedVaults: TEMP_TUserShare[] = []

  state.vaultKeys.map(claimableVault => formattedVaults.push({
    id: claimableVault.id,
    project: claimableVault.projectName,
    roleName: claimableVault.roles[Number(claimableVault.tokenId)].name,
    percentage: claimableVault.roles[Number(claimableVault.tokenId)].sharePercentage,
    claimable: Number((Number(claimableVault.claimable) / 1000000).toFixed(2)),
    tokenId: Number(claimableVault.tokenId),
    tokenAddress: claimableVault.tokenAddress,
  }))

  return formattedVaults
})

const selectVault = createSelector([selectState], (state) => {
  const vault = state.vault
  return ({
    ...vault,
    roles: vault.roles.map((role) => ({
      ...role,
      totalIncome: role.totalIncome ? (Number(role.totalIncome) / 1000000).toFixed(2) : '0',
    })),
    totalPaid: vault.totalPaid ? (Number(vault.totalPaid) / 1000000).toFixed(2) : '0',
    currentFunds: vault.currentFunds ? (Number(vault.currentFunds) / 1000000).toFixed(2) : '0',
    claimable: vault.claimable ? (Number(vault.claimable) / 1000000).toFixed(2) : '0',
  })
})

export const claimableVaultsSelectors = {
  selectState,
  selectVault,
  selectVaultStatus,
  selectFormattedVaults,
  selectVaultKeysStatus,
}
