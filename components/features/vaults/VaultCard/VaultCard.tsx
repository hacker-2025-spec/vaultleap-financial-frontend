import { Card } from '@/components/ui/card'
import { VaultCardStatus } from '../VaultCardStatus/VaultCardStatus'
import { UserVaultDto } from '@/store/user/user.types'
import { VaultCardActions } from '../VaultCardActions/VaultCardActions'
import { VaultCardMeta } from '../VaultCardMeta/VaultCardMeta'

interface Props {
  vault: UserVaultDto
}
export const VaultCard = ({ vault }: Props) => {
  return (
    <Card
      className="flex flex-col gap-5 p-5 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
    >
      {vault.selfManaged && <span className="text-sm text-muted-foreground">self managed</span>}
      {vault.heldBySelf && <span className="text-sm text-muted-foreground">for self</span>}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {vault.projectName}
        </h3>
        <VaultCardMeta vault={vault} />
        <VaultCardStatus vault={vault} />
      </div>
      <VaultCardActions vault={vault} />
    </Card>
  )
}
