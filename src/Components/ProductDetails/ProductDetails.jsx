import React, { useEffect, useContext } from 'react';
import Style from './ProductDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { FallingLines } from 'react-loader-spinner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../Context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let navigate=useNavigate()
  let { id } = useParams();
  let { addToCart } = useContext(CartContext);
  async function addProduct(productId) {
    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Adding product to your cart...',
      success: 'Product added successfully',
    
    });
    let { data } = await addToCart(productId);
  }
  async function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading } = useQuery('getProductDetails', () => getProductDetails(id));

  let product = data?.data.data;

  // Slider settings
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  return (
    <>
    <Helmet> <title>Product details</title> </Helmet>

    <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover
theme="dark"
/>
      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <FallingLines color='#4fa94d' width='200' visible={true} ariaLabel='falling-lines-loading' />
        </div>
      ) : (
        <>
          <div className='row d-flex align-items-center m-2'>
            <div className='col-md-4 my-5'>
              
              <Slider {...settings} >
                {product.images.map((imageSrc, index) => (
                  <div key={index}>
                    <img src={imageSrc} className='w-100' alt='' />
                  </div>
                ))}
              </Slider>
            </div>
            <div className='col-md-8 '>
              <h3>{product.title}</h3>
              <p className='my-4'>{product.description}</p>
              <h6 className='text-main fw-bold'>{product.category.name}</h6>
              <div className='d-flex align-items-center justify-content-between'>
                <span className='fw-bolder'>{product.price} EGP</span>
                <span>
                  <i className='fas fa-star rating-color'></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <button className='btn bg-main text-center text-capitalize text-white my-4 w-100'onClick={() => 
              localStorage.getItem('userToken')?addProduct(product._id):navigate('/Login')
              
              } >+ add to cart</button>
        
            </div>
          </div>
        </>
      )}
    </>
  );
}


      