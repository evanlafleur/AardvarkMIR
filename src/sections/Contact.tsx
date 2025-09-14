import React from 'react'
import Section from '../components/Section'

const Contact: React.FC = () => {
  return (
    <Section id="contact" className="bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-accent-dark text-center mb-12">
          Contact Us
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-accent-dark mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-cta mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-accent-dark">Address</p>
                    <p className="text-text">123 Music Street<br />Harmony City, HC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-cta mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-accent-dark">Phone</p>
                    <p className="text-text">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-cta mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-accent-dark">Email</p>
                    <p className="text-text">info@aardvarkrepair.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-accent-dark mb-4">
                Business Hours
              </h4>
              <div className="space-y-2 text-text">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-accent-dark mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-accent-dark mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-accent-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="instrument" className="block text-sm font-semibold text-accent-dark mb-2">
                  Instrument Type
                </label>
                <select
                  id="instrument"
                  name="instrument"
                  className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                >
                  <option value="">Select an instrument</option>
                  <option value="brass">Brass (Trumpet, Trombone, etc.)</option>
                  <option value="woodwind">Woodwind (Saxophone, Clarinet, etc.)</option>
                  <option value="string">String (Violin, Guitar, etc.)</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-accent-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                  placeholder="Describe your repair needs..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
