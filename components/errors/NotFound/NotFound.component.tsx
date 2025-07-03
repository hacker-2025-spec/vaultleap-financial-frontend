import React, { useEffect } from 'react'
import { Link, useRouter, useLocation } from '@tanstack/react-router'
import { ArrowLeft, Home, Search, AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { NotFoundComponentProps, NotFoundErrorInfo } from './NotFound.types'

export const NotFoundComponent: React.FC<NotFoundComponentProps> = ({
  message,
  title = 'Page Not Found',
  showBackButton = true,
  showHomeButton = true,
  className,
  data,
}) => {
  const router = useRouter()
  const location = useLocation()

  // Log 404 error for analytics
  useEffect(() => {
    const errorInfo: NotFoundErrorInfo = {
      pathname: location.pathname,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }

    // Log to console in development
    if (import.meta.env.MODE === 'development') {
      console.warn('404 Error:', errorInfo)
    }

    // Here you could send to analytics service
    // analytics.track('404_error', errorInfo)
  }, [location.pathname])

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.history.back()
    } else {
      router.navigate({ to: '/' })
    }
  }

  const defaultMessage = `The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.`

  return (
    <div className={cn('min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4', className)}>
      <div className="w-full max-w-2xl mx-auto animate-in fade-in-50 duration-500">
        <Card className="p-8 md:p-12 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            {/* 404 Large Text */}
            <Typography variant="h1" className="text-6xl md:text-8xl font-bold text-primary-600 mb-4 animate-pulse">
              404
            </Typography>
          </div>

          {/* Title */}
          <Typography variant="h2" className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            {title}
          </Typography>

          {/* Message */}
          <Typography variant="p" className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            {message || defaultMessage}
          </Typography>

          {/* Current Path Info */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <Typography variant="small" className="text-gray-500 mb-1">
              Requested URL:
            </Typography>
            <code className="text-gray-800 break-all bg-gray-100 px-2 py-1 rounded text-sm font-mono">{location.pathname}</code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {showHomeButton && (
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            )}

            {showBackButton && (
              <Button variant="outline" size="lg" onClick={handleGoBack} className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            )}
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Typography variant="small" className="text-gray-500 mb-4">
              Need help? Here are some suggestions:
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link to="/" className="text-primary-600 hover:text-primary-700 hover:underline">
                Visit Homepage
              </Link>
              <Link to="/support" className="text-primary-600 hover:text-primary-700 hover:underline">
                Contact Support
              </Link>
              <Link to="/faq" className="text-primary-600 hover:text-primary-700 hover:underline">
                View FAQ
              </Link>
            </div>
          </div>

          {/* Debug Info (Development Only) */}
          {import.meta.env.MODE === 'development' && data && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
              <Typography variant="small" className="font-semibold text-yellow-800 mb-2">
                Debug Info (Development Only):
              </Typography>
              <pre className="text-xs text-yellow-700 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
