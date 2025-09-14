import React from 'react'
import Section from '../components/Section'

const WhatWeDontDo: React.FC = () => {
  const dontDoItems = [
    'Electronic instrument repairs (keyboards, synthesizers, etc.)',
    'Piano tuning or major piano repairs',
    'Drum head replacement or drum hardware repair',
    'Microphone or audio equipment repair',
    'Instrument appraisals or insurance evaluations',
    'Rush jobs with less than 24-hour notice',
    'Repairs on instruments with severe water damage',
    'Custom modifications that void manufacturer warranties'
  ]

  return (
    <Section className="bg-secondary/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-accent-dark mb-8">
          What We Don't Do
        </h2>
        <p className="text-xl text-text mb-8">
          While we're experts in many areas of instrument repair, there are some 
          services we don't provide. This helps us focus on what we do best.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {dontDoItems.map((item, index) => (
            <div key={index} className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-text">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
          <p className="text-lg text-text">
            <strong>Need help finding the right repair service?</strong> We're happy to 
            recommend trusted professionals for services we don't provide.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default WhatWeDontDo
