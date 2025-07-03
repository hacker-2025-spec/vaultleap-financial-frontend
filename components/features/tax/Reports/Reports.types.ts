import { TaxFormVaultInfoDto } from '@klydo-io/getrewards-backend-api'

export type DashboardReportsComponentProps = {
  taxForms: TaxFormVaultInfoDto[]
  taxFormId: string
  handleRequestAccess: (taxFormId: string) => void
  isRequestAccessLoading: boolean
}
