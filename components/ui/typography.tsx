'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold tracking-tight',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      h5: 'text-lg font-semibold tracking-tight',
      h6: 'text-base font-semibold tracking-tight',
      p: 'text-base leading-7',
      blockquote: 'text-xl italic',
      table: 'text-sm',
      list: 'text-base leading-7',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'p',
    align: 'left',
    weight: 'normal',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, align, weight, as, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : as || getDefaultElement(variant)

    return (
      <Comp
        className={cn(typographyVariants({ variant, align, weight, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Typography.displayName = 'Typography'

function getDefaultElement(variant: string | undefined) {
  switch (variant) {
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'h5':
      return 'h5'
    case 'h6':
      return 'h6'
    case 'blockquote':
      return 'blockquote'
    case 'table':
      return 'table'
    case 'list':
      return 'ul'
    default:
      return 'p'
  }
}

export { Typography, typographyVariants }
