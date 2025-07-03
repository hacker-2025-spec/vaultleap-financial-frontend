import { ReactNode } from "react"

export type ExternalAccountWidgetTabValue = 'deposit' | 'payee'

export interface ExternalAccountsWidgetTab {
    value: ExternalAccountWidgetTabValue
    label: string
    content: () => ReactNode
    disabled?: boolean
}