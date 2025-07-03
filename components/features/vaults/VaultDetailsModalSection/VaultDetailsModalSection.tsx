'use client'

import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title: string
}

export const VaultDetailsModalSection = ({ children, title }: Props) => {
  return (
    <div className="mb-5">
      <h4 className="text-base font-medium text-foreground mb-3">
        {title}
      </h4>
      {children}
    </div>
  )
}
