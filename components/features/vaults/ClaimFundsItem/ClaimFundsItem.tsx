import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface Props {
  txInfo: {
    projectName: string
    amount: string
    sender: string
    createdAt?: number
  }
}

export const ClaimFundsItem = ({ txInfo: { projectName, amount, sender } }: Props) => {
  const meta = {
    ago: '2 days ago',
  }

  const claim = () => {}

  return (
    <div className="p-3 border border-border rounded-lg mb-3 flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-[15px] mb-1">
          {projectName}
        </h4>
        <p className="text-xs text-muted-foreground mb-1">
          Funded by: {sender} • {meta.ago}
        </p>
        <p className="font-semibold text-green-500">
          {amount}
        </p>
      </div>
      <Button onClick={claim} size="sm" className="flex items-center gap-1">
        <Download className="h-3.5 w-3.5" />
        Claim
      </Button>
    </div>
  )
}
