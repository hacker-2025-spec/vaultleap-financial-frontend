import { UserVaultDto } from '@/store/user/user.types'
import { getFormattedDate } from '@/utils/time'

interface Props {
  vault: UserVaultDto
}

const getRecipientsMeta = (vault: Pick<UserVaultDto, 'roles'>) => {
  const count = vault.roles.length
  return `${count} recipient${count > 1 ? 's' : ''}`
}

const getCreatedDate = (vault: Pick<UserVaultDto, 'createdAt'>) => {
  const date = getFormattedDate(new Date(Number(vault.createdAt)))
  return `Created at ${date}`
}

export const VaultCardMeta = ({ vault }: Props) => {
  const meta = [getRecipientsMeta(vault), getCreatedDate(vault)]

  return (
    <p className="text-sm text-muted-foreground mb-3">
      {meta.map((i, index) => (
        <span key={i}>
          {index > 0 && ' • '}
          {i}
        </span>
      ))}
    </p>
  )
}
