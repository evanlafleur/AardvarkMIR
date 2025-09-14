import React from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import MeetTheTeam from './sections/MeetTheTeam'
import WhatWeDo from './sections/WhatWeDo'
import WhatWeDontDo from './sections/WhatWeDontDo'
import RecentWork from './sections/RecentWork'
import Contact from './sections/Contact'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <MeetTheTeam />
        <WhatWeDo />
        <WhatWeDontDo />
        <RecentWork />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
