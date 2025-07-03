import { CurrencyCode } from '@/types/currency'

export interface ExternalAccountsWidgetDepositProps {
    onAdd: (preferredCurrency?: CurrencyCode, existingCurrencies?: CurrencyCode[]) => void
    onKYC: () => void
}
