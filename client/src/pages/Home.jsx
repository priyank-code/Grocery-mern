import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import Services from '../components/Services'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      <Hero/>
      <Category/>
      <BestSeller/>
      <Services/>
      <NewsLetter/>
    </div>
  )
}

export default Home