import React from 'react'
import Section from '../components/Section'

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-accent-dark mb-8">
          About Aardvark Instrument Repair
        </h2>
        <div className="prose prose-lg mx-auto text-text">
          <p className="text-xl leading-relaxed mb-6">
            For over two decades, Aardvark Instrument Repair has been the trusted choice 
            for musicians seeking professional instrument repair services. Our skilled 
            technicians combine traditional craftsmanship with modern techniques to ensure 
            your instruments perform at their best.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            We understand that your instrument is more than just a tool—it's an extension 
            of your musical expression. That's why we treat every repair with the utmost 
            care and attention to detail, ensuring that your instrument not only functions 
            perfectly but also maintains its unique character and sound.
          </p>
          <p className="text-lg leading-relaxed">
            From minor adjustments to major overhauls, we have the expertise and experience 
            to handle all types of musical instruments. Our commitment to quality and 
            customer satisfaction has made us the preferred choice for professional 
            musicians, music educators, and students alike.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default About
