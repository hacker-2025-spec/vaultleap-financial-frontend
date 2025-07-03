import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CurrencyPreference = 'USD' | 'EUR'

interface SettingsState {
  currencyPreferences: CurrencyPreference
}

interface SettingsActions {
  setCurrencyPreferences: (currency: CurrencyPreference) => void
}

type SettingsStore = SettingsState & SettingsActions

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      currencyPreferences: 'USD',
      setCurrencyPreferences: (currency) =>
        set({ currencyPreferences: currency }),
    }),
    {
      name: 'settings-storage',
    }
  )
)

export const useSettingsActions = () => useSettingsStore((state) => ({
  setCurrencyPreferences: state.setCurrencyPreferences,
}))

export const useCurrencyPreferences = () => useSettingsStore((state) => state.currencyPreferences)
