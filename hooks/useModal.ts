import { useState } from 'react'

export const useModal = (defaultValue = false): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(defaultValue)

  const open = (): void => setIsOpen(true)
  const close = (): void => setIsOpen(false)

  return [isOpen, open, close]
}
