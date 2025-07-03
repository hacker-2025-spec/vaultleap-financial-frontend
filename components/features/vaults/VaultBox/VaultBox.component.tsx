import React from 'react'
import { FieldValues } from 'react-hook-form'
import { Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { VaultBoxComponentProps } from './VaultBox.types'

export const VaultBoxComponent = <FormValues extends FieldValues = FieldValues>({
  counter,
  vaultName,
  vaultTextInputProps,
  roleName,
  roleTextInputProps,
  email,
  emailTextInputProps,
  handleRemove,
  ...props
}: VaultBoxComponentProps<FormValues>) => {
  const isDownMd = useMediaQuery('(max-width: 768px)')
  const isDownSm = useMediaQuery('(max-width: 640px)')

  return (
    <Card className="p-4 md:pr-8 space-y-4">
      <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2 md:gap-4">
        <div className="flex-1" />

        <div className="flex-1 flex justify-center items-center bg-[#15405E] rounded">
          <div className="flex-grow px-2 text-[#e8e8e8]">
            Vault {counter + 1}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 bg-[#2595EB] hover:bg-[#047bb2] rounded text-black"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2 md:gap-4">
        <Label className="flex-1 text-[#e8e8e8] text-base">
          {vaultName}
        </Label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row flex-1 gap-3 items-start w-full">
                <Input
                  {...vaultTextInputProps.inputProps}
                  className="flex-1 bg-white/10 border-white/20 text-white"
                  placeholder={vaultTextInputProps.placeholder}
                  onChange={(e) => vaultTextInputProps.onChange && vaultTextInputProps.onChange(e)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#0c5186] text-xs rounded-lg p-1">
              Notice: This name will be recorded as your Vault Key's identifier on the blockchain
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2 md:gap-4">
        <Label className="flex-1 text-[#e8e8e8] text-base">
          {roleName}
        </Label>

        <div className="flex flex-row flex-1 gap-3 items-start w-full">
          <Input
            {...roleTextInputProps.inputProps}
            className="flex-1 bg-white/10 border-white/20 text-white"
            placeholder={roleTextInputProps.placeholder}
            onChange={(e) => roleTextInputProps.onChange && roleTextInputProps.onChange(e)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2 md:gap-4">
        <Label className="flex-1 text-[#e8e8e8] text-base">
          {email}
        </Label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row flex-1 gap-3 items-start w-full">
                <Input
                  {...emailTextInputProps.inputProps}
                  className="flex-1 bg-white/10 border-white/20 text-white"
                  placeholder={emailTextInputProps.placeholder}
                  onChange={(e) => emailTextInputProps.onChange && emailTextInputProps.onChange(e)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#0c5186] text-xs rounded-lg p-1">
              Notice: The Vault Key will be delivered to this email address. Please verify to ensure proper delivery.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  )
}
