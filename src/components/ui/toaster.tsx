
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
import { MessageSquare, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

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
              "border shadow-lg cursor-pointer group relative",
              "hover:translate-y-[-3px] transition-all duration-300 ease-in-out",
              isDark 
                ? "bg-gray-800/90 border-purple-500/30 shadow-purple-900/20 hover:border-purple-400/60 hover:shadow-purple-900/40 hover:bg-gray-800/95" 
                : "bg-white/95 border-emerald-200/60 shadow-emerald-500/15 hover:bg-white hover:border-emerald-300/80 hover:shadow-emerald-500/30"
            )}
            onClick={() => description && openTerminalWithInsight(description.toString(), title?.toString())}
          >
            {/* Gleaming accent border */}
            <div className={cn(
              "absolute top-0 left-0 right-0 h-0.5 opacity-70 group-hover:opacity-100 transition-opacity",
              isDark 
                ? "bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500" 
                : "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400"
            )}></div>
            
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-base font-semibold flex items-center gap-2">
                  <motion.div 
                    className="p-1 rounded-full bg-purple-500/20"
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-3 w-3 text-purple-400" />
                  </motion.div>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm">{description}</ToastDescription>
              )}
              <div className="flex items-center gap-1 mt-2 text-xs group-hover:text-purple-400 transition-colors">
                <MessageSquare className="h-3 w-3" />
                <span className="flex-grow">Open in FlowBot Terminal</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
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
