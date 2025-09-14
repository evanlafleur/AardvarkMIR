import React, { useState } from 'react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-accent-dark">
            Aardvark Instrument Repair
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-text hover:text-cta transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-text hover:text-cta transition-colors"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-text hover:text-cta transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className="text-text hover:text-cta transition-colors"
            >
              Recent Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-text hover:text-cta transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-secondary/20">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-text hover:text-cta transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-text hover:text-cta transition-colors text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-text hover:text-cta transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('work')}
                className="text-text hover:text-cta transition-colors text-left"
              >
                Recent Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-text hover:text-cta transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
