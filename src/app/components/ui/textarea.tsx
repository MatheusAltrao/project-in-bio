import { cn } from '@/lib/utils'

export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(
        `w-full rounded-xl border border-transparent bg-background-secondary p-3 text-white placeholder:text-content-body hover:border-border-secondary active:border-border-tertiary`,
        props.className,
      )}
    />
  )
}
