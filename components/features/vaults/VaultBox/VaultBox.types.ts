import { FieldError, FieldValues } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

// Define a simplified version of the input props
export interface CustomInputProps<FormValues extends FieldValues = FieldValues> {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type VaultBoxComponentProps<FormValues extends FieldValues = FieldValues> = {
  counter: number
  vaultName: string
  vaultTextInputProps: CustomInputProps<FormValues>
  roleName: string
  roleTextInputProps: CustomInputProps<FormValues>
  email: string
  emailTextInputProps: CustomInputProps<FormValues>
  handleRemove: () => void
  inputError?: FieldError
}
