import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

interface LoadingModalProps {
  isOpen: boolean
  title?: string
  message?: string
}

export default function LoadingModal({ isOpen, title = 'Processing', message = 'Please wait...' }: LoadingModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <div className="flex flex-col items-center space-y-4 py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
