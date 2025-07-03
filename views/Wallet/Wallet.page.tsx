'use client'

import { ChevronDown, ChevronUp, Copy, Info, Lock, Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'

import truncateEthAddress from 'truncate-eth-address'
import { useFundWallet, usePrivy } from '@privy-io/react-auth'
import { useUserCustomerDetails } from '@/api/user/userQueries'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import '../../styles/scrollbar.css'
import { WalletTransactionItem } from '@/views/Wallet/WalltTransactionItem.tsx'
import type { Transaction } from '@/components/features/transactions/MainTransactionsWidget/MainTransactionsWidget.types.ts'
import { useTransactionItems } from '@/api/transactions/index.ts'
import { useTokenBalances } from '@/api/wallet/walletQueries.ts'
import { formatWalletGroupDate } from '@/utils/formatTransactionDate'
import { useIsMobile } from '@/hooks/use-mobile'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Received', value: 'received' },
  { label: 'Sent', value: 'sent' },
]

const DangerZoneCheckboxItem = ({
  id,
  checked,
  onCheckedChange,
  label,
}: {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
}) => {
  return (
    <div className="flex items-start gap-3 mb-3 rounded-lg transition-colors bg-white p-3 hover:bg-red-100">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="mt-1 shrink-0" />
      <span className="text-xs sm:text-sm flex-1 whitespace-normal break-words leading-6">{label}</span>
    </div>
  )
}

// No adapter function needed - useTransactionItems returns data in the correct format

const WalletPage: React.FC = () => {
  const isMobile = useIsMobile()
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isAddressCopied, setIsAddressCopied] = useState(false)

  // Get smart wallet address from Privy smart wallet
  const { smartWalletAddress } = usePrivySmartWallet()
  const { fundWallet } = useFundWallet()

  // Use total balance hook for consistent balance display
  const {
    formattedTotal,
    breakdown,
    currencyLabel,
    currencySymbol,
    isLoading: isBalanceLoading,
    isError: balanceError,
    hasAnyTokens,
  } = useTokenBalances()

  // Use ONLY smart wallet address - no fallback
  const walletAddress = smartWalletAddress || ''

  // Get customer details to fetch transactions
  const { data: userData } = useUserCustomerDetails()
  const customerId = userData?.customer?.bridgeCustomerId
  console.log('customerId', customerId)

  // Filter state for transactions
  const [filterValue, setFilterValue] = useState<string | null>(null)

  // Map frontend filter values to API filter values
  const getApiFilterType = (filterValue: string | null) => {
    switch (filterValue) {
      case 'received':
        return 'funds_received'
      case 'sent':
        return 'funds_sent'
      default:
        return undefined // No filter for 'all'
    }
  }

  // Fetch transaction items with server-side filtering
  const { transactions: allTransactions, isLoading: isTransactionsLoading } = useTransactionItems({
    type: getApiFilterType(filterValue),
  })

  // No need for client-side filtering since we're using server-side filtering
  const filteredTransactions = allTransactions

  const [isDangerZoneExpanded, setIsDangerZoneExpanded] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const [cooldownTime, setCooldownTime] = useState<number>(0)
  const [dangerZoneChecks, setDangerZoneChecks] = useState({
    understand: false,
    acknowledge: false,
    legitimateReason: false,
    secureLocation: false,
    secureStorage: false,
  })

  const privy = usePrivy()
  const { exportWallet } = privy

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [cooldownTime])

  const handleExportWallet = async () => {
    if (!exportWallet) return

    try {
      setIsExporting(true)
      setExportError(null)
      setCooldownTime(15)

      // Wait for cooldown
      await new Promise((resolve) => setTimeout(resolve, 15000))

      await exportWallet()
    } catch (error) {
      console.error('Failed to export wallet:', error)
      setExportError('Failed to export wallet. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyAddress = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress)
        setIsAddressCopied(true)

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setIsAddressCopied(false)
        }, 2000)
      } catch (error) {
        console.error('Failed to copy address:', error)
      }
    }
  }

  const handleFundWallet = async () => {
    try {
      await fundWallet(walletAddress, {
        asset: 'native-currency',
        card: {
          preferredProvider: 'moonpay',
        },
      })
    } catch (error) {
      console.error('Failed to initiate wallet funding:', error)
    }
  }

  const handleCheckboxChange = (check: keyof typeof dangerZoneChecks) => {
    setDangerZoneChecks((prev) => ({
      ...prev,
      [check]: !prev[check],
    }))
  }

  const allChecksConfirmed = Object.values(dangerZoneChecks).every((check) => check)

  const formatAddress = (address: string) => {
    if (!address) return ''
    return truncateEthAddress(address)
  }

  const handleInfoClick = () => {
    if (isMobile) {
      setIsTooltipOpen(!isTooltipOpen)
    }
  }

  // Add click outside listener for mobile
  React.useEffect(() => {
    if (isMobile && isTooltipOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element
        if (!target.closest('.tooltip-container')) {
          setIsTooltipOpen(false)
        }
      }

      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobile, isTooltipOpen])

  return (
    <div className="w-full mx-auto max-w-full bg-white rounded-xl p-4 sm:p-6 md:p-8 flex flex-col justify-between gap-4 md:min-w-[900px] md:max-w-[900px] md:gap-8 shadow-md min-h-[90dvh]">
      <div className="flex flex-col gap-4 min-h-[60dvh]">
        {/* Wallet Card */}
        <Card className="w-full min-w-0 flex flex-col items-center p-4 md:p-6 justify-center flex-shrink-0">
          <CardContent className="w-full flex flex-col items-center p-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
                {isBalanceLoading ? '...' : balanceError ? 'Error' : formattedTotal}
              </h2>
              {hasAnyTokens && !isBalanceLoading && !balanceError && (
                <div className="tooltip-container group relative">
                  <Info size={20} className="text-gray-400 hover:text-gray-600 cursor-help" onClick={handleInfoClick} />
                  <div
                    className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-primary text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none ${
                      isMobile ? (isTooltipOpen ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity`}
                  >
                    <div className="space-y-1">
                      <div>
                        USDC: {currencySymbol}
                        {breakdown.usdc.displayValue?.toFixed(2)}
                      </div>
                      <div>
                        EURC: {currencySymbol}
                        {breakdown.eurc.displayValue?.toFixed(2)}
                      </div>
                      <div className="border-t border-gray-600 pt-1 mt-1 font-medium">Total: {formattedTotal}</div>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">{balanceError ? 'Failed to load balance' : currencyLabel}</p>

            <div className="flex items-center gap-2 bg-gray-50 p-2 sm:p-3 rounded-lg mb-4 sm:mb-6 w-full">
              <span className="text-sm text-gray-900 font-mono flex-1">{formatAddress(walletAddress)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyAddress}
                className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 hover:bg-primary-50 relative transition-all duration-200 ease-in-out"
                title={isAddressCopied ? 'Address Copied!' : 'Copy'}
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  {/* Copy icon with fade out animation */}
                  <Copy
                    size={14}
                    className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                      isAddressCopied ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
                    }`}
                  />
                  {/* Check icon with fade in and scale animation */}
                  <Check
                    size={14}
                    className={`absolute inset-0 text-primary transition-all duration-200 ease-in-out ${
                      isAddressCopied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
                    }`}
                  />
                </div>

                {/* Copy notification tooltip with enhanced animations */}
                <div
                  className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-primary text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none transition-all duration-300 ease-out ${
                    isAddressCopied ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'
                  }`}
                >
                  Address Copied!
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                </div>
              </Button>
            </div>

            <Button className="w-full text-sm sm:text-base" onClick={handleFundWallet} type="button">
              Fund Wallet
            </Button>
          </CardContent>
        </Card>

        {/* Transactions List with Filters */}
        <div className="w-full min-w-0 flex flex-col flex-1 min-h-0">
          {/* Filter Tabs */}
          <div className="sm:mb-4 flex-shrink-0">
            <Tabs
              defaultValue={'all'}
              value={filterValue || 'all'}
              onValueChange={(value) => setFilterValue(value === 'all' ? null : value)}
              className="w-full sm:w-fit"
            >
              <TabsList className="bg-transparent p-0 w-full gap-1">
                {FILTERS.map((filter) => (
                  <TabsTrigger key={filter.label} value={filter.value}>
                    {filter.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Dynamic height container for transactions */}
          <div className="flex flex-col flex-1 min-h-0">
            {isTransactionsLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm sm:text-base">Loading transactions...</div>
            ) : (
              <div className="h-full flex flex-col">
                {filteredTransactions && filteredTransactions.length > 0 ? (
                  <div className="flex flex-col gap-2 h-full overflow-y-auto px-4 py-4 rounded-xl bg-transparent scrollbar-simple">
                    {(() => {
                      const grouped: Record<string, Transaction[]> = {}
                      filteredTransactions.forEach((tx) => {
                        const txDate = tx.date ? formatWalletGroupDate(tx.date) : 'Unknown Date'
                        if (!grouped[txDate]) grouped[txDate] = []
                        grouped[txDate].push(tx)
                      })

                      // Sort dates with Today first, Yesterday second, then chronologically
                      const sortedDates = Object.keys(grouped).sort((a, b) => {
                        if (a === 'Today') return -1
                        if (b === 'Today') return 1
                        if (a === 'Yesterday') return -1
                        if (b === 'Yesterday') return 1
                        if (a === 'Unknown Date') return 1
                        if (b === 'Unknown Date') return -1
                        return new Date(b).getTime() - new Date(a).getTime()
                      })
                      let count = 0
                      const result: JSX.Element[] = []
                      for (const date of sortedDates) {
                        if (count >= 5) break
                        result.push(
                          <div key={date} className="text-xs font-semibold text-gray-400 mb-1 mt-2 pl-2 select-none">
                            {date}
                          </div>
                        )
                        for (const tx of grouped[date]) {
                          if (count >= 5) break
                          result.push(<WalletTransactionItem key={tx.hash} {...tx} />)
                          count++
                        }
                      }
                      return result
                    })()}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm sm:text-base">No transactions found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <Collapsible
        className="w-full bg-red-50 rounded-xl shadow p-4 mt-4"
        open={isDangerZoneExpanded}
        onOpenChange={setIsDangerZoneExpanded}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer">
          <div className="flex items-center gap-2 text-red-600">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
            <h3 className="text-sm sm:text-lg font-bold">Danger Zone</h3>
            <span className="bg-amber-100 text-amber-800 text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-lg ml-2">Advanced</span>
          </div>
          <Button variant="ghost" size="icon" className="text-red-600 h-8 w-8">
            {isDangerZoneExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 text-red-800">
          <p className="mb-4 text-sm sm:text-base font-medium">Private key access to your wallet. For advanced users only.</p>

          <DangerZoneCheckboxItem
            id="understand"
            checked={dangerZoneChecks.understand}
            onCheckedChange={(_checked) => handleCheckboxChange('understand')}
            label="I understand that my private keys provide complete control over my funds and should never be shared with anyone."
          />

          <DangerZoneCheckboxItem
            id="acknowledge"
            checked={dangerZoneChecks.acknowledge}
            onCheckedChange={(_checked) => handleCheckboxChange('acknowledge')}
            label="I acknowledge that VaultLeap cannot recover my funds if I lose my private keys or they are stolen due to my negligence."
          />

          <DangerZoneCheckboxItem
            id="legitimateReason"
            checked={dangerZoneChecks.legitimateReason}
            onCheckedChange={(_checked) => handleCheckboxChange('legitimateReason')}
            label="I have a legitimate reason to access my private keys (e.g., hardware wallet backup, emergency recovery) and understand this is not needed for normal usage."
          />

          <DangerZoneCheckboxItem
            id="secureLocation"
            checked={dangerZoneChecks.secureLocation}
            onCheckedChange={(_checked) => handleCheckboxChange('secureLocation')}
            label="I confirm I am in a secure, private location with no screen recording, cameras, or unauthorized people who could view my keys."
          />

          <DangerZoneCheckboxItem
            id="secureStorage"
            checked={dangerZoneChecks.secureStorage}
            onCheckedChange={(_checked) => handleCheckboxChange('secureStorage')}
            label="I have prepared a secure method to store my private keys (e.g., offline paper backup, hardware wallet) and will not store them digitally unencrypted."
          />

          <Button
            variant="outline"
            className="w-full mt-2 sm:mt-4 text-sm sm:text-base bg-red-50 text-red-600 border-red-300 hover:bg-red-100 disabled:opacity-50 disabled:bg-red-50 disabled:text-red-300 disabled:border-red-200"
            disabled={!allChecksConfirmed || isExporting || cooldownTime > 0}
            onClick={handleExportWallet}
          >
            {isExporting ? (cooldownTime > 0 ? `Please wait ${cooldownTime}s...` : 'Exporting...') : 'Reveal My Private Key'}
          </Button>

          {exportError && <p className="mt-2 text-xs sm:text-sm text-red-600">{exportError}</p>}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default WalletPage
