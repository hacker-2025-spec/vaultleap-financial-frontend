"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Dynamic import type for Fuse.js
type FuseType = typeof import('fuse.js').default

export interface ComboboxOption {
  value: string
  label: string
  hidden?: boolean
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  triggerClassName?: string
  contentClassName?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  className,
  disabled = false,
  triggerClassName,
  contentClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [Fuse, setFuse] = React.useState<FuseType | null>(null)

  // Dynamically import Fuse.js
  React.useEffect(() => {
    const loadFuse = async () => {
      try {
        const FuseModule = await import('fuse.js')
        setFuse(() => FuseModule.default)
      } catch (error) {
        console.error('Failed to load Fuse.js:', error)
      }
    }
    loadFuse()
  }, [])

  // Filter out hidden options
  const visibleOptions = options.filter(option => !option.hidden)

  // Fuzzy search with Fuse.js or fallback to simple filter
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return visibleOptions
    }

    if (Fuse) {
      // Use Fuse.js for fuzzy search
      const fuse = new Fuse(visibleOptions, {
        keys: ['label', 'value'],
        threshold: 0.6, // Lower = more strict matching
        includeScore: true,
        minMatchCharLength: 1,
      })

      const results = fuse.search(searchTerm)
      return results.map(result => result.item)
    } else {
      // Fallback to simple string matching
      return visibleOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }, [visibleOptions, searchTerm, Fuse])

  // Find the selected option
  const selectedOption = visibleOptions.find(option => option.value === value)

  const handleSelect = (currentValue: string) => {
    // Prevent event propagation to avoid triggering parent click handlers
    const newValue = currentValue === value ? "" : currentValue
    console.log('🔍 Combobox handleSelect:', { currentValue, newValue, previousValue: value })
    onValueChange?.(newValue)
    setOpen(false)
  }

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              !selectedOption && "text-muted-foreground",
              triggerClassName
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-[var(--radix-popover-trigger-width)] p-0 z-50", contentClassName)}
          align="start"
          side="bottom"
        >
          <Command shouldFilter={false} className="w-full !px-0">
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchTerm}
              onValueChange={handleSearchChange}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={(value) => {
                      console.log('🔍 CommandItem onSelect:', value)
                      handleSelect(value)
                    }}
                    className="gap-1 px-0"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
