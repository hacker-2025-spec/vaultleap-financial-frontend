import type { IVaultState, Vault } from './vault.types'

export class VaultState implements IVaultState {
  isReady = false
  isLoading = false
  hasError = false
  data: Vault = {
    projectName: '',
    ownerEmail: '',
    ownerName: '',
    adminWalletAddress: '',
    roles: [],
    userId: '',
    vaultFeePercentage: 0,
    id: '',
    shareholderManagerAddress: '',
    watching: true,
    agreeToTOSAndPP: true,
  }
}
