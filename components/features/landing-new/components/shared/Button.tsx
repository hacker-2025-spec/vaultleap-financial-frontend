import React, { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  withShimmer?: boolean
}

const Button = ({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  size = 'md',
  withShimmer = false,
}: ButtonProps) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 relative overflow-hidden'

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10',
    text: 'bg-transparent text-primary hover:bg-primary/10 hover:underline',
  }

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : ''

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  // Combine all classes
  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`

  // Shimmer effect
  const shimmerElement = withShimmer ? (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
  ) : null

  // Render as link or button
  if (href) {
    return (
      <Link href={href} className={`group ${allClasses}`} onClick={onClick}>
        <span className="relative z-10">{children}</span>
        {shimmerElement}
      </Link>
    )
  }

  return (
    <button type={type} className={`group ${allClasses}`} onClick={onClick} disabled={disabled}>
      <span className="relative z-10">{children}</span>
      {shimmerElement}
    </button>
  )
}

export default Button
