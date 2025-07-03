import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { DownloadFileModalComponent } from './DownloadFileModal.component'
import { DownloadFileModalContainerProps } from './DownloadFileModal.types'

export const DownloadFileModalContainer: React.FC<DownloadFileModalContainerProps> = ({ isOpen, close, taxFormId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[750px] p-0 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Download Tax Document</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={close}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="p-6 pt-2">
          <DownloadFileModalComponent taxFormId={taxFormId} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
