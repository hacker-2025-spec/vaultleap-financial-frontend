import { Wallet, Info } from 'lucide-react'

import { useTokenBalances } from '@/api/wallet/walletQueries.ts'
import { useIsMobile } from '@/hooks/use-mobile'
import React, { useState } from 'react'

export const DirectVaultsWidgetBalance = () => {
  const isMobile = useIsMobile()
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  // Total balance with forex conversion
  const {
    formattedTotal,
    breakdown,
    currencyLabel,
    currencySymbol,
    isLoading: isTotalLoading,
    isError: isTotalError,
    hasAnyTokens,
  } = useTokenBalances()

  const getDisplayBalance = () => {
    if (isTotalLoading) return '...'
    if (isTotalError) return 'Error'
    return formattedTotal
  }

  const getDisplayLabel = () => {
    if (isTotalError) return 'Failed to load balance'
    return currencyLabel
  }

  const handleInfoClick = () => {
    if (isMobile) {
      setIsTooltipOpen(!isTooltipOpen)
    }
  }

  const handleOutsideClick = () => {
    if (isMobile && isTooltipOpen) {
      setIsTooltipOpen(false)
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
    <div className="relative z-[3] flex flex-col text-white">
      <div className="bg-white/15 self-start text-xs text-white/90 flex items-center gap-1 backdrop-blur-sm p-[2px_8px] rounded-md w-fit">
        <Wallet size={12} className="mr-1" />
        Available Balance
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="text-[28px] sm:text-5xl font-bold font-mono">{getDisplayBalance()}</div>
        {hasAnyTokens && !isTotalLoading && !isTotalError && (
          <div className="tooltip-container group relative">
            <Info size={16} className="text-white/60 hover:text-white cursor-help" onClick={handleInfoClick} />
            <div
              className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none ${
                isMobile ? (isTooltipOpen ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'
              } transition-opacity`}
            >
              <div className="space-y-1">
                <div>
                  USDC: {currencySymbol}
                  {breakdown.usdc.displayValue.toFixed(2)}
                </div>
                {/* <div>USDT: {currencySymbol}{breakdown.usdt.displayValue.toFixed(2)}</div> */}
                <div>
                  EURC: {currencySymbol}
                  {breakdown.eurc.displayValue.toFixed(2)}
                </div>
                <div className="border-t border-gray-600 pt-1 mt-1 font-medium">Total: {formattedTotal}</div>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
      <div className="balance-subtitle text-[13px] text-white/80 font-normal">{getDisplayLabel()}</div>
    </div>
  )
}
