import { cn } from '@/lib/utils'
import React from 'react'

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={cn('input')} />
}
