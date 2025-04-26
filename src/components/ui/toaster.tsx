
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { useTheme } from "@/providers/theme-provider"

export function Toaster() {
  const { toasts } = useToast()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "border shadow-lg",
              isDark 
                ? "bg-gray-800/90 border-purple-500/30 shadow-purple-900/20" 
                : "bg-white/95 border-emerald-200/50 shadow-emerald-500/10"
            )}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
