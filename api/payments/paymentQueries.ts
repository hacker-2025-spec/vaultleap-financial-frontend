export const paymentQueryKeys = {
  all: ['payments'] as const,
  history: () => [...paymentQueryKeys.all, 'history'] as const,
  recipients: () => [...paymentQueryKeys.all, 'recipients'] as const,
}
