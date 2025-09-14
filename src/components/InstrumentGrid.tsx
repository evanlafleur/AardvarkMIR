import React from 'react'
import FlipCard from './FlipCard'

interface Instrument {
  name: string
  services: string[]
}

const instruments: Instrument[] = [
  {
    name: 'Clarinet',
    services: ['Pad replacement', 'Key adjustment', 'Cork repair', 'Cleaning & polishing']
  },
  {
    name: 'Flute',
    services: ['Pad replacement', 'Key mechanism repair', 'Head joint cork', 'Cleaning & polishing']
  },
  {
    name: 'Saxophone',
    services: ['Pad replacement', 'Key adjustment', 'Neck cork repair', 'Cleaning & polishing']
  },
  {
    name: 'Trumpet',
    services: ['Valve alignment', 'Slide repair', 'Dent removal', 'Cleaning & polishing']
  },
  {
    name: 'Trombone',
    services: ['Slide repair', 'Dent removal', 'Valve service', 'Cleaning & polishing']
  },
  {
    name: 'French Horn',
    services: ['Valve alignment', 'Slide repair', 'Dent removal', 'Cleaning & polishing']
  },
  {
    name: 'Baritone/Euphonium',
    services: ['Valve alignment', 'Slide repair', 'Dent removal', 'Cleaning & polishing']
  },
  {
    name: 'Tuba',
    services: ['Valve alignment', 'Slide repair', 'Dent removal', 'Cleaning & polishing']
  },
  {
    name: 'Oboe',
    services: ['Reed adjustment', 'Key repair', 'Cork replacement', 'Cleaning & polishing']
  },
  {
    name: 'Bassoon',
    services: ['Reed adjustment', 'Key repair', 'Cork replacement', 'Cleaning & polishing']
  },
  {
    name: 'Piccolo',
    services: ['Pad replacement', 'Key adjustment', 'Cork repair', 'Cleaning & polishing']
  },
  {
    name: 'Bass Clarinet',
    services: ['Pad replacement', 'Key adjustment', 'Cork repair', 'Cleaning & polishing']
  },
  {
    name: 'String',
    services: ['Bridge repair', 'Nut replacement', 'Fret work', 'Setup & intonation']
  },
  {
    name: 'Fretted Instrument',
    services: ['Fret replacement', 'Neck adjustment', 'Bridge repair', 'Setup & intonation']
  },
  {
    name: 'Bow',
    services: ['Hair replacement', 'Tip repair', 'Frog adjustment', 'Rehairing']
  }
]

const InstrumentGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instruments.map((instrument, index) => (
        <FlipCard
          key={instrument.name}
          front={
            <div className="w-full h-full bg-gradient-to-br from-cta to-cta/80 rounded-2xl flex items-center justify-center p-6">
              <h3 className="text-white text-xl font-bold text-center">
                {instrument.name}
              </h3>
            </div>
          }
          back={
            <div className="w-full h-full bg-white rounded-2xl p-6 flex flex-col justify-center">
              <h4 className="text-accent-dark text-lg font-semibold mb-4 text-center">
                {instrument.name} Services
              </h4>
              <ul className="space-y-2">
                {instrument.services.map((service, serviceIndex) => (
                  <li key={serviceIndex} className="text-sm text-text flex items-center">
                    <svg className="w-4 h-4 text-cta mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          }
          className="h-48"
          tabIndex={index}
        />
      ))}
    </div>
  )
}

export default InstrumentGrid
