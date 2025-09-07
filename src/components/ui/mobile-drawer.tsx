import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

const MobileDrawer = React.forwardRef<HTMLDivElement, MobileDrawerProps>(
  ({ isOpen, onClose, children, title, className }, ref) => {
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }

      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [isOpen])

    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex md:hidden">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div
          ref={ref}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] bg-white border-t shadow-lg",
            "animate-slide-up max-h-[85vh]",
            className
          )}
        >
          {title && (
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-utu-black">{title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

MobileDrawer.displayName = "MobileDrawer"

export { MobileDrawer }