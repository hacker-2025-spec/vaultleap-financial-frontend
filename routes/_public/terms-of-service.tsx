import { createFileRoute } from '@tanstack/react-router'
import { TermsOfServicePage } from '../../views/TermsOfService/TermsOfService.page'

export const Route = createFileRoute('/_public/terms-of-service')({
  component: TermsOfService,
})

function TermsOfService() {
  return <TermsOfServicePage />
}
