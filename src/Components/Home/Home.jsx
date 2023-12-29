import React from 'react'
import Style from './Home.module.css' 
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (<>
    <Helmet> <title>Home</title> </Helmet>

  <div className='overflow-hidden'>
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>
  </div>

  </>
  
  )
}
