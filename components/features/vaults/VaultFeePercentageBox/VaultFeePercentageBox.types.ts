import React from 'react'

export interface VaultFeePercentageBoxComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  //eslint-disable-next-line
  sliderProps: any
  actualPercentage?: number
  formatPercent?: (value: number) => string
}
