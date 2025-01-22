'use client'
import { useEffect } from 'react'

interface useOnClickOutsideProps {
  ref: React.RefObject<HTMLElement | null>
  handler?: (event: MouseEvent | TouchEvent) => void
}
export default function useOnClickOutside({
  ref,
  handler,
}: useOnClickOutsideProps) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      if (!ref.current || ref.current.contains(target)) return
      if (handler) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
