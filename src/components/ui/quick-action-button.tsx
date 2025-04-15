
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface QuickActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
  variant?: "default" | "success" | "warning" | "danger"
  hasPulse?: boolean
}

export const QuickActionButton = React.forwardRef<HTMLButtonElement, QuickActionButtonProps>(
  ({ icon: Icon, label, variant = "default", hasPulse = false, className, ...props }, ref) => {
    const variantStyles = {
      default: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 hover:border-indigo-500/50 text-indigo-400",
      success: "from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-500/50 text-green-400",
      warning: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 hover:border-amber-500/50 text-amber-400",
      danger: "from-red-500/20 to-rose-500/20 border-red-500/30 hover:border-red-500/50 text-red-400",
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          ref={ref}
          variant="outline"
          className={cn(
            "relative h-10 pl-3 pr-4 bg-gradient-to-br border backdrop-blur-sm",
            variantStyles[variant],
            hasPulse && "animate-pulse",
            className
          )}
          {...props}
        >
          <Icon className="h-4 w-4 mr-2 shrink-0" />
          <span className="text-sm font-medium">{label}</span>
          {hasPulse && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-current animate-ping" />
          )}
        </Button>
      </motion.div>
    )
  }
)
QuickActionButton.displayName = "QuickActionButton"
