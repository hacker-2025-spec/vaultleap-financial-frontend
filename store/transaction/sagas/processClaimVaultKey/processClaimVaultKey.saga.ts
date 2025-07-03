import { ethers } from 'ethers'
import { call, delay, put, SagaGenerator, select } from 'typed-redux-saga'

import { ShareHolderVault__factory } from '@klydo-io/getrewards-contracts'
import { EvmTransactionSenderService, TRANSACTION_TYPE, VaultService } from '@klydo-io/getrewards-backend-api'

import { userActions } from '@/store/user/user.slice'
import { authorizedApiCall } from '@/utils/httpClient'
import { userSelectors } from '@/store/user/user.selectors'
import { vaultSelectors } from '@/store/vault/vault.selectors'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'

import { SAGA_TRANSACTION_STATUS } from '../../transaction.types'
import { transactionActions, TransactionActions } from '../../transaction.slice'

async function signTransactionMessageSaga(config: UnitedWalletConfig, privateKey: string): Promise<string> {
  const address = config.wallet?.address
  const signingKey = new ethers.Wallet(privateKey)

  const hash = ethers.solidityPackedKeccak256(['address'], [address])
  return await signingKey.signMessage(ethers.getBytes(hash))
}

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

export function* processClaimVaultKeySaga({ payload }: TransactionActions['processClaimVaultKeys']): SagaGenerator<void> {
  try {
    const { router, config, privateKey, address, isNew } = payload
    const vaultId = yield* select(vaultSelectors.selectVaultId)
    const userEmail = yield* select(userSelectors.selectUserEmail)
    const vaultData = yield* select(vaultSelectors.selectStateData)

    if (!vaultId) {
      throw new Error('Vault ID not found')
    }

    if (!userEmail) {
      throw new Error('User email not found')
    }

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    yield* put(transactionActions.nextStage())

    const signature = isNew
      ? yield* call(signTransactionMessageNew, config, privateKey, vaultId)
      : yield* call(signTransactionMessageSaga, config, privateKey, address)

    if (!signature) {
      throw new Error('Failed to sign-in message')
    }

    yield* put(transactionActions.nextStage())

    const status = yield* call(sendTransactionSaga, config, signature, address)
    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))

    const selectedRoleIndex = vaultData.roles.findIndex((role) => role.shareHolderRoleAddress === address)

    if (selectedRoleIndex >= 0 && !vaultData.roles[selectedRoleIndex].emails.includes(userEmail)) {
      yield* authorizedApiCall(VaultService.updateRoleEmail, vaultId, { tokenAddress: address })
    }

    yield* delay(8000)
    router.push('/dashboard/vaults?claim=true')
    yield* put(transactionActions.closeModal())
    yield* put(userActions.toggleShowConfetti())
  } catch (error) {
    console.log(error)
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      yield* put(transactionActions.setError(error.message))
    }
  }
}
