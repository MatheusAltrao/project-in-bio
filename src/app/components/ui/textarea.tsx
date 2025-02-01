import { cn } from "@/lib/utils";

export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea {...props} className={cn(`input`, props.className)} />;
}
