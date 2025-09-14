import React from 'react'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}

export default Section
