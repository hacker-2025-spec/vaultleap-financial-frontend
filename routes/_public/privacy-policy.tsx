import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '../../views/PrivacyPolicy/PrivacyPolicy.page'

export const Route = createFileRoute('/_public/privacy-policy')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}
