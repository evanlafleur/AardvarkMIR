import React from 'react'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  tabIndex?: number
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, className = '', tabIndex = 0 }) => {
  return (
    <div className={`flip-card ${className}`} tabIndex={tabIndex}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {front}
        </div>
        <div className="flip-card-back">
          {back}
        </div>
      </div>
    </div>
  )
}

export default FlipCard
