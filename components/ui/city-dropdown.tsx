'use client'

import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'

// Import from country-state-city package
import { City as CityAPI } from 'country-state-city'

export interface City {
  name: string
}

interface CitySelectProps {
  countryCode: string
  regionCode: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  value?: string
  disabled?: boolean
}

function CitySelect({
  countryCode,
  regionCode,
  onChange = () => {},
  className,
  placeholder = 'City',
  value,
  disabled = false,
}: CitySelectProps) {
  const [cities, setCities] = useState<City[]>([])
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)

  useEffect(() => {
    if (!countryCode || !regionCode) {
      setCities([])
      return
    }

    // Use the country-state-city package to get cities
    const citiesData = CityAPI.getCitiesOfState(countryCode, regionCode)

    if (citiesData && citiesData.length > 0) {
      // Map the city data to match our interface
      setCities(citiesData.map(city => ({ name: city.name })))

      // Only reset selected city if we don't have a value prop
      // This prevents losing selection when navigating between steps
      if (!value) {
        setSelectedCity(undefined)
      }
    } else {
      setCities([])
    }
  }, [countryCode, regionCode])

  // Set the selected city when value changes from outside
  useEffect(() => {
    if (value && cities.length > 0) {
      const city = cities.find(c => c.name === value)
      if (city) {
        setSelectedCity(city)
      }
    }
  }, [value, cities])

  const handleSelect = (cityName: string) => {
    const city = cities.find(c => c.name === cityName)
    if (city) {
      setSelectedCity(city)
      // Call onChange with the city name without affecting the region value
      if (onChange) {
        onChange(city.name)
      }
      setOpen(false)
    }
  }

  const triggerClasses = cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    className
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={triggerClasses} disabled={disabled}>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {selectedCity ? selectedCity.name : placeholder}
        </span>
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent collisionPadding={10} side="bottom" className="w-full p-0">
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList className="w-full">
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search city..." />
            </div>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup className="w-full">
              {cities.map((city, index) => (
                <CommandItem
                  key={`${city.name}-${index}`}
                  className="flex items-center w-full gap-2"
                  onSelect={() => handleSelect(city.name)}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{city.name}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4 shrink-0',
                      city.name === selectedCity?.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CitySelect
