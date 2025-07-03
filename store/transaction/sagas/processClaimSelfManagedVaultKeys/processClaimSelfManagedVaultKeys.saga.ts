import { call, delay, put, select, take } from "typed-redux-saga"
import { transactionActions, TransactionActions } from "../../transaction.slice"
import { SAGA_TRANSACTION_STATUS } from "../../transaction.types"
import { vaultActions } from "@/store/vault/vault.slice"
import { userSelectors } from "@/store/user/user.selectors"
import { authorizedApiCall } from "@/utils/httpClient"
import { EvmTransactionSenderService, TRANSACTION_TYPE, VaultService } from "@klydo-io/getrewards-backend-api"
import { ShareHolderVault__factory } from "@klydo-io/getrewards-contracts"
import { ethers } from "ethers"
import { UnitedWalletConfig } from "@/helpers/united-wallet-config.helper"

function* signTransactionMessage(config: UnitedWalletConfig, privateKey: string, vaultId: string) {
  const address = config.wallet?.address
  const result = yield* authorizedApiCall(VaultService.signVaultTransaction, {
    vaultId,
    p: privateKey,
    address: address as string,
  })
  return result.signature
}

export async function sendTransactionSaga(config: UnitedWalletConfig, signature: string, shareHolderVaultAddress: string): Promise<'success' | 'reverted'> {
  const address = config.wallet?.address
  const { r, s, v } = ethers.Signature.from(signature)

  await EvmTransactionSenderService.createTransaction({
    transactionType: TRANSACTION_TYPE.CLAIM_VAULT_KEYS,
    to: shareHolderVaultAddress,
    data: ShareHolderVault__factory.createInterface().encodeFunctionData('claim', [address as string, v, r, s]),
  })
  return 'success'
}

function* finishSelfManagedVaultClaim(vaultId: string, tokenAddress: string) {
  yield* authorizedApiCall(VaultService.finishSelfManagedVaultClaim, vaultId, { tokenAddress })
}

export function* processClaimSelfManagedVaultKeysSaga({ payload }: TransactionActions["processClaimSelfManagedVaultKeys"]) {
  try {
    const { vault, config } = payload
    const userEmail = yield* select(userSelectors.selectUserEmail)

    const vaultData = vault
    const vaultId = vault.id

    if (!userEmail) {
      throw new Error('User email not found')
    }

    if (vaultId === '') {
      throw new Error('Invalid Vault ID')
    }

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())
    
    yield* put(vaultActions.fetchSelfManagedVaultCreationStatusById({ vaultId }))
    const { payload: { info } } = yield* take(vaultActions.updateSelfManagedVaultCreationStatus)
    yield* put(transactionActions.nextStage())

    if (!info) {
      throw new Error('No claim credentials passed from server')
    }

    const privateKey = info.p
    const claimAddress = info.a

    if (!privateKey || !claimAddress) {
      throw new Error('No claim credentials passed from server')
    }

    const signature = yield* call(signTransactionMessage, config, privateKey, vaultId)

    if (!signature) {
      throw new Error('Failed to sign-in message')
    }

    const status = yield* call(sendTransactionSaga, config, signature, claimAddress)
    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    yield* call(finishSelfManagedVaultClaim, vaultId, claimAddress)

    const selectedRoleIndex = vaultData.roles.findIndex((role) => role.shareHolderRoleAddress === claimAddress)

    if (selectedRoleIndex >= 0 && !vaultData.roles[selectedRoleIndex].emails.includes(userEmail)) {
      yield* authorizedApiCall(VaultService.updateRoleEmail, vaultId, { tokenAddress: claimAddress })
    }

    yield* put(transactionActions.nextStage())

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))

    yield* delay(3000)
    location.reload()
    yield* put(transactionActions.closeModal())

  } catch (error) {
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      console.error(error)
      yield* put(transactionActions.setError(error.message))
    }
    console.log(error)
  }
}