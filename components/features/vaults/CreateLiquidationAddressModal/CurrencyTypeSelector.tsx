import SvgDollarIcon from '@/components/shared/icons/DollarIcon'
import USDCIcon from '@/components/shared/icons/USDCIcon'

export interface CurrencyOption {
  value: string
  label: string
  description: string
  icon: any // Replace with the actual icon component
}

export interface CurrencyTypeSelectorProps {
  selectedType: string
  options: CurrencyOption[]
  onOptionClick: (value: string) => void
  className?: string
  label?: string
}

export const CurrencyTypeSelector = ({
  selectedType,
  options,
  onOptionClick,
  className = '',
  label = 'Currency Type',
}: CurrencyTypeSelectorProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const IconComponent = option.icon
          const isSelected = selectedType === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onOptionClick(option.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected ? 'border-blue bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <IconComponent size={18} className={isSelected ? 'text-primary' : 'text-gray-500'} />
                </div>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export const defaultCurrencyTypeOptions: CurrencyOption[] = [
  {
    value: 'fiat',
    label: 'Fiat Currency',
    description: 'USD, EUR',
    icon: SvgDollarIcon,
  },
  {
    value: 'stablecoin',
    label: 'Stablecoin',
    description: 'USDC, EURC on Base',
    icon: USDCIcon,
  },
]
