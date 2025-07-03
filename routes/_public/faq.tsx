import { createFileRoute } from '@tanstack/react-router'
import FAQ from '@/components/features/landing-new/components/FAQ'

export const Route = createFileRoute('/_public/faq')({
  component: FAQ,
})
