'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { useMaskito } from '@maskito/react'
import { maskitoNumberOptionsGenerator } from '@maskito/kit'

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /**
   * The currency code to use for formatting (e.g., "USD", "EUR", "GBP")
   * @default "USD"
   */
  currency?: string

  /**
   * The locale to use for formatting (e.g., "en-US", "fr-FR")
   * @default "en-US"
   */
  locale?: string

  /**
   * The number of decimal places to display
   * @default 2
   */
  decimalPlaces?: number

  /**
   * Whether to show the currency symbol
   * @default true
   */
  showCurrencySymbol?: boolean

  /**
   * Callback when the numeric value changes
   */
  onValueChange?: (value: number) => void

  /**
   * Callback when the input value changes (includes formatted string)
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      currency = 'USD',
      locale = 'en-US',
      decimalPlaces = 2,
      showCurrencySymbol = true,
      onChange,
      onFocus,
      onValueChange,
      value,
      ...props
    },
    ref
  ) => {
    // Get currency symbol for the given currency and locale
    const getCurrencySymbol = React.useCallback(() => {
      if (!showCurrencySymbol) return ''

      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })

      // Extract just the currency symbol
      const parts = formatter.formatToParts(0)
      const currencyPart = parts.find((part) => part.type === 'currency')
      return currencyPart ? currencyPart.value : '$'
    }, [currency, locale, showCurrencySymbol])

    // Create Maskito options for currency input
    const maskOptions = React.useMemo(() => {
      const currencySymbol = getCurrencySymbol()

      return maskitoNumberOptionsGenerator({
        decimalZeroPadding: true,
        precision: decimalPlaces,
        decimalSeparator: '.',
        thousandSeparator: ',',
        prefix: showCurrencySymbol ? `${currencySymbol} ` : '',
        min: 0,
      })
    }, [getCurrencySymbol, decimalPlaces, showCurrencySymbol])

    // Apply Maskito to the input
    const maskedInputRef = useMaskito({ options: maskOptions })

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        maskedInputRef(node)
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [maskedInputRef, ref]
    )

    // Parse the masked value to get numeric value
    const parseValue = React.useCallback(
      (maskedValue: string): number => {
        if (!maskedValue || maskedValue.trim() === '') return 0

        // Remove currency symbol and spaces, keep only numbers, commas, and decimal point
        const cleanValue = maskedValue
          .replace(new RegExp(`^\\${getCurrencySymbol()}\\s*`), '') // Remove currency symbol and space
          .replace(/,/g, '') // Remove thousand separators
          .replace(/[^\d.-]/g, '') // Remove any other non-numeric characters
          .trim()

        // Handle edge cases
        if (cleanValue === '' || cleanValue === '.' || cleanValue === '-') return 0

        const parsed = parseFloat(cleanValue)
        return isNaN(parsed) ? 0 : parsed
      },
      [getCurrencySymbol]
    )

    // Handle input changes
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = e.target.value
        const numericValue = parseValue(maskedValue)

        // Call the numeric value callback
        onValueChange?.(numericValue)

        // Call the original onChange with the masked value
        onChange?.(e)
      },
      [onChange, onValueChange, parseValue]
    )

    // Handle focus to select all text
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Small delay to ensure the mask is applied before selecting
        setTimeout(() => {
          e.target.select()
        }, 0)
        onFocus?.(e)
      },
      [onFocus]
    )

    return (
      <input
        type="text"
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background file:border-0 file:bg-transparent file:text-sm',
          'file:font-medium file:text-foreground placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'text-start text-foreground',
          className
        )}
        ref={combinedRef}
        onChange={handleChange}
        onFocus={handleFocus}
        value={value}
        {...props}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput }
