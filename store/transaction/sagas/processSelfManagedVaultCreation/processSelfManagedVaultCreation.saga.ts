import { call, delay, put, select, take } from "typed-redux-saga"
import { transactionActions, TransactionActions } from "../../transaction.slice"
import { SAGA_TRANSACTION_STATUS } from "../../transaction.types"
import { vaultActions } from "@/store/vault/vault.slice"
import { vaultSelectors } from "@/store/vault/vault.selectors"
import { userSelectors } from "@/store/user/user.selectors"
import { authorizedApiCall } from "@/utils/httpClient"
import { EvmTransactionSenderService, TRANSACTION_TYPE, VaultService } from "@klydo-io/getrewards-backend-api"
import { ShareHolderVault__factory } from "@klydo-io/getrewards-contracts"
import { ethers } from "ethers"
import { creatorManagerActions } from "@/store/creatorManager/creatorManager.slice"
import { UnitedWalletConfig } from "@/helpers/united-wallet-config.helper"

function* signTransactionMessageNew(config: UnitedWalletConfig, privateKey: string, vaultId: string) {
  const address = config.wallet?.address
  const result = yield* authorizedApiCall(VaultService.signVaultTransaction, {
    vaultId,
    p: privateKey,
    address: address as string,
  })
  return result.signature
}

async function sendTransactionSaga(config: UnitedWalletConfig, signature: string, shareHolderVaultAddress: string): Promise<'success' | 'reverted'> {
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

export function* processSelfManagedVaultCreationSaga({ payload }: TransactionActions["processSelfManagedVaultCreation"]) {
  try {
    const { config, router, isPremium } = payload
    const address = config.wallet?.address
    const userEmail = yield* select(userSelectors.selectUserEmail)

    if (!userEmail) {
      throw new Error('User email not found')
    }

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    yield* put(vaultActions.createSelfManagedVault({ address: address as string, isPremium }))
    yield* take(vaultActions.createSelfManagedVaultSuccess)
    yield* put(creatorManagerActions.initializeBackendProcessing({ address: address as string }))
    yield* take(creatorManagerActions.initializeBackendProcessingSuccess)
    yield* put(transactionActions.nextStage())

    yield* put(vaultActions.fetchSelfManagedVaultCreationStatus())
    
    const { payload: { info } } = yield* take(vaultActions.updateSelfManagedVaultCreationStatus)   
    yield* put(transactionActions.nextStage())

    const vaultData = yield* select(vaultSelectors.selectStateData)
    const vaultId = yield* select(vaultSelectors.selectVaultId)
    
    if (!vaultId) {
      throw new Error('Vault ID not found')
    }

    if (!info) {
      throw new Error('No claim credentials passed from server')
    }

    const privateKey = info.p
    const claimAddress = info.a

    if (!privateKey || !claimAddress) {
      throw new Error('No claim credentials passed from server')
    }

    yield* put(transactionActions.nextStage())
    
    const signature = yield* call(signTransactionMessageNew, config, privateKey, vaultId)

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

    yield* delay(4000)
    router.push(`/dashboard`)
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