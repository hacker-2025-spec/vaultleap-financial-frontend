
export class WalletSharedMethods {
  public logout?: () => Promise<void> = undefined
}

export const walletSharedMethods = new WalletSharedMethods()