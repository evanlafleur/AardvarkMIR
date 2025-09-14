import React, { useState } from 'react'
import FlipCard from './FlipCard'
import Lightbox from './Lightbox'

interface BeforeAfterPairProps {
  beforeUrl: string
  afterUrl: string
  caption?: string
  className?: string
}

const BeforeAfterPair: React.FC<BeforeAfterPairProps> = ({ 
  beforeUrl, 
  afterUrl, 
  caption, 
  className = '' 
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleClick = () => {
    setIsLightboxOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsLightboxOpen(true)
    }
  }

  return (
    <>
      <div 
        className={`cursor-pointer ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View before and after comparison${caption ? `: ${caption}` : ''}`}
      >
        <FlipCard
          front={
            <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <img
                src={beforeUrl}
                alt="Before repair"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                  <span className="text-accent-dark font-semibold">Before</span>
                </div>
              </div>
            </div>
          }
          back={
            <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <img
                src={afterUrl}
                alt="After repair"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                  <span className="text-accent-dark font-semibold">After</span>
                </div>
              </div>
            </div>
          }
        />
        
        {caption && (
          <p className="mt-3 text-center text-sm text-gray-600">
            {caption}
          </p>
        )}
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        beforeUrl={beforeUrl}
        afterUrl={afterUrl}
        caption={caption}
      />
    </>
  )
}

export default BeforeAfterPair
