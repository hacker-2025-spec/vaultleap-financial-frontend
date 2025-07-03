import React from 'react'
import { StyledTermsOfService } from './TermsOfService.styles'
import type { TermsOfServiceComponentProps } from './TermsOfService.types'
import { ContentBoxComponent } from '../../components/shared/ui/ContentBox'
import { TERMS_OF_SERVICE_TEXT } from './TermsOfService.texts'
import { Link } from '@tanstack/react-router'
import { Typography } from '@/components/ui/typography'

export const TermsOfServiceComponent: React.FC<TermsOfServiceComponentProps> = (props) => {
  return (
    <StyledTermsOfService {...props}>
      <ContentBoxComponent variant="creator">
        <Typography variant="h5" weight="bold" className="mb-[1px]">
          TERMS OF SERVICE
        </Typography>
      </ContentBoxComponent>
      <ContentBoxComponent variant="creator" className="whitespace-pre-wrap block">
        {TERMS_OF_SERVICE_TEXT.sections.map((section, index) => (
          <div key={index} className="mb-[2px]">
            <Typography variant="h5" weight="bold" className="mb-2.5">
              {section.title}
            </Typography>
            <Typography variant="p" className="mb-2 text-left">
              {section.content}
              {section.continuation}
              {section.hyperlink && (
                <Link href={section.hyperlink.href} className="cursor-pointer text-primary underline">
                  {section.hyperlink.text}
                </Link>
              )}
              {section.postLinkContent}
            </Typography>
          </div>
        ))}
      </ContentBoxComponent>
    </StyledTermsOfService>
  )
}
