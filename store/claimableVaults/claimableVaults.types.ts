import { VaultInfoDto, VaultKeysDto } from '@klydo-io/getrewards-backend-api'

import { RequestStatus } from '@/store/store.types'

export interface ClaimableVaults extends VaultKeysDto {}

export type ClaimableVaultType = Omit<VaultInfoDto, 'agreeToTOSAndPP'>

export type ClaimableVaultsState = {
  fetchVaultKeysStatus: RequestStatus
  vaultKeys: ClaimableVaults[]
  fetchVaultStatus: RequestStatus
  vault: ClaimableVaultType
}

export type TEMP_TUserShare = {
  id: string
  project: string
  roleName: string
  percentage: number
  claimable: number
  tokenId: number
  tokenAddress: string
}
