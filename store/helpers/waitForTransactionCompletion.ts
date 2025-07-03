import { getCallsStatus } from '@wagmi/core/experimental'
import { Config } from 'wagmi'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const waitForTransactionCompletion = async (config: Config, attempts: number, delay: number, id: string): Promise<string> => {
  for (let i = 0; i < attempts; i++) {
    const results = await getCallsStatus(config, { id })

    if (results.status === 'CONFIRMED') {
      return results.receipts?.[0]?.transactionHash || ''
    }

    await wait(delay)
  }

  return ''
}
