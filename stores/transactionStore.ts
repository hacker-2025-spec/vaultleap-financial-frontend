import { create } from 'zustand'

// Minimal UI state store - only for things React Query can't handle
interface UIState {
  // Simple modal visibility state
  isTransactionModalOpen: boolean
}

interface UIActions {
  setTransactionModalOpen: (open: boolean) => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>((set) => ({
  isTransactionModalOpen: false,
  setTransactionModalOpen: (open) => set({ isTransactionModalOpen: open }),
}))

// Simple selector hooks
export const useTransactionModal = () => useUIStore((state) => ({
  isOpen: state.isTransactionModalOpen,
  setOpen: state.setTransactionModalOpen,
}))
