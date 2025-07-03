'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[320px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}>
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}