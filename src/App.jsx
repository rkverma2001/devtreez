import React from 'react'
import Navbar from './components/navbar/Navbar'
import HeroSection from './components/hero/HeroSection'

const App = () => {
  return (
    <div className="overflow-hidden shadow-2xl 
bg-gradient-to-br from-[#14532D] to-[#0F172A]">
      <Navbar/>
      <HeroSection/>
      <div ></div>
    </div>
  )
}

export default App