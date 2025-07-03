import React from 'react'
import { cn } from '@/lib/utils'

interface CurrencyOptionProps {
  name: string
  description: string
  className?: string
}

export const CurrencyOption: React.FC<CurrencyOptionProps> = ({ name, description, className }) => {
  return (
    <div className={cn('flex flex-col items-start py-1 px-1 text-[13px] sm:text-sm', className)}>
      <span>{name}</span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </div>
  )
}
