import { ExternalAccountsWidgetDepositCardProps } from './ExternalAccountsWidgetDepositCard.types'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'


const cardVariants = cva(
  "rounded-3xl mx-auto max-w-[540px] md:max-w-[600px] md:aspect-[2.2/1] px-4 md:px-10 py-6 md:py-8 flex flex-col justify-between relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-[#5657e5] to-[#6b5cff] ring-1 ring-white/10 backdrop-blur-md",
        placeholder: "bg-gradient-to-br from-[#5657e5]/50 to-[#6b5cff]/50 border-2 border-dashed border-white/30 hover:border-white/50 transition-colors cursor-pointer backdrop-blur-md"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type SourceDepositInstructions = {
  currency: 'usd' | 'eur'
  bank_name: string
  bank_account_number?: string
  bank_routing_number?: string
  iban?: string
  bic?: string
  account_holder_name?: string
  bank_beneficiary_name?: unknown
}

function getAccountType(instructions: SourceDepositInstructions): string {
  if (instructions?.currency === 'eur') {
    return 'IBAN'
  }
  return 'Checking'
}

function getAccountNumber(instructions: SourceDepositInstructions): string {
  if (instructions?.currency === 'eur') {
    return instructions?.iban || ''
  }
  return instructions?.bank_account_number || ''
}

function getAccountHolderName(instructions: SourceDepositInstructions): string {
  if (instructions?.currency === 'eur') {
    return instructions?.account_holder_name || ''
  }
  return typeof instructions?.bank_beneficiary_name === 'string' ? instructions.bank_beneficiary_name : ''
}

import { Clipboard, Check } from 'lucide-react'
import * as React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

function CopyButton({
  accountName,
  accountNumber,
  routingNumber,
  accountType,
}: {
  accountName: string
  accountNumber: string
  routingNumber: string
  accountType: string
}) {
  const [copied, setCopied] = React.useState(false)

  const details = `Account Name: ${accountName}\nAccount #: ${accountNumber}\nRouting/BIC: ${routingNumber}\nAccount Type: ${accountType}`

  const handleCopy = () => {
    navigator.clipboard.writeText(details)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            aria-label="Copy account details"
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
            type="button"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5 text-white" />}
          </button>
        </TooltipTrigger>
        <TooltipContent>Copy account details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface ExtendedProps extends VariantProps<typeof cardVariants> {
  account?: ExternalAccountsWidgetDepositCardProps['account']
  onCreateAccount?: () => void
}

export default function ExternalAccountsWidgetDepositCard({
  account,
  variant = "default",
  onCreateAccount
}: ExtendedProps) {
  // If placeholder variant, render the placeholder card
  if (variant === "placeholder") {
    return (
      <div
        className={cardVariants({ variant })}
        onClick={onCreateAccount}
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h3 className="text-lg font-semibold !text-white mb-2">Create Euro Account</h3>
          <p className="text-sm text-white/70 mb-6 max-w-xs">
            Add a Euro account to receive EUR deposits and expand your payment options.
          </p>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              onCreateAccount?.()
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </div>
      </div>
    )
  }

  // Regular account card logic
  if (!account) return null

  const instructions = account.source_deposit_instructions as SourceDepositInstructions
  const accountNumber = getAccountNumber(instructions)

  const accountHolderName = getAccountHolderName(instructions)
  const accountType = getAccountType(instructions)
  const routingNumber = instructions?.bank_routing_number || instructions?.bic || ''

  console.log(account)

  return (
    <div
      className={cardVariants({ variant })}
    >
      {/* Copy Icon Button */}
      <CopyButton
        accountName={accountHolderName || account.vault_name}
        accountNumber={accountNumber}
        routingNumber={routingNumber}
        accountType={accountType}
      />
      {/* Header */}
      <div className="mb-6">
        <div className="text-lg md:text-xl font-semibold text-white leading-tight text-left">
          {instructions?.currency?.toUpperCase() || 'Account'} Account
        </div>
        <div className="text-xs md:text-sm text-white/60 uppercase tracking-wide font-medium mt-1 text-left">
          {(instructions?.bank_name || account.vault_name)?.toUpperCase()}
        </div>
      </div>
      {/* Info Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
        {/* Account Name */}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-white/60 uppercase tracking-wide font-medium mb-1 text-left">Account Name</span>
          <span className="text-white text-sm md:text-base font-medium font-mono text-left break-words">
            {accountHolderName || account.vault_name}
          </span>
        </div>
        {/* Account Number */}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-white/60 uppercase tracking-wide font-medium mb-1 text-left">Account #</span>
          <span className="text-white text-sm md:text-base font-medium font-mono text-left">{accountNumber}</span>
        </div>
        {/* Routing Number / BIC */}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-white/60 uppercase tracking-wide font-medium mb-1 text-left">
            {instructions?.currency === 'eur' ? 'BIC' : 'Routing #'}
          </span>
          <span className="text-white text-sm md:text-base font-medium font-mono text-left">{routingNumber}</span>
        </div>
        {/* Account Type */}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-white/60 uppercase tracking-wide font-medium mb-1 text-left">Account Type</span>
          <span className="text-white text-sm md:text-base font-medium font-mono text-left">{accountType}</span>
        </div>
      </div>
    </div>
  )
}
