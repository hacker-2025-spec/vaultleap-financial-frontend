interface StepItem {
  name: string
}

export interface RadialStepperProps {
  steps: StepItem[]
  activeStep: number
  fullWidth?: boolean
}