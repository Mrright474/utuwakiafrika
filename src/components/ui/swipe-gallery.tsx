import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import { TouchButton } from '@/components/ui/touch-button'
import { useIsMobile, useTouchDevice } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface SwipeGalleryProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  className?: string
}

const SwipeGallery = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  className
}: SwipeGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const isMobile = useIsMobile()
  const isTouchDevice = useTouchDevice()

  // Minimum swipe distance to trigger navigation
  const minSwipeDistance = 50

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < images.length - 1) {
      onNext()
    }
    if (isRightSwipe && currentIndex > 0) {
      onPrevious()
    }
  }, [touchStart, touchEnd, currentIndex, images.length, onNext, onPrevious])

  const handleImageClick = useCallback(() => {
    if (isTouchDevice) {
      setIsZoomed(!isZoomed)
    }
  }, [isTouchDevice, isZoomed])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      onPrevious()
    }
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
      onNext()
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }, [currentIndex, images.length, onNext, onPrevious, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    // Reset zoom when image changes
    setIsZoomed(false)
  }, [currentIndex])

  const currentImage = images[currentIndex]

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-black/90 flex items-center justify-center",
      className
    )}>
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="flex items-center space-x-2">
          {isTouchDevice && (
            <TouchButton
              variant="ghost"
              size="icon"
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-white hover:bg-white/20"
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </TouchButton>
          )}
          <TouchButton
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X size={24} />
          </TouchButton>
        </div>
      </div>

      {/* Navigation Arrows - Desktop */}
      {!isMobile && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </>
      )}

      {/* Image Container */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 pt-16 pb-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imageRef}
          src={currentImage.src}
          alt={currentImage.alt}
          onClick={handleImageClick}
          className={cn(
            "max-w-full max-h-full object-contain transition-transform duration-300 cursor-pointer",
            isZoomed && "scale-150 cursor-zoom-out",
            !isZoomed && isTouchDevice && "cursor-zoom-in"
          )}
        />
        
        {/* Swipe Indicator - Mobile */}
        {isMobile && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs">
            Swipe left or right to navigate
          </div>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white text-sm text-center">{currentImage.caption}</p>
        </div>
      )}

      {/* Touch Navigation Dots */}
      {isMobile && images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index > currentIndex) {
                  Array.from({ length: index - currentIndex }, onNext)
                } else if (index < currentIndex) {
                  Array.from({ length: currentIndex - index }, onPrevious)
                }
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SwipeGallery