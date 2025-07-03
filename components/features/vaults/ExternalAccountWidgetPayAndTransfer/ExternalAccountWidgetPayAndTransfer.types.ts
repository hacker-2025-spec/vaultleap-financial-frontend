import { UnitedWalletConfig } from "@/helpers/united-wallet-config.helper"
import { RecipientOption } from "@/hooks/useRecipients"
import { TokenBalance } from "@/constants/tokens"

export interface ExternalAccountWidgetPayAndTransferProps {
    balance: number
    recipients: RecipientOption[]
    config: UnitedWalletConfig
    onCreatePayee: () => void
    onSend: (data?: {
        recipient?: string;
        amount?: number;
        recipientAddress?: string;
        token?: 'USDC' | 'EURC' | 'USDT';
        selectedToken?: TokenBalance;
        isDirectWeb3?: boolean;
    }) => void
}

export interface ExternalAccountWidgetPayAndTransferFormFields {
    amount: number
    recipient: string
    address?: string
}
