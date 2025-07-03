import React, { useEffect, useRef, useState } from 'react'
import { Field } from 'persona/dist/lib/interfaces'
import { Loader } from 'lucide-react'
import './styles.css'

interface Props {
  templateId: string
  iqtToken: string
  referenceId: string
  environmentId?: string
  kycLink: string
  onLoad: () => void
  onComplete: (params: { inquiryId: string; status?: string; fields?: Record<string, Field> | Record<string, string> }) => void
}

export default ({ kycLink, iqtToken, templateId, environmentId, onLoad, onComplete }: Props) => {
  // Build iframe URL with proper theme parameter
  const buildIframeUrl = () => {
    const baseUrl = kycLink.replace('/verify', '/widget')
    const params = new URLSearchParams()

    // Add iframe origin
    params.append('iframe-origin', window.location.origin)

    // Force light theme - try multiple parameter variations
    params.append('theme', 'light')
    params.append('appearance', 'light')
    params.append('mode', 'light')

    // Check if URL already has parameters
    const separator = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${separator}${params.toString()}`
  }

  const iframeUrl = buildIframeUrl()

  // Add loading state
  const [isLoading, setIsLoading] = useState(true)

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Message handler function
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is a completion event
      if (event.data && event.data.name === 'complete') {
        // Extract the inquiry ID and fields from the event data
        const inquiryId = event.data.metadata?.inquiryId
        const fields = event.data.metadata || {}

        if (inquiryId) {
          // Call the onComplete callback with the inquiry ID and fields
          try {
            onComplete({ inquiryId, fields })
          } catch (error) {
            console.error('BridgeKYC - Error in onComplete callback:', error)
          }
        } else {
          console.error('BridgeKYC - No inquiryId found in completion event')
        }
      }
    }

    // Add event listener when component mounts
    window.addEventListener('message', handleMessage)

    // Call onLoad callback
    onLoad()

    // Clean up event listener when component unmounts
    return () => {
      isMounted.current = false
      window.removeEventListener('message', handleMessage)
    }
  }, [onComplete, onLoad])

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false)

    // Try to send theme message to iframe after load
    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            {
              type: 'setTheme',
              theme: 'light',
            },
            '*'
          )
        } catch (error) {
          console.error('Could not post theme message to iframe:', error)
        }
      }
    }, 1000)
  }

  return (
    <div className="relative w-full h-full min-h-[650px] bg-white">
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10">
          <Loader className="h-12 w-12 animate-spin text-gray-600" />
          <p className="mt-4 font-medium text-gray-700">Loading</p>
        </div>
      )}

      {/* KYC iframe */}
      <iframe
        ref={iframeRef}
        allow="camera;"
        className="border-none w-full h-full min-h-[650px] block bg-white"
        src={iframeUrl}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
        onLoad={handleIframeLoad}
        style={{
          colorScheme: 'light',
          backgroundColor: 'white',
        }}
      />
    </div>
  )
}
