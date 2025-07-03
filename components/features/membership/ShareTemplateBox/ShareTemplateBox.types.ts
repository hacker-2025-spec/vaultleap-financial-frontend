import React from 'react'

export type ShareTemplateBoxComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
  isActive: boolean
  comingSoon: boolean
  isPremiumOnly: boolean
}
