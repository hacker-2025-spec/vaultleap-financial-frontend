import { ethers } from 'ethers'
import { fromBytes } from 'viem'
import { call, delay, put, SagaGenerator } from 'typed-redux-saga'

import { EvmTransactionSenderService, TRANSACTION_TYPE } from '@klydo-io/getrewards-backend-api'
import { prepareNFTTransferWithAuthorization, ShareRolesManager__factory } from '@klydo-io/getrewards-contracts'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'
import { SAGA_TRANSACTION_STATUS } from '@/store/transaction/transaction.types'

import { transactionActions, TransactionActions } from '../../transaction.slice'

function prepareNFTTransferDataSaga(
  config: UnitedWalletConfig,
  tokenId: number,
  tokenAddress: string,
  transferAddress: string,
): ReturnType<typeof prepareNFTTransferWithAuthorization> {
  const { wallet, chain } = config

  const address = wallet?.address
  const chainId = chain.id

  return prepareNFTTransferWithAuthorization({
    from: address as `0x${string}`,
    to: transferAddress as `0x${string}`,
    amount: BigInt(1),
    tokenId: BigInt(tokenId),
    tokenAddress: tokenAddress as `0x${string}`,
    chainId: String(chainId),
  })
}

async function signTransactionWithTypedDataSaga(
  config: UnitedWalletConfig,
  data: ReturnType<typeof prepareNFTTransferWithAuthorization>,
): Promise<string> {
  const { privy: { signTypedData } } = config
  
  const signResult = await signTypedData({
    types: data.types,
    primaryType: 'TransferWithAuthorization',
    message: {
      from: data.message.from,
      to: data.message.to,
      value: BigInt(data.message.value).toString(),
      tokenId: BigInt(data.message.tokenId).toString(),
      validAfter: BigInt(data.message.validAfter).toString(),
      validBefore: BigInt(data.message.validBefore).toString(),
      nonce: fromBytes(data.message.nonce, 'hex'),
    },
    domain: {
      ...data.domain,
      chainId: Number(data.domain.chainId),
    }
  })

  return signResult.signature
}

async function sendTransactionSaga(
  config: UnitedWalletConfig,
  tokenAddress: string,
  transferAddress: string,
  data: ReturnType<typeof prepareNFTTransferWithAuthorization>,
): Promise<'success' | 'reverted'> {
  const signature = await signTransactionWithTypedDataSaga(config, data)

    const { r, s, v } = ethers.Signature.from(signature)

    await EvmTransactionSenderService.createTransaction(
      {
        transactionType: TRANSACTION_TYPE.SEND_NFTS,
        to: tokenAddress,
        data: ShareRolesManager__factory.createInterface().encodeFunctionData("safeTransferWithAuthorization", [
          '0xC3ACc24ddCB99645a67d3c20b83407411398c698' as `0x${string}`,
          transferAddress as `0x${string}`,
          BigInt(data.message.tokenId).toString(),
          BigInt(1).toString(),
          BigInt(data.message.validAfter).toString(),
          BigInt(data.message.validBefore).toString(),
          fromBytes(data.message.nonce, 'hex'),
          v,
          r,
          s
        ])
      })

    return 'success'
}

export function* processTransferVaultKeySaga({ payload }: TransactionActions['processTransferVaultKey']): SagaGenerator<void> {
  try {
    const { config, tokenId, tokenAddress, transferAddress } = payload

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    const data = yield* call(prepareNFTTransferDataSaga, config, tokenId, tokenAddress, transferAddress)

    yield* call(sendTransactionSaga, config, tokenAddress, transferAddress, data)

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))

    yield* delay(3000)
    location.reload()
    yield* put(transactionActions.closeModal())
  } catch (error) {
    console.log(error)
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      yield* put(transactionActions.setError(error.message))
    }
  }
}
