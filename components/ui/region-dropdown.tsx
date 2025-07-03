import { useEffect, useMemo, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'

//@ts-ignore
import countryRegionData from 'country-region-data/dist/data-umd'

export interface Region {
  name: string
  shortCode: string
}

export interface CountryRegion {
  countryName: string
  countryShortCode: string
  regions: Region[]
}

interface RegionSelectProps {
  countryCode: string
  priorityOptions?: string[]
  whitelist?: string[]
  blacklist?: string[]
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  textPlaceholder?: string
  disabled?: boolean
  value?: string
}

function RegionSelect({
  countryCode,
  priorityOptions: _priorityOptions = [],
  whitelist: _whitelist = [],
  blacklist: _blacklist = [],
  onChange = () => {},
  className,
  placeholder = 'Region',
  textPlaceholder = 'Region',
  disabled = false,
  value,
}: RegionSelectProps) {
  // Note: priorityOptions, whitelist, blacklist are kept for API compatibility but not used in current implementation
  const [open, setOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(undefined)
  const regions =
    countryRegionData?.find((country: CountryRegion) => country?.countryShortCode === countryCode)?.regions ?? ([] as Region[])
  console.log('regions', regions)
  const region = useMemo(() => regions.find((r: Region) => r.shortCode === value), [regions, value])

  useEffect(() => {
    if (!region) {
      setSelectedRegion(undefined)
    }
  }, [countryCode, region])

  // Update selected region when value prop changes
  useEffect(() => {
    if (value && region) {
      setSelectedRegion(region)
    }
  }, [value, region])

  const handleSelect = (regionCode: string) => {
    const region = regions.find((r: Region) => r.shortCode === regionCode)
    if (region) {
      setSelectedRegion(region)
      onChange(region.shortCode)
      setOpen(false)
    }
  }

  const triggerClasses = cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    className
  )

  // If no regions are found, display a text input instead
  if (!regions || regions.length === 0) {
    return (
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={textPlaceholder}
        disabled={disabled}
        className={className}
      />
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={triggerClasses} disabled={disabled}>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{selectedRegion ? selectedRegion.name : placeholder}</span>
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent collisionPadding={10} side="bottom" className="w-full p-0">
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList className="w-full">
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search region..." />
            </div>
            <CommandEmpty>No region found.</CommandEmpty>
            <CommandGroup className="w-full">
              {regions.map((region: Region) => (
                <CommandItem
                  key={region.shortCode}
                  className="flex items-center w-full gap-2"
                  onSelect={() => handleSelect(region.shortCode)}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{region.name}</span>
                  <Check
                    className={cn('ml-auto h-4 w-4 shrink-0', region.shortCode === selectedRegion?.shortCode ? 'opacity-100' : 'opacity-0')}
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

export default RegionSelect
