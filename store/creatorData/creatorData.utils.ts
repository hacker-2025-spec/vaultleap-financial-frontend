import { v4 as uuid4 } from 'uuid'

import { CREATIVE_TEAM_TEMPLATES, TTemplatePlaceholderData, TVaultsTemplatePlaceholderData } from './creatorData.const'

export const initialRoles = () => CREATIVE_TEAM_TEMPLATES[0].roles.map((role) => ({ ...role, id: uuid4(), count: 1, emails: [], name: '' }))

export const getNewRoles = (rolesData: Pick<TTemplatePlaceholderData, 'roles'>) => rolesData.roles.map((role) => ({ ...role, id: uuid4(), count: 1, emails: [], name: '' }))

export const getNewVaults = (vaults: TVaultsTemplatePlaceholderData[]) => vaults.map((vault) => ({
  projectName: '',
  projectNamePlaceholder: vault.projectNamePlaceholder || '',
  isProfitSwitchActive: !!vault.profitSwitchName && !!vault.profitSwitchAmount,
  profitSwitchName: vault.profitSwitchName || '',
  profitSwitchAmount: vault.profitSwitchAmount || 0,
  profitSwitchAddress: '',
  roles: vault.roles.map((role) => ({ ...role, id: uuid4(), count: 1, name: '' }))
}))
