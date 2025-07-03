'use client'

import * as React from 'react'
import {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperIndicator,
  StepperTitle
} from '@/components/ui/stepper'
import { CheckIcon } from 'lucide-react'

interface Props {
  steps: { icon: React.ReactNode; name: string }[]
  activeStep: number
  className?: string
}

export const StepperNew = ({ steps, activeStep, className }: Props) => {
  return (
    <div className={`w-full ${className || ''}`}>
      <Stepper value={activeStep} className="w-full">
        {steps.map(({ name, icon }, index) =>
        {
          const iconCompleted = icon ??  <CheckIcon className={"text-white"}/>
          return (<React.Fragment key={name}>
            {index > 0 && <StepperSeparator />}
            <StepperItem
              step={index}
              completed={index < activeStep}
            >
              <StepperIndicator >
                {index > activeStep ? iconCompleted : null}
              </StepperIndicator>
              <div className="flex flex-row gap-0.5">
                <StepperTitle className={index === activeStep ? 'text-foreground' : 'text-muted-foreground'}>
                  {name}
                </StepperTitle>
              </div>
            </StepperItem>
          </React.Fragment>)
        })}
      </Stepper>
    </div>
  )
}
