'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, AlertCircle } from 'lucide-react'
import { verifyCredentials, generateAuthToken } from '@/utils/basicAuth'
import { useUserActions } from '@/stores/userStore'

interface BasicAuthModalProps {
  isOpen: boolean
}

export const BasicAuthModal = ({ isOpen }: BasicAuthModalProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { setBasicAuthAuthenticated, setBasicAuthToken, setBasicAuthModalOpen } = useUserActions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    if (verifyCredentials(username, password)) {
      // Generate and store auth token
      const token = generateAuthToken(username, password)
      console.log('BasicAuthModal: Generated token, authenticating user')

      // Set token first, then authentication status
      setBasicAuthToken(token)
      setBasicAuthAuthenticated(true)
      setBasicAuthModalOpen(false)

      // Clear form
      setUsername('')
      setPassword('')

      console.log('BasicAuthModal: Authentication successful')
    } else {
      setError('Invalid username or password')
      console.log('BasicAuthModal: Invalid credentials provided')
    }
    
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent
      handleSubmit(formEvent)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-[400px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Authentication Required</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter username"
              disabled={isLoading}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter password"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !username || !password}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  )
}
