import { ProductStatusLabel } from '@/components/features/dashboard/ProductStatusLabel/ProductStatusLabel'
import { ProductTag } from '@/components/features/dashboard/ProductTag/ProductTag'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface Props {
  name: string
  description: string
  tags: string[]
  status: 'inactive' | 'active' | 'notAvailable'
  icon: ReactNode
  premiumOnly?: boolean
  onClick?: () => void
}

export const ProductCard = ({ name, icon, description, tags, status, premiumOnly, onClick }: Props) => {
  const handleClick = () => {
    if (status === 'active' && onClick) {
      onClick()
    }
  }

  return (
    <Card
      color={premiumOnly && status === 'active' ? 'orange' : status == 'active' ? 'blue' : 'default'}
      className={cn(
        'p-6 relative overflow-hidden transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-lg',
        status === 'active' && onClick && 'cursor-pointer',
        status === 'active' && 'border-primary-300/25 shadow-primary-200/50',
        status === 'inactive' &&
          "border-amber-300/25 shadow-amber-200/50 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-amber-200/10 before:via-amber-400/60 before:to-amber-200/10 before:animate-shimmer",
        status === 'notAvailable' &&
          "border-gray-200 before:content-[''] before:absolute before:inset-0 before:backdrop-blur-[1px] before:z-10 before:bg-white/10"
      )}
      onClick={handleClick}
    >
      <ProductStatusLabel status={status} />

      <div className="relative z-[2]">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white text-base',
            premiumOnly
              ? 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-300/30'
              : 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-primary-300/30'
          )}
        >
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">{name}</h3>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

        <ul className="flex justify-between items-center">
          {tags.map((tag) => (
            <ProductTag key={tag} tag={tag} />
          ))}
        </ul>
      </div>
    </Card>
  )
}
