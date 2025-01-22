'use client'

import useOnClickOutside from '@/hooks/use-on-click-outside'
import { useRef } from 'react'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside({ ref, handler: () => setIsOpen(false) })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 overflow-hidden bg-background-secondary/60 flex items-center justify-center backdrop-blur-md z-50 ">
      <div ref={ref}>{children}</div>
    </div>
  )
}
