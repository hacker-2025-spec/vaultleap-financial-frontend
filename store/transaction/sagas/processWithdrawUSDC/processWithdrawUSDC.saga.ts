import { ethers } from 'ethers'
import { fromBytes } from 'viem'
import { call, delay, put, SagaGenerator } from 'typed-redux-saga'

import { DeployedChain, getDeployments, TestTokenUSDC__factory, prepareUSDCTransferWithAuthorization } from '@klydo-io/getrewards-contracts'
import { EvmTransactionSenderService, TRANSACTION_TYPE } from '@klydo-io/getrewards-backend-api'

import { ENV_CONFIG } from '@/config/env'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'

import { SAGA_TRANSACTION_STATUS } from '../../transaction.types'
import { transactionActions, TransactionActions } from '../../transaction.slice'

function prepareUSDCTransferDataSaga(
  config: UnitedWalletConfig,
  amount: number,
  transferAddress: string
): ReturnType<typeof prepareUSDCTransferWithAuthorization> {
  const amountWithDecimals = BigInt(amount * 1000000)
  const chainId = config.chain.id
  const address = config.wallet?.address

  return prepareUSDCTransferWithAuthorization({
    from: address as `0x${string}`,
    to: transferAddress as `0x${string}`,
    amount: amountWithDecimals,
    tokenAddress: getDeployments(Number(chainId!) as DeployedChain).USDC,
    chainId: String(chainId),
  })
}

async function signTransactionWithTypedDataSaga(
  config: UnitedWalletConfig,
  data: ReturnType<typeof prepareUSDCTransferWithAuthorization>
): Promise<string> {
  const {
    privy: { signTypedData },
  } = config

  const signatureResult = await signTypedData({
    types: data.types,
    primaryType: 'TransferWithAuthorization',
    message: {
      from: data.message.from,
      to: data.message.to,
      value: BigInt(data.message.value).toString(),
      validAfter: BigInt(data.message.validAfter).toString(),
      validBefore: BigInt(data.message.validBefore).toString(),
      nonce: fromBytes(data.message.nonce, 'hex'),
    },
    domain: {
      ...data.domain,
      name: ENV_CONFIG.environment !== 'prod' ? data.domain.name : 'USD Coin',
      chainId: Number(data.domain.chainId),
    },
  })

  return signatureResult.signature
}

async function sendTransactionSaga(
  config: UnitedWalletConfig,
  amount: number,
  transferAddress: string,
  data: ReturnType<typeof prepareUSDCTransferWithAuthorization>
): Promise<'success' | 'reverted'> {
  const amountWithDecimals = BigInt(amount * 1000000)
  const chainId = config.chain.id
  const address = config.wallet?.address

  const signature = await signTransactionWithTypedDataSaga(config, data)

  const { r, s, v } = ethers.Signature.from(signature)

  await EvmTransactionSenderService.createTransaction({
    transactionType: TRANSACTION_TYPE.SEND_USDC,
    to: getDeployments(Number(chainId!) as DeployedChain).USDC,
    data: TestTokenUSDC__factory.createInterface().encodeFunctionData('transferWithAuthorization', [
      address as `0x${string}`,
      transferAddress as `0x${string}`,
      amountWithDecimals,
      BigInt(data.message.validAfter).toString(),
      BigInt(data.message.validBefore).toString(),
      fromBytes(data.message.nonce, 'hex'),
      v,
      r,
      s,
    ]),
  })

  return 'success'
}

export function* processWithdrawUSDCSaga({ payload }: TransactionActions['processWithdrawUSDC']): SagaGenerator<void> {
  try {
    const { config, amount, transferAddress, isNew } = payload

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    const data = yield* call(prepareUSDCTransferDataSaga, config, amount, transferAddress)

    yield* call(sendTransactionSaga, config, amount, transferAddress, data)

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))
    if (!isNew) {
      yield* delay(3000)
      location.reload()
    }
    yield* put(transactionActions.closeModal())
  } catch (error) {
    console.log(error)
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      yield* put(transactionActions.setError(error.message))
    }
  }
}
