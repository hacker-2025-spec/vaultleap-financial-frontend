'use client'

import React from 'react'
import { MainHeader } from '@/components/features/dashboard/MainHeader/MainHeader'
import { SubSection } from '@/components/layout/SubSection/SubSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useCurrencyPreferences, useSettingsActions, type CurrencyPreference } from '@/stores/settingsStore'
import { CurrencyTypeSelector, type CurrencyOption } from '@/components/features/vaults/CreateLiquidationAddressModal/CurrencyTypeSelector'
import { BadgeDollarSign, BadgeEuro } from 'lucide-react'
import { FilledEuro } from '@/assets/svg/FilledEuro'
import { FilledDollar } from '@/assets/svg/FilledDollar'

const currencyPreferenceOptions: CurrencyOption[] = [
  {
    value: 'USD',
    label: 'US Dollar',
    description: 'United States Dollar',
    icon: FilledDollar,
  },
  {
    value: 'EUR',
    label: 'Euro',
    description: 'European Union Euro',
    icon: FilledEuro,
  },
]

export const SettingsPage = () => {
  const currencyPreferences = useCurrencyPreferences()
  const { setCurrencyPreferences } = useSettingsActions()

  const handleCurrencyChange = (value: string) => {
    if (value && (value === 'USD' || value === 'EUR')) {
      setCurrencyPreferences(value as CurrencyPreference)
    }
  }

  return (
    <>
      <SubSection title="Settings">
        <div className="space-y-6">
          {/* Currency Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Currency Preferences</CardTitle>
              <Typography variant="muted" className="text-sm">
                Choose your preferred currency for transactions and account balances
              </Typography>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CurrencyTypeSelector
                  selectedType={currencyPreferences}
                  options={currencyPreferenceOptions}
                  onOptionClick={handleCurrencyChange}
                  label="Default Currency"
                  className="max-w-md"
                />
                <div className="text-sm text-muted-foreground">
                  <Typography variant="small">
                    This setting affects which virtual accounts are displayed and the currency used for transaction history and balances.
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <Typography variant="muted" className="text-sm">
                Manage your account settings and preferences
              </Typography>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <Typography variant="small">Additional account settings will be available here in future updates.</Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </SubSection>
    </>
  )
}
