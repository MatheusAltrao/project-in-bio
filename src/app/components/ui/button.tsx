import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export default function Button({
  children,
  variant = 'primary',
  ...props
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex items-center justify-center w-full gap-2 whitespace-nowrap rounded-xl px-4 py-2 font-bold text-white transition-opacity hover:opacity-80 disabled:opacity-60',
        variant === 'primary' && 'bg-accent-purple',
        variant === 'secondary' && 'bg-background-tertiary',
        variant === 'tertiary' && 'border border-border-primary',
        variant === 'icon' && 'rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
