import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TouchButton } from '@/components/ui/touch-button'
import { MobileDrawer } from '@/components/ui/mobile-drawer'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface FormSection {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  isRequired?: boolean
}

interface MobileFormLayoutProps {
  sections: FormSection[]
  onSubmit: (e: React.FormEvent) => void
  submitText?: string
  isSubmitting?: boolean
  className?: string
}

const MobileFormLayout = ({ 
  sections, 
  onSubmit, 
  submitText = "Submit", 
  isSubmitting = false,
  className
}: MobileFormLayoutProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set([sections[0]?.id]) // First section expanded by default
  )
  const isMobile = useIsMobile()

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const isExpanded = (sectionId: string) => expandedSections.has(sectionId)

  if (!isMobile) {
    // Desktop layout - show all sections
    return (
      <form onSubmit={onSubmit} className={cn("space-y-8", className)}>
        {sections.map(section => (
          <div key={section.id} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-utu-black border-b border-utu-red pb-2">
                {section.title}
                {section.isRequired && <span className="text-utu-red ml-1">*</span>}
              </h3>
              {section.description && (
                <p className="text-sm text-utu-gray mt-2">{section.description}</p>
              )}
            </div>
            {section.children}
          </div>
        ))}
        
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-utu-red hover:bg-red-700 text-white px-8 py-3"
          >
            {isSubmitting ? "Submitting..." : submitText}
          </Button>
        </div>
      </form>
    )
  }

  // Mobile layout - progressive disclosure
  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      {sections.map(section => (
        <div 
          key={section.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <TouchButton
            type="button"
            variant="ghost"
            size="touch"
            onClick={() => toggleSection(section.id)}
            className="w-full justify-between p-4 rounded-none border-0 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium text-utu-black">
                {section.title}
                {section.isRequired && <span className="text-utu-red ml-1">*</span>}
              </span>
            </div>
            {isExpanded(section.id) ? (
              <ChevronUp className="h-5 w-5 text-utu-gray" />
            ) : (
              <ChevronDown className="h-5 w-5 text-utu-gray" />
            )}
          </TouchButton>
          
          {isExpanded(section.id) && (
            <div className="p-4 pt-0 border-t border-gray-100 space-y-4">
              {section.description && (
                <p className="text-sm text-utu-gray">{section.description}</p>
              )}
              {section.children}
            </div>
          )}
        </div>
      ))}
      
      <div className="pt-4">
        <TouchButton
          type="submit"
          disabled={isSubmitting}
          size="touch-lg"
          className="w-full bg-utu-red hover:bg-red-700 text-white"
        >
          {isSubmitting ? "Submitting..." : submitText}
        </TouchButton>
      </div>
    </form>
  )
}

export default MobileFormLayout