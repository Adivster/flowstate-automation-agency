
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
      ai: "from-fuchsia-500/30 to-purple-500/30 border-fuchsia-500/40 hover:border-fuchsia-500/60 text-fuchsia-400", // New AI variant
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          ref={ref}
          variant="outline"
          className={cn(
            "relative h-10 pl-3 pr-4 bg-gradient-to-br border backdrop-blur-sm transition-all duration-300",
            variantStyles[variant as keyof typeof variantStyles],
            hasPulse && "animate-pulse",
            className
          )}
          {...props}
        >
          <Icon className="h-4 w-4 mr-2 shrink-0" />
          <span className="text-sm font-medium">{label}</span>
          {hasPulse && (
            <motion.span 
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-current"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear" 
              }}
            />
          )}
        </Button>
      </motion.div>
    )
  }
)
