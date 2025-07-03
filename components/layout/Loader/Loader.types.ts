import React from 'react'

export type LoaderComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}
