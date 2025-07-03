import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva('text-card-foreground flex flex-col gap-6 transition-all duration-300 ease-in-out', {
  variants: {
    size: {
      xs: 'py-2',
      sm: 'py-4',
      default: 'py-6',
      lg: 'py-8',
      xl: 'py-10',
    },
    color: {
      default: 'bg-[rgba(255,255,255,0.9)] border border-[rgba(209,213,219,0.3)] shadow-[0_0_20px_rgba(0,0,0,0.05))]',
      blue: 'bg-[rgba(240,248,255,0.5)] border border-[rgba(0,122,255,0.3)] shadow-[0_0_20px_rgba(0,122,255,0.3)]',
      orange: 'bg-card border border-[rgba(255,149,0,0.15)] shadow-[0_4px_16px_rgba(255,149,0,0.15),0_0_30px_rgba(255,149,0,0.1)]',
      gray: 'bg-gray-50 border border-gray-100 shadow-sm',
    },
    rounded: {
      default: 'rounded-xl',
      none: 'rounded-none',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
    rounded: 'default',
  },
})

const cardContentVariants = cva('', {
  variants: {
    size: {
      xs: 'px-2',
      sm: 'px-4',
      default: 'px-6',
      lg: 'px-8',
      xl: 'px-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

function Card({ className, size, color, rounded, ...props }: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return <div data-slot="card" className={cn(cardVariants({ size, color, rounded }), className)} {...props} />
}

function CardHeader({ className, size, ...props }: React.ComponentProps<'div'> & VariantProps<typeof cardContentVariants>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        cardContentVariants({ size }),
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('leading-none font-semibold', className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-action" className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />
  )
}

function CardContent({ className, size, ...props }: React.ComponentProps<'div'> & VariantProps<typeof cardContentVariants>) {
  return <div data-slot="card-content" className={cn(cardContentVariants({ size }), className)} {...props} />
}

function CardFooter({ className, size, ...props }: React.ComponentProps<'div'> & VariantProps<typeof cardContentVariants>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center [.border-t]:pt-6', cardContentVariants({ size }), className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, cardVariants, cardContentVariants }
export type CardProps = React.ComponentProps<'div'> & VariantProps<typeof cardVariants>
export type CardContentProps = React.ComponentProps<'div'> & VariantProps<typeof cardContentVariants>
