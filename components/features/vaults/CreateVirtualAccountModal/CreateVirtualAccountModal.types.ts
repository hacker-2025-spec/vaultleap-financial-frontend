import { CurrencyCode } from "@/types/currency"

export interface CreateVirtualAccountModalFormFields {
    currency: CurrencyCode
    name: string
    address: string
}

export interface CreateVirtualAccountModalProps {
  isOpen: boolean
  onClose: () => void
  preferredCurrency?: CurrencyCode
  existingCurrencies?: CurrencyCode[]
}
