import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const config: Record<string, { title: string; className: string }> = {
  inactive: {
    title: 'Inactive',
    className: 'bg-gray-100/80 text-gray-500 border-gray-200/50',
  },
  active: {
    title: 'Active',
    className: 'bg-green-100/50 text-green-600 border-green-200/50',
  },
  notAvailable: {
    title: 'Not Available',
    className: 'bg-gray-100/80 text-gray-500 border-gray-200/50',
  },
}

interface Props {
  status: keyof typeof config
}

export const ProductStatusLabel = ({ status }: Props) => {
  const content = config[status] || config.inactive
  return (
    <Badge
      variant="outline"
      className={cn(
        'absolute top-3 right-3 px-4 py-1.5 text-xs font-medium rounded-md border border-transparent',
        content.className
      )}
    >
      {content.title}
    </Badge>
  )
}
