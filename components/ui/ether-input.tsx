'use client'

import * as React from 'react'
import { useMaskito } from '@maskito/react'
import { maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin, maskitoCaretGuard, maskitoPrefixPostprocessorGenerator } from '@maskito/kit'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import type { MaskitoElement, MaskitoOptions } from '@maskito/core'

// Create a preprocessor for complete insertion
const createCompleteEtherAddressInsertionPreprocessor = () => {
  return (value: string, config: { selection: { start: number; end: number } }) => {
    // If pasting a complete Ethereum address, handle it specially
    if (/^0x[a-f0-9]{40}$/i.test(value)) {
      return {
        value,
        selection: { start: value.length, end: value.length },
      }
    }
    return { value, selection: config.selection }
  }
}

interface EtherInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void
  onValueChange?: (value: string) => void
  error?: boolean
}

export function EtherInput({ className, onChange, onValueChange, error, ...props }: EtherInputProps) {
  // Create Maskito options for Ethereum address
  const maskOptions = React.useMemo<MaskitoOptions>(() => {
    return {
      mask: (elementState: MaskitoElement) => {
        let value = elementState.value

        // Always start with 0x
        if (!value.startsWith('0x')) {
          value = '0x' + value.replace(/^0x/i, '')
        }

        // Limit to 42 characters (0x + 40 hex chars)
        if (value.length > 42) {
          value = value.substring(0, 42)
        }

        // Only allow hex characters after 0x
        value = '0x' + value.substring(2).replace(/[^a-f0-9]/gi, '')

        return value
      },
      preprocessors: [createCompleteEtherAddressInsertionPreprocessor()],
      postprocessors: [maskitoPrefixPostprocessorGenerator('0x')],
      plugins: [
        // Add 0x prefix when input gets focus if it's empty
        maskitoAddOnFocusPlugin('0x'),

        // Remove the entire value on blur if only the prefix is present
        maskitoRemoveOnBlurPlugin('0x'),

        // Prevent caret from being placed before the prefix
        maskitoCaretGuard((value, { start, end }) => {
          const prefixLength = 2 // '0x'

          if (start < prefixLength || end < prefixLength) {
            return { start: prefixLength, end: prefixLength }
          }

          return { start, end }
        }),
      ],
    }
  }, [])

  // Apply Maskito to the input
  const maskedInputRef = useMaskito({ options: maskOptions })

  // Handle input changes
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      // Call the value change callback
      onValueChange?.(value)

      // Call the original onChange with the event
      if (onChange) {
        onChange(value)
      }
    },
    [onChange, onValueChange]
  )

  return (
    <Input
      ref={maskedInputRef}
      type="text"
      className={cn(error && 'border-red-500 focus-visible:ring-red-300', className)}
      onChange={handleChange}
      placeholder="0x..."
      {...props}
    />
  )
}
