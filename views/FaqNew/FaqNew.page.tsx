'use client'

import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { SectionCard } from '@/components/layout/SectionCard/SectionCard'
import { SubSection } from '@/components/layout/SubSection/SubSection'

import {
  GLOSSARY,
  WHAT_IS_USDC,
  EMAIL_SAFETY_TEXT,
  PAY_GAS_FEES_TEXT,
  CREATION_HELP_TEXT,
  ARE_YOU_AUDITED_TEXT,
  CAN_I_EDIT_VAULTLEAP,
  I_HAVE_SOME_FEEDBACK,
  QUESTION_OUTSIDE_FAQ,
  WHAT_IS_1099_NEC_TEXT,
  HOW_DO_I_WITHDRAW_TEXT,
  WHAT_IS_VAULT_FEE_TEXT,
  ARE_THE_FUNDS_LOST_TEXT,
  WALLET_SAFETY_TOOLS_TEXT,
  CAN_I_USE_OWN_WALLET_TEXT,
  HOW_TO_FUND_VAULTLEAP_TEXT,
  I_SENT_TO_MUCH_TO_THE_VAULT,
  WHAT_IS_PROFIT_SWIITCH_TEXT,
  WHEN_WILL_RECEIVE_TAX_FORMS,
  PERSONAL_INFORMATION_SAFE_TEXT,
  DO_I_NEED_TO_INSTALL_WALLET_TEXT,
  IS_VAULTLEAP_LEGALLY_COMPLIANT_TEXT,
} from '../Faq/Faq.texts'

const faqItems = [
  {
    question: 'Do I need a web3 wallet?',
    answer: DO_I_NEED_TO_INSTALL_WALLET_TEXT,
  },
  {
    question: 'Can I transfer Vault Keys to another wallet?',
    answer: CAN_I_USE_OWN_WALLET_TEXT,
  },
  {
    question: 'Do I need to pay Gas Fees?',
    answer: PAY_GAS_FEES_TEXT,
  },
  {
    question: 'How do I fund my Vaultleap Vault?',
    answer: HOW_TO_FUND_VAULTLEAP_TEXT,
  },
  {
    question: 'Can I add someone to my existing Vault?',
    answer: CAN_I_EDIT_VAULTLEAP,
  },
  {
    question: 'What are 1099-NEC, W8-BEN, and W8-BEN-E tax forms?',
    answer: WHAT_IS_1099_NEC_TEXT,
  },
  {
    question: 'When will I receive my 1099 NEC Tax Forms?',
    answer: WHEN_WILL_RECEIVE_TAX_FORMS,
  },
  {
    question: 'I sent the wrong amount to my Vault',
    answer: I_SENT_TO_MUCH_TO_THE_VAULT,
  },
  {
    question: 'A member in my Vault hasn\'t claimed their Vault Key in 18 months.',
    answer: ARE_THE_FUNDS_LOST_TEXT,
  },
  {
    question: 'Klydo\'s commitment to Compliance',
    answer: IS_VAULTLEAP_LEGALLY_COMPLIANT_TEXT,
  },
  {
    question: 'Is my personal information safe?',
    answer: PERSONAL_INFORMATION_SAFE_TEXT,
  },
  {
    question: 'Are you audited?',
    answer: ARE_YOU_AUDITED_TEXT.part1,
    hyperlink: ARE_YOU_AUDITED_TEXT.hyperlink,
    hyperlinkText: ARE_YOU_AUDITED_TEXT.hyperlinkText,
  },
  {
    question: 'I received an email from this site, how do I know it\'s safe?',
    answer: EMAIL_SAFETY_TEXT,
  },
  {
    question: 'Do you recommend any wallet safety tools?',
    answer: WALLET_SAFETY_TOOLS_TEXT,
  },
  {
    question: 'Can I get help with creating a Vault?',
    answer: CREATION_HELP_TEXT,
  },
  {
    question: 'How do I transfer funds?',
    answer: HOW_DO_I_WITHDRAW_TEXT,
  },
  {
    question: 'What is the Profit Switch feature?',
    answer: WHAT_IS_PROFIT_SWIITCH_TEXT,
  },
  {
    question: 'Transaction Fees',
    answer: WHAT_IS_VAULT_FEE_TEXT,
  },
  {
    question: 'What is USDC?',
    answer: WHAT_IS_USDC,
  },
  {
    question: 'Glossary',
    answer: GLOSSARY,
  },
  {
    question: 'I have some feedback',
    answer: I_HAVE_SOME_FEEDBACK.part1,
    hyperlink: I_HAVE_SOME_FEEDBACK.hyperlink,
    hyperlinkText: I_HAVE_SOME_FEEDBACK.hyperlinkText,
  },
  {
    question: 'I have a question not mentioned in the FAQ',
    answer: QUESTION_OUTSIDE_FAQ.part1,
    hyperlink: QUESTION_OUTSIDE_FAQ.hyperlink,
  },
]

export const FaqNewPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const filterQuestions = (text: string) => {
    return text.toLowerCase().includes(searchTerm)
  }

  const handleToggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const filteredFaqItems = faqItems.filter(
    (item) => searchTerm === '' || filterQuestions(item.question) || filterQuestions(item.answer)
  )

  return (
    <div className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto p-4 sm:p-5 md:p-6 flex flex-col items-center">
      <Typography variant="h4" weight="bold" className="mb-6 w-full">
        Help Section
      </Typography>

      <div className="relative w-full sm:w-[400px] mb-8">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={20} className="text-gray-500" />
        </div>
        <Input
          placeholder="Search FAQs..."
          onChange={handleSearchChange}
          className="pl-10 bg-white rounded-md w-full"
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full">
        {filteredFaqItems.map((item, index) => (
          <div key={index} className="w-full">
            <SectionCard>
              <div className="w-full">
                <SubSection
                  title={
                    <div
                      className="flex items-center justify-between cursor-pointer w-full hover:opacity-80"
                      onClick={() => handleToggleExpand(index)}
                    >
                      <Typography variant="h6" weight="bold">
                        {item.question}
                      </Typography>
                      <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        {expandedItems[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </Button>
                    </div>
                  }
                >
                  {expandedItems[index] && (
                    <div className="py-4 w-full">
                      {item.answer.split('\n\n').map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-4 w-full">
                          {section.split('\n').map((line, lineIndex) => (
                            <Typography
                              key={lineIndex}
                              variant={lineIndex === 0 ? "large" : "p"}
                              className="mb-2"
                            >
                              {line}
                              {lineIndex === 0 && item.hyperlink && (
                                <a
                                  href={item.hyperlink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-500 underline ml-1"
                                >
                                  {item.hyperlinkText}
                                </a>
                              )}
                            </Typography>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </SubSection>
              </div>
            </SectionCard>
          </div>
        ))}
      </div>
    </div>
  )
}