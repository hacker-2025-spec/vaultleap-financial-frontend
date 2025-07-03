'use client'

import { toast, ToastT } from 'sonner'
import { DEFAULT_SNACKBAR_TIMEOUT } from '@/config/config'

type ToastOptions = {
  duration?: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export const showToast = {
  success: (message: string, options: ToastOptions = {}) => {
    if (typeof window === 'undefined') return

    return toast.success(message, {
      duration: options.duration || DEFAULT_SNACKBAR_TIMEOUT,
      position: options.position || 'bottom-right',
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined
    })
  },
  
  error: (message: string, options: ToastOptions = {}) => {
    if (typeof window === 'undefined') return

    return toast.error(message, {
      duration: options.duration || DEFAULT_SNACKBAR_TIMEOUT,
      position: options.position || 'bottom-right',
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined
    })
  },
  
  info: (message: string, options: ToastOptions = {}) => {
    if (typeof window === 'undefined') return

    return toast.info(message, {
      duration: options.duration || DEFAULT_SNACKBAR_TIMEOUT,
      position: options.position || 'bottom-right',
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined
    })
  },
  
  warning: (message: string, options: ToastOptions = {}) => {
    if (typeof window === 'undefined') return

    return toast.warning(message, {
      duration: options.duration || DEFAULT_SNACKBAR_TIMEOUT,
      position: options.position || 'bottom-right',
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined
    })
  },
  
  // For backward compatibility with notistack
  default: (message: string, options: ToastOptions = {}) => {
    if (typeof window === 'undefined') return

    return toast(message, {
      duration: options.duration || DEFAULT_SNACKBAR_TIMEOUT,
      position: options.position || 'bottom-right',
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined
    })
  },
  
  // Dismiss a toast by its ID
  dismiss: (toastId: ToastT) => {
    if (typeof window === 'undefined') return
    
    toast.dismiss(toastId)
  }
}

// For backward compatibility with the old pushNotification function
export const pushNotification = (message: string, options: any = {}) => {
  if (typeof window === 'undefined') return
  
  const variant = options.variant || 'success'
  
  switch (variant) {
    case 'success':
      return showToast.success(message, {
        duration: options.autoHideDuration || DEFAULT_SNACKBAR_TIMEOUT,
        description: options.description
      })
    case 'error':
      return showToast.error(message, {
        duration: options.autoHideDuration || DEFAULT_SNACKBAR_TIMEOUT,
        description: options.description
      })
    case 'warning':
      return showToast.warning(message, {
        duration: options.autoHideDuration || DEFAULT_SNACKBAR_TIMEOUT,
        description: options.description
      })
    case 'info':
      return showToast.info(message, {
        duration: options.autoHideDuration || DEFAULT_SNACKBAR_TIMEOUT,
        description: options.description
      })
    default:
      return showToast.default(message, {
        duration: options.autoHideDuration || DEFAULT_SNACKBAR_TIMEOUT,
        description: options.description
      })
  }
}
