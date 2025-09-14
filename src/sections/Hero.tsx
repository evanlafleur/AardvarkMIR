import React from 'react'
import Section from '../components/Section'

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToWork = () => {
    const element = document.getElementById('work')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section className="bg-gradient-to-br from-background to-secondary/20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-accent-dark mb-6">
          Aardvark Instrument Repair
        </h1>
        <p className="text-xl md:text-2xl text-text mb-8 leading-relaxed">
          Professional instrument repair services with over 20 years of experience. 
          We bring your musical instruments back to life with expert craftsmanship 
          and attention to detail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToContact}
            className="btn-primary text-lg px-8 py-4"
          >
            Get a Quote
          </button>
          <button 
            onClick={scrollToWork}
            className="btn-secondary text-lg px-8 py-4"
          >
            View Our Work
          </button>
        </div>
      </div>
    </Section>
  )
}

export default Hero
