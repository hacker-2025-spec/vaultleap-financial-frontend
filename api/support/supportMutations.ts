import { useMutation } from '@tanstack/react-query'
import { fileTicketMutation } from '@/client/@tanstack/react-query.gen'
import type { FileTicketData, CreateSupportTicketDto } from '@/client/types.gen'
import { showToast } from '@/utils/toast'

// Hook to create a support ticket
export const useFileTicket = () => {
  return useMutation({
    ...fileTicketMutation(),
    onSuccess: () => {
      console.log('Support ticket submitted successfully')
      showToast.success('Support ticket submitted successfully! We\'ll get back to you as soon as possible.')
    },
    onError: (error) => {
      console.error('Failed to submit support ticket:', error)
      showToast.error('Failed to submit support ticket. Please try again later.')
    },
  })
}

// Type for the form data that matches the API requirements
export type SupportTicketFormData = CreateSupportTicketDto
