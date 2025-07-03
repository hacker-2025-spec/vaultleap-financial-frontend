import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const config: Record<string, { className: string }> = {
  premium: {
    className: 'bg-amber-100/50 text-amber-600 border-amber-200/50'
  },
  included: {
    className: 'bg-green-100/50 text-green-600 border-green-200/50'
  },
  core: {
    className: 'bg-primary/10 text-primary border-primary/20'
  },
}

interface Props {
  tag: string
}

export const ProductTag = ({ tag }: Props) => {
  const tagConfig = config[tag.toLowerCase()] || config.core
  return (
    <Badge
      variant="outline"
      className={cn(
        'px-4 py-1.5 text-xs font-medium rounded-md border border-transparent',
        tagConfig.className
      )}
    >
      {tag}
    </Badge>
  )
}
