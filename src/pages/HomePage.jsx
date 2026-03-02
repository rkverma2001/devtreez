import React from 'react'
import Navbar from '../components/navbar/Navbar'
import HeroSection from '../components/hero/HeroSection'
import GrowthSection from '../components/products/GrowthSection'
import Footer from '../components/footer/Footer'

const HomePage = () => {
  return (
    <>
    <div className="overflow-hidden shadow-2xl 
bg-gradient-to-br from-[#14532D] to-[#0F172A]
rounded-b-4xl">
  <Navbar/>
  <HeroSection/>
</div>
  <GrowthSection/>
  <Footer/>
    </>
  )
}

export default HomePage