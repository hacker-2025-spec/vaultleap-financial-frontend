import React from 'react'

import { StyledPrivacyPolicy } from './PrivacyPolicy.styles'
import type { PrivacyPolicyComponentProps } from './PrivacyPolicy.types'
import { ContentBoxComponent } from '../../components/shared/ui/ContentBox'
import { PRIVACY_POLICY_TEXT } from './PrivacyPolicy.texts'
import { Link } from '@tanstack/react-router'
import { Typography } from '@/components/ui/typography'

export const PrivacyPolicyComponent: React.FC<PrivacyPolicyComponentProps> = (props) => {
  return (
    <StyledPrivacyPolicy {...props}>
      <ContentBoxComponent variant="creator">
        <Typography variant="h5" weight="bold" className="mb-[1px]">
          PRIVACY POLICY
        </Typography>
      </ContentBoxComponent>
      <ContentBoxComponent variant="creator" className="whitespace-pre-wrap block">
        {PRIVACY_POLICY_TEXT.sections.map((section, index) => (
          <div key={index} className="mb-5">
            <Typography variant="h5" weight="bold" className="mb-2.5">
              {section.title}
            </Typography>
            <Typography variant="p" className="mb-2 text-left">
              {section.content}
              {section.hyperlink && (
                <Link href={section.hyperlink.href} className="cursor-pointer text-primary underline">
                  {section.hyperlink.text}
                </Link>
              )}
              {section.continuation}
            </Typography>
          </div>
        ))}
      </ContentBoxComponent>
    </StyledPrivacyPolicy>
  )
}
