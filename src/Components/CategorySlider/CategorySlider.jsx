import React from 'react'
import Style from './CategorySlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function CategorySlider() {
   function getCatigories()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let{data, isLoading}=useQuery('getCatigories',getCatigories)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
    
  };
  return (<div className='d-md-block d-none'>




   
   <h2 className='text-capitalize'>Shop popular categories</h2>
   
   {isLoading?'':
   <Link to={'/Categories'}>
    <div className="row ">
    <Slider className='' {...settings}>
   {(data.data.data).map((category,index) => (
    <div className='px-3' key={index}>
      <img src={category.image} className='w-100' alt="" height={180}/>
      <span className='text-center text-main me-2 d-block'>{category.name}</span>
    </div>
    
   ))}
 </Slider> 
    </div>
    
   
   </Link>

   
   
   
   
   
   }
  </div>
  )
}
