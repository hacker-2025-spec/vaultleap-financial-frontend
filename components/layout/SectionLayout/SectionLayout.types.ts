import React from 'react'

export type TSectionLayoutVariant = 'default' | 'content' | 'plain'

export type SectionLayoutComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: TSectionLayoutVariant
}
