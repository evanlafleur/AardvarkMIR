import React from 'react'
import Section from '../components/Section'
import InstrumentGrid from '../components/InstrumentGrid'

const WhatWeDo: React.FC = () => {
  return (
    <Section id="services" className="bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-accent-dark text-center mb-4">
          What We Do
        </h2>
        <p className="text-xl text-text text-center mb-12 max-w-3xl mx-auto">
          We repair and restore all types of musical instruments. Click on any instrument 
          below to see the specific services we offer.
        </p>
        <InstrumentGrid />
      </div>
    </Section>
  )
}

export default WhatWeDo
