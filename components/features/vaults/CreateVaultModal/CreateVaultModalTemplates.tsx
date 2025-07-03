import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Zap, PieChart } from 'lucide-react'

type Template = {
  id: string
  title: string
  description: string
  iconBackground: string
  icon: ReactNode
}

interface Props {
  templates: Template[]
  selected: string
  onSelect: (id: string) => void
}

export const CreateVaultModalTemplates = ({ templates, onSelect, selected }: Props) => {
  return templates.map((option) => {
    const isSelected = selected === option.id
    return (
      <div
        key={option.id}
        id={`${option.id}-option`}
        onClick={() => onSelect(option.id)}
        className={cn(
          "p-4 border rounded-lg cursor-pointer transition-colors duration-200",
          isSelected
            ? "border-primary-500 bg-gray-100 hover:bg-gray-200 hover:border-primary-400"
            : "border-gray-200 bg-white hover:bg-gray-50 hover:border-primary-300"
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 flex-shrink-0 rounded-lg text-white flex items-center justify-center"
            style={{ backgroundColor: option.iconBackground }}
          >
            {option.id === 'quickpay' ? <Zap className="h-5 w-5" /> :
             option.id === 'splitvault' ? <PieChart className="h-5 w-5" /> :
             option.icon}
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">{option.title}</h3>
            <p className="text-[13px] text-gray-600 m-0">{option.description}</p>
          </div>
        </div>
      </div>
    )
  })
}
