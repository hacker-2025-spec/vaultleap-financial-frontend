import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// FAQ items
const faqItems = [
  {
    question: 'What is USDC?',
    answer:
      "USDC (USD Coin) is a digital stablecoin pegged to the U.S. dollar, meaning 1 USDC is designed to maintain a value of $1 USD. It's fully backed by cash and short-dated U.S. government obligations, making it a stable and reliable digital currency for business transactions.",
  },
  {
    question: 'Do I need a web3 wallet?',
    answer:
      "No, you don't need to install a separate web3 wallet to use Vaultleap. We provide a built-in wallet solution that makes it easy to manage your funds without requiring technical knowledge of blockchain technology.",
  },
  {
    question: 'How do I withdraw funds?',
    answer:
      'To withdraw funds from your Vaultleap account, navigate to your Wallet page, click on "Withdraw", enter the amount you wish to withdraw, and select your connected bank account as the destination. The funds will typically arrive in your bank account within 1-3 business days.',
  },
  {
    question: 'What are 1099-NEC, W8-BEN, and W8-BEN-E tax forms?',
    answer:
      'These are tax forms required for proper tax reporting. The 1099-NEC is used to report payments made to independent contractors. W8-BEN is for foreign individuals, while W8-BEN-E is for foreign entities, both certifying that the holder is not subject to U.S. tax withholding.',
  },
  {
    question: 'Is my personal information safe?',
    answer:
      'At Vaultleap, the security and privacy of your personal information is our top priority. We adhere to strict data privacy regulations and industry best practices. Our data handling procedures are designed to minimize risk and maximize protection, ensuring that your personal information is safeguarded at every step.',
  },
]

export const HelpCenter: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Card className="flex flex-col gap-6">
      <CardContent className="flex flex-col gap-6 pt-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground m-0">Help Center / FAQ</h2>
        </div>

        <div className="flex flex-col gap-3">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border/30 rounded-lg mb-2 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 text-base font-medium hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => navigate({ to: '/help-center' })} className="h-11 text-base">
            View Full Help Center
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
