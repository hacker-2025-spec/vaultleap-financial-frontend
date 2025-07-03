'use client'

import * as React from 'react'
import {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperIndicator,
  StepperTitle
} from '@/components/ui/stepper'

interface Props {
  steps: { icon: React.ReactNode; name: string }[]
  activeStep: number
  size?: 's' | 'm'
  className?: string
}

export const CustomizedStepper = ({ steps, size = 'm', activeStep, className }: Props) => {
  return (
    <div className={`w-full ${className || ''}`}>
      <Stepper value={activeStep} className="w-full">
        {steps.map(({ name, icon }, index) => (
          <React.Fragment key={name}>
            {index > 0 && <StepperSeparator />}
            <StepperItem
              step={index}
              completed={index < activeStep}
            >
              <StepperIndicator
                asChild={index < activeStep || index > activeStep}
                className={size === 's' ? 'size-5' : 'size-10'}
              >
                {index === activeStep ? icon : null}
              </StepperIndicator>
              <div className="flex flex-col gap-0.5">
                <StepperTitle
                  className={`text-muted-foreground ${size === 's' ? 'mt-2.5' : 'mt-4'}`}
                >
                  {name}
                </StepperTitle>
              </div>
            </StepperItem>
          </React.Fragment>
        ))}
      </Stepper>
    </div>
  )
}
