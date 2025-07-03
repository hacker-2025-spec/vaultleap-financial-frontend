'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import type { SectionLayoutComponentProps } from './SectionLayout.types'

export const SectionLayoutComponent: React.FC<SectionLayoutComponentProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantClasses = {
    'default': 'px-5',
    'content': 'px-[120px] py-4 md:px-10',
    'plain': 'p-0'
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full box-border max-w-[1200px] mx-auto",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
