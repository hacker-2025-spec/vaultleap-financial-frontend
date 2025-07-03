import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Zap, PieChart } from 'lucide-react'
import { StepperNew } from '@/components/shared/ui/Stepper/StepperNew.component'
import { CreateVaultModalTemplates } from './CreateVaultModalTemplates'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const templates = [
  {
    id: 'quickpay',
    title: 'QuickPay',
    description: 'Instant direct crypto payments to multiple recipients (up to 5 people)',
    icon: <Zap className="h-5 w-5 text-white" />,
    iconBackground: '#3478F6',
  },
  {
    id: 'splitvault',
    title: 'Split Vault',
    description: 'Automatically splits crypto payments among multiple recipients (up to 10 people)',
    icon: <PieChart className="h-5 w-5 text-white" />,
    iconBackground: '#34C759',
  },
]

const steps = [
  { name: 'ABC', id: 1, icon: 1 },
  { name: 'ABC', id: 2, icon: 2 },
  { name: 'ABC', id: 3, icon: 3 },
]

// Define form schema with Zod
const formSchema = z.object({
  vaultType: z.string().min(1, "Please select a vault type"),
})

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const CreateVaultModal = ({ isOpen, onClose }: Props) => {
  const [activeStep, setActiveStep] = useState(0)

  // Create form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    defaultValues: {
      vaultType: '',
    },
    resolver: zodResolver(formSchema),
  })

  const selected = form.watch('vaultType')

  const select = (id: string) => form.setValue('vaultType', id)

  const isNextDisabled = !selected
  const nextButtonText = activeStep === 0 ? 'Next' : 'Finish'
  const cancelButtonText = activeStep === 0 ? 'Close' : 'Back'

  // Handle dialog close
  const handleClose = () => {
    onClose()
    form.reset()
    setActiveStep(0)
  }

  // Reset state when dialog is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose()
    }
  }

  const nextButtonHandler = () => {
    if (activeStep === 0) {
      setActiveStep(1)
      return
    }

    if (activeStep === steps.length - 1) {
      // Complete the vault creation process
      handleClose()
    }
  }

  const handleBackButton = () => {
    if (activeStep === 0) {
      handleClose()
    } else {
      setActiveStep(activeStep - 1)
    }
  }

  const label = `Split Vault Details`
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Vault</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <StepperNew steps={steps} activeStep={activeStep} />

          <div className="text-center font-bold text-base text-gray-800 mb-4">
            {label}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <CreateVaultModalTemplates onSelect={select} templates={templates} selected={selected} />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBackButton}
          >
            {cancelButtonText}
          </Button>

          <Button
            onClick={nextButtonHandler}
            disabled={isNextDisabled}
          >
            {nextButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
