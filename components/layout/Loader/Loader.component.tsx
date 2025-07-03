import React from 'react'
import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LoaderComponentProps } from './Loader.types'

export const LoaderComponent: React.FC<LoaderComponentProps> = ({ className, color, ...props }) => {
  return (
    <div
      className={cn(
        "w-full min-h-[60vh] flex justify-center items-center",
        className
      )}
      {...props}
    >
      <Loader
        className={cn(
          "h-12 w-12 animate-spin",
          color === 'primary' ? 'text-primary' :
          color === 'secondary' ? 'text-secondary' :
          color === 'error' ? 'text-destructive' :
          color === 'info' ? 'text-primary' :
          color === 'success' ? 'text-green-500' :
          color === 'warning' ? 'text-yellow-500' :
          'text-primary'
        )}
      />
    </div>
  )
}
