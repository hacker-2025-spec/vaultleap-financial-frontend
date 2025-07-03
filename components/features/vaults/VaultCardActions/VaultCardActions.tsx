import { UserVaultDto, VaultUserRole } from '@/store/user/user.types'
import { FundVaultModalButton } from '@/components/features/vaults/FundVaultModalButton/FundVaultModalButton'
import { ClaimFundsModalButton } from '@/components/features/vaults/ClaimFundsModalButton/ClaimFundsModalButton'
import { VaultDetailsModalButton } from '../VaultDetailsModalButton/VaultDetailsModalButton'

interface Props {
  vault: UserVaultDto
}

export const VaultCardActions = ({ vault }: Props) => {
  return (
    <div className="flex gap-2 flex-nowrap items-center justify-start">
      {vault.roleRelativeToUser === VaultUserRole.MANAGER && <FundVaultModalButton vault={vault} />}
      <ClaimFundsModalButton vault={vault} />
      <div className="ml-auto">
        <VaultDetailsModalButton vault={vault} />
      </div>
    </div>
  )
}
