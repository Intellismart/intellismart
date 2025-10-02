import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  className?: string
}

export function LoadingSpinner({
  size = 24,
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div 
      className={cn("flex items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-label="Loading..."
      {...props}
    >
      <Loader2 className="animate-spin" size={size} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
