import { TemplateType, TShareRole } from './creatorData.types'

type RoleType = Pick<TShareRole, 'sharePercentage' | 'emails'> & { placeholder?: string }

export type TTemplatePlaceholderData = {
  roles: Omit<RoleType, 'emails'>[]
  profitSwitchName?: string
  profitSwitchAmount?: number
}

export type TVaultsTemplatePlaceholderData = {
  roles: RoleType[]
  projectNamePlaceholder?: string
  profitSwitchName?: string
  profitSwitchAmount?: number
}

export type TTemplates = {
  template: TTemplatePlaceholderData[] | TVaultsTemplatePlaceholderData[]
  emptyTemplate: TTemplatePlaceholderData[] | TVaultsTemplatePlaceholderData[]
}

export const CREATIVE_TEAM_TEMPLATES: TTemplatePlaceholderData[] = [
  {
    roles: [
      { placeholder: 'Podcast Host', sharePercentage: 45 },
      { placeholder: 'Audio Engineer', sharePercentage: 25 },
      { placeholder: 'Show Producer', sharePercentage: 30 },
    ],
  },
  {
    roles: [
      { placeholder: 'Podcast Host', sharePercentage: 45 },
      { placeholder: 'Audio Engineer', sharePercentage: 30 },
      { placeholder: 'Music Composer', sharePercentage: 25 },
    ],
  },
  {
    roles: [
      { placeholder: 'Your Role Name', sharePercentage: 50 },
      { placeholder: 'Your Role Name', sharePercentage: 50 },
    ],
  },
]

export const CREATIVE_EMPTY_TEAM_TEMPLATES: TTemplatePlaceholderData[] = [
  {
    roles: [
      { placeholder: 'Your Role Name', sharePercentage: 50 },
      { placeholder: 'Your Role Name', sharePercentage: 50 },
    ],
  },
]

export const SINGLE_VAULTS_TEMPLATES: TVaultsTemplatePlaceholderData[] = [
  {
    projectNamePlaceholder: 'Lawyer',
    roles: [
      { placeholder: 'Sarah Klein', sharePercentage: 100, emails: ['sarah@lawyer.com'] },
    ],
  },
  {
    projectNamePlaceholder: 'Marketing Consultant',
    roles: [
      { placeholder: 'Jeff Biggs', sharePercentage: 100, emails: ['jeff@marketing.com'] },
    ],
  },
  {
    projectNamePlaceholder: 'Software Engineer',
    roles: [
      { placeholder: 'Bartek Soren', sharePercentage: 100, emails: ['bartek@software.com'] },
    ],
    // profitSwitchAmount: 1000,
    // profitSwitchName: 'Summer Target',
  }
]

export const SINGLE_EMPTY_VAULTS_TEMPLATES: TVaultsTemplatePlaceholderData[] = [
  {
    projectNamePlaceholder: 'Your Vault Name',
    roles: [
      { placeholder: 'Your Role Name', sharePercentage: 100, emails: [] },
    ],
  },
]

export const SELF_MANAGED_VAULT_TEMPLATE: TVaultsTemplatePlaceholderData = {
  projectNamePlaceholder: 'Your Company Name',
  roles: [{ sharePercentage: 100, emails: [' '] }],
}


export const SELF_MANAGED_EMPTY_VAULT_TEMPLATE: TVaultsTemplatePlaceholderData = {
  projectNamePlaceholder: 'Your Company Name',
  roles: [{ sharePercentage: 100, emails: [' '] }],
}


export const CREATOR_TEMPLATES_DATA: Record<TemplateType, TTemplates> = {
  [TemplateType.SPLIT_PAYMENTS]: {
    template: CREATIVE_TEAM_TEMPLATES,
    emptyTemplate: CREATIVE_EMPTY_TEAM_TEMPLATES,
  },
  [TemplateType.SINGLE_PAYMENT]: {
    template: SINGLE_VAULTS_TEMPLATES,
    emptyTemplate: SINGLE_EMPTY_VAULTS_TEMPLATES,
  },
  [TemplateType.SELF_MANAGED]: {
    template: [SELF_MANAGED_VAULT_TEMPLATE],
    emptyTemplate: [SELF_MANAGED_EMPTY_VAULT_TEMPLATE]
  },
  [TemplateType.NONE]: {
    template: [],
    emptyTemplate: []
  },
}
