import React, { useState, useEffect } from 'react'
import Section from '../components/Section'
import BeforeAfterPair from '../components/BeforeAfterPair'

interface Pair {
  base: string
  beforeUrl: string
  afterUrl: string
  caption?: string
}

interface Group {
  name: string
  slug: string
  note?: string
  pairs: Pair[]
}

interface Gallery {
  groups: Group[]
}

const RecentWork: React.FC = () => {
  const [gallery, setGallery] = useState<Gallery>({ groups: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) {
          throw new Error('Failed to fetch gallery')
        }
        const data = await response.json()
        setGallery(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (loading) {
    return (
      <Section id="work" className="bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-accent-dark mb-12">
            Recent Work
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta"></div>
          </div>
        </div>
      </Section>
    )
  }

  if (error) {
    return (
      <Section id="work" className="bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-accent-dark mb-12">
            Recent Work
          </h2>
          <div className="text-red-600">
            <p>Error loading gallery: {error}</p>
          </div>
        </div>
      </Section>
    )
  }

  if (gallery.groups.length === 0) {
    return (
      <Section id="work" className="bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-accent-dark mb-12">
            Recent Work
          </h2>
          <p className="text-xl text-text">
            No recent work to display. Check back soon for our latest projects!
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section id="work" className="bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-accent-dark text-center mb-12">
          Recent Work
        </h2>
        
        {gallery.groups.map((group) => (
          <div key={group.slug} className="mb-16">
            <h3 className="text-3xl font-bold text-accent-dark mb-4">
              {group.name}
            </h3>
            
            {group.note && (
              <p className="text-lg text-text mb-8 max-w-4xl">
                {group.note}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {group.pairs.map((pair, index) => (
                <BeforeAfterPair
                  key={`${group.slug}-${pair.base}-${index}`}
                  beforeUrl={pair.beforeUrl}
                  afterUrl={pair.afterUrl}
                  caption={pair.caption}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default RecentWork
