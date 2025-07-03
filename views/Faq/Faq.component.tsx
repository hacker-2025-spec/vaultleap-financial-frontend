'use client'

import { Search } from 'lucide-react'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

import { ContentBoxComponent } from '../../components/shared/ui/ContentBox'
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
} from './Faq.texts'
import { StyledFaq } from './Faq.styles'
import type { FaqComponentProps } from './Faq.types'

export const FaqComponent: React.FC<FaqComponentProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const filterQuestions = (text: string) => {
    return text.toLowerCase().includes(searchTerm)
  }

  return (
    <StyledFaq {...props}>
      <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-6 text-left w-full">
        <Typography variant="h4" weight="bold">
          Help Section
        </Typography>
        <div className="relative w-full max-w-[400px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search size={20} className="text-gray-500" />
          </div>
          <Input
            placeholder="Search FAQs..."
            onChange={handleSearchChange}
            className="pl-10 bg-white rounded-md w-full"
          />
        </div>
      </ContentBoxComponent>

      {searchTerm === '' || filterQuestions(DO_I_NEED_TO_INSTALL_WALLET_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Do I need a web3 wallet?</Typography>
          {DO_I_NEED_TO_INSTALL_WALLET_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(CAN_I_USE_OWN_WALLET_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Can I transfer Vault Keys to another wallet?</Typography>
          {CAN_I_USE_OWN_WALLET_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant="p"
                  className="mb-4"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(PAY_GAS_FEES_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Do I need to pay Gas Fees?</Typography>
          {PAY_GAS_FEES_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(HOW_TO_FUND_VAULTLEAP_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">How do I fund my Vaultleap Vault?</Typography>
          {HOW_TO_FUND_VAULTLEAP_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(CAN_I_EDIT_VAULTLEAP) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Can I add someone to my existing Vault?</Typography>
          {CAN_I_EDIT_VAULTLEAP.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(WHAT_IS_1099_NEC_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">What are 1099-NEC, W8-BEN, and W8-BEN-E tax forms?</Typography>
          {WHAT_IS_1099_NEC_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(WHEN_WILL_RECEIVE_TAX_FORMS) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">When will I receive my 1099 NEC Tax Forms?</Typography>
          {WHEN_WILL_RECEIVE_TAX_FORMS.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(I_SENT_TO_MUCH_TO_THE_VAULT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">I sent the wrong amount to my Vault</Typography>
          {I_SENT_TO_MUCH_TO_THE_VAULT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(ARE_THE_FUNDS_LOST_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">A member in my Vault hasn’t claimed their Vault Key in 18 months.</Typography>
          {ARE_THE_FUNDS_LOST_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(IS_VAULTLEAP_LEGALLY_COMPLIANT_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Klydo's commitment to Compliance</Typography>
          {IS_VAULTLEAP_LEGALLY_COMPLIANT_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(PERSONAL_INFORMATION_SAFE_TEXT) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Is my personal information safe?</Typography>
          {PERSONAL_INFORMATION_SAFE_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "large" : "p"}
                  className="mb-2 text-left"
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(ARE_YOU_AUDITED_TEXT.part1) ? (
        <ContentBoxComponent
          variant="creator"
          className="whitespace-pre-wrap gap-3 text-left w-full"
        >
          <Typography variant="h5" weight="bold">Are you audited?</Typography>
          <Typography variant="p" className="mb-2 text-left">
            {ARE_YOU_AUDITED_TEXT.part1}
            <a
              href={ARE_YOU_AUDITED_TEXT.hyperlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 underline"
            >
              {ARE_YOU_AUDITED_TEXT.hyperlinkText}
            </a>
          </Typography>
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(EMAIL_SAFETY_TEXT) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">I received an email from this site, how do I know it's safe?</Typography>
          {EMAIL_SAFETY_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(WALLET_SAFETY_TOOLS_TEXT) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">Do you recommend any wallet safety tools?</Typography>
          {WALLET_SAFETY_TOOLS_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(CREATION_HELP_TEXT) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">Can I get help with creating a Vault?</Typography>
          {CREATION_HELP_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(HOW_DO_I_WITHDRAW_TEXT) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">How do I transfer funds?</Typography>
          {HOW_DO_I_WITHDRAW_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(WHAT_IS_PROFIT_SWIITCH_TEXT) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">What is the Profit Switch feature?</Typography>
          {WHAT_IS_PROFIT_SWIITCH_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(WHAT_IS_VAULT_FEE_TEXT) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">Transaction Fees</Typography>
          {WHAT_IS_VAULT_FEE_TEXT.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(WHAT_IS_USDC) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">What is USDC?</Typography>
          {WHAT_IS_USDC.split('\n\n').map((section, index) => (
            <div key={index}>
              {section.split('\n').map((line, lineIndex) => (
                <Typography key={lineIndex} variant={lineIndex === 0 ? "large" : "p"} className="mb-2 text-left">
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(GLOSSARY) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">Glossary</Typography>
          {GLOSSARY.split('\n\n').map((section, index) => (
            <div key={index} className="w-full">
              {section.split('\n').map((line, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant={lineIndex === 0 ? "subtitle1" : "body1"}
                  align="left"
                  style={{ marginBottom: '8px', textAlign: 'left' }}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(I_HAVE_SOME_FEEDBACK.part1) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">I have some feedback</Typography>
          <Typography variant="p" className="mb-2 text-left">
            {I_HAVE_SOME_FEEDBACK.part1}
            <a
              href={I_HAVE_SOME_FEEDBACK.hyperlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 underline"
            >
              {I_HAVE_SOME_FEEDBACK.hyperlinkText}
            </a>
          </Typography>
        </ContentBoxComponent>
      ) : null}

      {searchTerm === '' || filterQuestions(QUESTION_OUTSIDE_FAQ.part1) ? (
        <ContentBoxComponent variant="creator" className="whitespace-pre-wrap gap-3 text-left w-full">
          <Typography variant="h5" weight="bold">I have a question not mentioned in the FAQ</Typography>
          <Typography variant="p" className="mb-2 text-left">
            {QUESTION_OUTSIDE_FAQ.part1} <a href={`mailto:${QUESTION_OUTSIDE_FAQ.hyperlink}`}>{QUESTION_OUTSIDE_FAQ.hyperlink}</a>
          </Typography>
        </ContentBoxComponent>
      ) : null}
    </StyledFaq>
  )
}