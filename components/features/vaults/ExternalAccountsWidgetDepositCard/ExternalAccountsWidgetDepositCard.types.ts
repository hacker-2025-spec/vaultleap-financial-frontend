import type { VirtualAccountEntity } from '@/client/types.gen'

export interface ExternalAccountsWidgetDepositCardProps {
    account: VirtualAccountEntity
}

export interface PlaceholderCardProps {
    onCreateAccount?: () => void
}
