import React from 'react'
import Style from './MainSlider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImage1 from'../../finalProject assets/images/slider-image-1.jpeg'
import sliderImage2 from'../../finalProject assets/images/slider-image-2.jpeg'
import sliderImage3 from'../../finalProject assets/images/slider-image-3.jpeg'
import bannerImage1 from'../../finalProject assets/images/grocery-banner.png'
import bannerImage2 from'../../finalProject assets/images/grocery-banner-2.jpeg'
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow:false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
 

  return (
   <>
   <div className="container">
    <div className="row gx-0">
      <div className="col-md-8">
        <div>
        <Slider {...settings}>
          <img src={sliderImage3} alt="sliderImage3" className='w-100' height={400} />
          <img src={sliderImage2} alt="sliderImage2" className='w-100' height={400} />
          <img src={sliderImage1} alt="sliderImage1" className='w-100' height={400} />
        </Slider>
        </div>
      </div>
      <div className="col-md-4">
        <img src={bannerImage1} alt="bannerImage1"  className='w-100' height={200} />
        <img src={bannerImage2} alt="bannerImage2"  className='w-100' height={200} />
      </div>
    </div>
   </div>
   </>
  )
}
