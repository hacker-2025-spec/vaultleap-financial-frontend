export interface NotFoundComponentProps {
  /**
   * Optional custom message to display instead of the default
   */
  message?: string
  
  /**
   * Optional custom title to display instead of the default
   */
  title?: string
  
  /**
   * Whether to show the back button
   * @default true
   */
  showBackButton?: boolean
  
  /**
   * Whether to show the home button
   * @default true
   */
  showHomeButton?: boolean
  
  /**
   * Custom className for styling
   */
  className?: string
  
  /**
   * Additional data passed from notFound() function
   */
  data?: unknown
}

export interface NotFoundErrorInfo {
  pathname: string
  timestamp: Date
  userAgent?: string
  referrer?: string
}
