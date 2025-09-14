import React, { useState, useEffect } from 'react'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  beforeUrl: string
  afterUrl: string
  caption?: string
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, beforeUrl, afterUrl, caption }) => {
  const [sliderPosition, setSliderPosition] = useState(50)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          aria-label="Close lightbox"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image comparison container */}
        <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
          {/* Before image */}
          <div className="absolute inset-0">
            <img
              src={beforeUrl}
              alt="Before repair"
              className="w-full h-full object-cover"
            />
          </div>

          {/* After image with clip-path */}
          <div 
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          >
            <img
              src={afterUrl}
              alt="After repair"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slider line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Slider control */}
        <div className="mt-4">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #EB5E28 0%, #EB5E28 ${sliderPosition}%, #e5e7eb ${sliderPosition}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-300 mt-2">
            <span>Before</span>
            <span>After</span>
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <div className="mt-4 text-center text-white">
            <p className="text-lg">{caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lightbox
