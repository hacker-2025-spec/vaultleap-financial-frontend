import React from 'react'
import { Slider } from '@/components/ui/slider'
import { Typography } from '@/components/ui/typography'
import { ContentBoxComponent } from '@/components/shared/ui/ContentBox/index'
import { VaultFeePercentageBoxComponentProps } from './VaultFeePercentageBox.types'

export const VaultFeePercentageBoxComponent: React.FC<VaultFeePercentageBoxComponentProps> = ({
  name,
  sliderProps,
  actualPercentage,
  formatPercent,
  className,
  ...props
}) => {
  return (
    <ContentBoxComponent
      variant="light"
      className={`flex flex-col sm:flex-row gap-2 sm:gap-0 items-start justify-between ${className}`}
      {...props}
    >
      <Typography variant="large" className="text-white flex-2">
        {name}
      </Typography>
      <div className="flex flex-3 gap-2 flex-row items-center w-full">
        <Slider
          className="w-full h-[30px]"
          value={[sliderProps.value]}
          min={sliderProps.min}
          max={sliderProps.max}
          step={sliderProps.step}
          onValueChange={(value) => sliderProps.onChange({ target: { value: value[0] } })}
        />
        <div className="bg-[#2595EB] rounded-md border border-black px-1 flex-shrink-0 w-16 items-center flex justify-center">
          <Typography className="text-black">
            {formatPercent?.(sliderProps.value) ?? sliderProps.value}%
          </Typography>
        </div>
      </div>
    </ContentBoxComponent>
  )
}
