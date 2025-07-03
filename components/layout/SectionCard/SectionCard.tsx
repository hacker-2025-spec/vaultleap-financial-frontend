'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
}

export const SectionCard = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "p-4 sm:p-6 bg-[rgba(244,247,252,0.95)] rounded-2xl border border-[rgba(0,0,0,0.06)] shadow-[0_10px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] relative",
        className
      )}
    >
      {children}
    </div>
  )
}
