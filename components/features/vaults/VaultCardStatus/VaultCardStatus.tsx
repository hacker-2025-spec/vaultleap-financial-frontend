import { UserVaultDto, VaultUserRole } from '@/store/user/user.types'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle } from 'lucide-react'

const getStatus = (
  vault: Pick<UserVaultDto, 'claimable'>
): {
  variant: 'default' | 'destructive' | 'secondary' | 'outline'
  content: string
  icon: React.ReactNode
} => {
  if (vault.claimable == '0') {
    return {
      variant: 'secondary',
      content: 'All Funds Claimed',
      icon: <CheckCircle className="h-3 w-3 mr-1" />
    }
  }

  return {
    variant: 'outline',
    content: 'Has Pending Claims',
    icon: <AlertCircle className="h-3 w-3 mr-1" />
  }
}

interface Props {
  vault: Pick<UserVaultDto, 'claimable' | 'roleRelativeToUser'>
}

export const VaultCardStatus = ({ vault }: Props) => {
  if (vault.roleRelativeToUser === VaultUserRole.MANAGER) {
    return null
  }

  const { variant, content, icon } = getStatus(vault)

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {content}
    </Badge>
  )
}
