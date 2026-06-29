import React from 'react'
import Hero from './components/Hero'
import { Testimonials } from './components/Testimonials'
import { FeaturedProducts } from './components/FeaturedProducts'
import { useTitle } from '../../hooks/useTitle'
import { Faq } from './components/Faq'

const Homepage = () => {
  useTitle("Access latest computer science ebooks")
  return (
 <main>
  <Hero/>
  <Faq/>
  <FeaturedProducts/>
  <Testimonials/>
  
 </main>
  )
}

export default Homepage
