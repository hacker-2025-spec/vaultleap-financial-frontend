import React from 'react'

export type TContentBoxVariant = 'default' | 'dark' | 'light' | 'creator' | 'transparent' | 'black' | 'containerBlack' | 'darker'

export type ContentBoxComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  variant: TContentBoxVariant
  tooltipText?: string
  tooltipVariant?: TContentBoxVariant
  showWhiteTooltip?: boolean
  placement?: 'top' | 'right' | 'bottom' | 'left'
}
