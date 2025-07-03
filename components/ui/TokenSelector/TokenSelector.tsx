import React, { ReactNode } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TokenBalance, TokenSymbol } from '@/constants/tokens'
import { CircleDollarSign, Euro, Circle } from 'lucide-react'

interface TokenSelectorProps {
  selectedToken?: TokenBalance
  availableTokens: TokenBalance[]
  onTokenSelect: (token: TokenBalance) => void
  disabled?: boolean
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({ selectedToken, availableTokens, onTokenSelect, disabled = false }) => {
  // If no tokens available, show placeholder
  if (availableTokens.length === 0) {
    return (
      <div className="flex items-center px-3 py-2 rounded-r-md border border-l-0 focus:ring-0 focus:ring-offset-0 w-1/2 min-w-0 sm:w-32 sm:min-w-[100px] bg-white/15 border-white focus:border-white text-white">
        <span className="text-xs sm:text-sm w-full text-center">No tokens</span>
      </div>
    )
  }

  // If only one token, render a disabled Select with the same structure as the dropdown
  if (availableTokens.length === 1) {
    const token = availableTokens[0]

    // Auto-select the single token if not already selected
    if (!selectedToken || selectedToken.symbol !== token.symbol) {
      setTimeout(() => onTokenSelect(token), 0)
    }

    return (
      <Select value={token.symbol}>
        <SelectTrigger
          iconClassName="hidden"
          className="w-1/2 min-w-0 sm:w-32 sm:min-w-[100px] rounded-l-none border-l-0 focus:ring-0 focus:ring-offset-0 bg-white/15 text-white border-white focus:border-white"
        >
          <SelectValue>
            <div className="flex items-center">
              <span className="text-lg mr-1">{getTokenIcon(token.symbol)}</span>
              <span className="text-sm font-medium">{token.symbol}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        {/* No dropdown items needed for single token */}
      </Select>
    )
  }

  // Multiple tokens - show dropdown
  return (
    <Select
      value={selectedToken?.symbol}
      onValueChange={(symbol) => {
        const token = availableTokens.find((t) => t.symbol === symbol)
        if (token) onTokenSelect(token)
      }}
      disabled={disabled}
    >
      <SelectTrigger
        iconClassName="text-white"
        className="w-full min-w-0 sm:w-32 sm:min-w-[100px] rounded-l-none border-l-0 focus:ring-0 focus:ring-offset-0 bg-white/15 text-white border-white focus:border-white"
      >
        <SelectValue>
          {selectedToken ? (
            <div className="flex items-center">
              <span className="text-lg mr-1">{getTokenIcon(selectedToken.symbol)}</span>
              <span className="text-sm font-medium">{selectedToken.symbol}</span>
            </div>
          ) : (
            <span className="text-sm text-white/60">Select token</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableTokens.map((token) => (
          <SelectItem key={token.symbol} value={token.symbol}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="text-lg mr-2">{getTokenIcon(token.symbol)}</span>
                <span className="font-medium">{token.symbol}</span>
              </div>
              <span className="text-sm ml-4 text-gray-400">{formatBalance(token.decimal, token.symbol)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Helper function to get token icon
const getTokenIcon = (symbol: TokenSymbol): ReactNode => {
  switch (symbol) {
    case 'USDC':
      return <CircleDollarSign className="text-blue-600" fill="none" strokeWidth={2} size={22} />
    case 'USDT':
      return <CircleDollarSign className="text-green-500" fill="none" strokeWidth={2} size={22} />
    case 'EURC':
      return <Euro className="text-blue-600" strokeWidth={2} size={22} />
    default:
      return <Circle className="text-gray-400" fill="none" strokeWidth={2} size={20} />
  }
}

// Helper function to format balance display
const formatBalance = (balance: number, symbol: TokenSymbol): string => {
  const currency = symbol === 'EURC' ? '€' : '$'
  return `${currency}${balance.toFixed(2)}`
}

export default TokenSelector
