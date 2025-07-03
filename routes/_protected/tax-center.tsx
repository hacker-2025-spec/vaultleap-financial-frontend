import { createFileRoute } from '@tanstack/react-router'
import { DashboardReportsContainer } from '@/components/features/tax/Reports/Reports.container.tsx'

export const Route = createFileRoute('/_protected/tax-center')({
  component: TaxCenter,
})

function TaxCenter() {
  return <DashboardReportsContainer />
}
