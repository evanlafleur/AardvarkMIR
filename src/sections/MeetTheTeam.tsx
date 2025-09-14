import React from 'react'
import Section from '../components/Section'

const teamMembers = [
  {
    name: 'Vickie La Fleur',
    role: 'Owner/President',
    experience: '30 years',
    specialties: ['Business management', 'Customer relations', 'Quality assurance', 'Strategic planning'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Bill La Fleur',
    role: 'Master Repair Technician',
    experience: '25 years',
    specialties: ['All instrument types', 'Brass instruments', 'Woodwind repair', 'String instruments', 'Restoration'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
  }
]

const MeetTheTeam: React.FC = () => {
  return (
    <Section id="team" className="bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-accent-dark text-center mb-12">
          Meet Our Expert Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="card text-center max-w-sm mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-accent-dark mb-2">
                {member.name}
              </h3>
              <p className="text-cta font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {member.experience} of experience
              </p>
              <div>
                <h4 className="text-sm font-semibold text-accent-dark mb-2">
                  Specialties:
                </h4>
                <ul className="space-y-2">
                  {member.specialties.map((specialty, specIndex) => (
                    <li key={specIndex} className="text-sm text-text flex items-center justify-center">
                      <svg className="w-3 h-3 text-cta mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default MeetTheTeam
