'use client'

import * as React from 'react'
import { RadialStepperProps } from './RadialStepper.types'

export function RadialStepper({
  steps,
  activeStep,
  fullWidth
}: RadialStepperProps) {
  const stepNumber = activeStep + 1
  const totalSteps = steps.length
  const progress = (stepNumber / totalSteps) * 100

  return (
    <div className={`flex items-center gap-6 ${fullWidth ? 'w-full justify-between' : ''}`}>
      <div className="relative flex w-[70px] h-[70px]">
        {/* Background circle */}
        <div className="absolute inset-0 flex items-center justify-center z-[-1]">
          <div className="w-full h-full rounded-full bg-gray-200"></div>
        </div>

        {/* Progress circle */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#2595EB ${progress}%, transparent ${progress}%)`,
          }}
        ></div>

        {/* Text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium">
            {`${stepNumber} of ${totalSteps}`}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-white">
          {steps[activeStep].name}
        </h3>
        <p className="text-xs text-white">
          Next: {steps[activeStep + 1]?.name ?? 'Finish!'}
        </p>
      </div>
    </div>
  )
}