import { cn } from '@/lib/utils'
import React from 'react'

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-xl border border-transparent bg-background-secondary p-2 text-white placeholder:text-content-placeholder hover:border-border-secondary active:border-border-tertiary',
      )}
    />
  )
}
