'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export const StyledPrivacyPolicy = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col bg-[#091f2e] gap-6 p-6 rounded-[10px] mt-2 overflow-y-auto relative z-0 items-start',
      className
    )}
    {...props}
  />
))
