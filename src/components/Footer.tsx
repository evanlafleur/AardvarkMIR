import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Aardvark Instrument Repair</h3>
            <p className="text-gray-300">
              Professional instrument repair services with over 20 years of experience.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="text-gray-300 hover:text-white transition-colors">Recent Work</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>123 Music Street</p>
              <p>Harmony City, HC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@aardvarkrepair.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Aardvark Instrument Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
