'use client'

import { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props extends PropsWithChildren {
  title: ReactNode
  className?: string
}

export const SubSection = ({ title, children, className }: Props) => {
  return (
    <>
      <h2
        className={cn(
          'flex items-center justify-between text-2xl font-bold !text-[#0066ff] mb-6 pb-4 border-b border-[rgba(0,0,0,0.08)] not-first:mt-10 not-first:pt-5',
          className
        )}
      >
        {title}
      </h2>
      {children}
    </>
  )
}
