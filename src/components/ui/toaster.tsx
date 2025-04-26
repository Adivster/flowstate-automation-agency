
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
import { useNavigate } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'

export function Toaster() {
  const { toasts, toast } = useToast()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()

  // Function to send insight to terminal
  const openTerminalWithInsight = (message: string, title?: string) => {
    // Create a custom event to open the terminal with this insight
    const openTerminalEvent = new CustomEvent('openCommunicationTerminal', { 
      detail: { 
        message,
        title,
        type: 'insight' 
      } 
    })
    window.dispatchEvent(openTerminalEvent)
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "border shadow-lg cursor-pointer group",
              isDark 
                ? "bg-gray-800/90 border-purple-500/30 shadow-purple-900/20 hover:bg-gray-800/95 hover:border-purple-400/40" 
                : "bg-white/95 border-emerald-200/50 shadow-emerald-500/10 hover:bg-white/98 hover:border-emerald-300/60"
            )}
            onClick={() => description && openTerminalWithInsight(description.toString(), title?.toString())}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              <div className="flex items-center gap-1 mt-1 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                <MessageSquare className="h-3 w-3" />
                <span>Click to open in terminal</span>
              </div>
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
