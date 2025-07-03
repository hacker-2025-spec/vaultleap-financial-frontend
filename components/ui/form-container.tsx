"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn, FieldValues, Path, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"

interface FormContainerProps<TFormValues extends FieldValues> {
  defaultValues: Partial<TFormValues>
  schema: z.ZodType<TFormValues>
  onSubmit: SubmitHandler<TFormValues>
  onError?: SubmitErrorHandler<TFormValues>
  children: (form: UseFormReturn<TFormValues>) => React.ReactNode
  className?: string
}

export function FormContainer<TFormValues extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  onError,
  children,
  className,
}: FormContainerProps<TFormValues>) {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as TFormValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className={className}>
        {children(form)}
      </form>
    </Form>
  )
}

// Multi-step form container
interface FormStep<TFormValues extends FieldValues> {
  id: string
  title?: string
  fields: Array<{
    name: Path<TFormValues>
    label?: string
    hidden?: boolean
  }>
}

interface MultiStepFormContainerProps<TFormValues extends FieldValues> {
  defaultValues: Partial<TFormValues>
  schema: z.ZodType<TFormValues>
  steps: FormStep<TFormValues>[]
  onSubmit: SubmitHandler<TFormValues>
  onError?: SubmitErrorHandler<TFormValues>
  children: (form: UseFormReturn<TFormValues> & {
    currentStep: FormStep<TFormValues>
    currentStepIndex: number
    isFirstStep: boolean
    isLastStep: boolean
    goToNextStep: () => void
    goToPreviousStep: () => void
    goToStep: (index: number) => void
  }) => React.ReactNode
  className?: string
}

export function MultiStepFormContainer<TFormValues extends FieldValues>({
  defaultValues,
  schema,
  steps,
  onSubmit,
  onError,
  children,
  className,
}: MultiStepFormContainerProps<TFormValues>) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as TFormValues,
    mode: "onChange",
  })

  const currentStep = steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1)
    }
  }

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index)
    }
  }

  const enhancedForm = {
    ...form,
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className={className}>
        {children(enhancedForm)}
      </form>
    </Form>
  )
}
