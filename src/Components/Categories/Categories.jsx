import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Bars, FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Categories() {
  let [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(false);
const [loading, setloading] = useState(false)
  async function displayByCat(cat) {
    try {
      setFlag(true);
      setloading(true)
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      let filteredProducts = data.data.filter((product) => product.category.name === cat);
      setProducts(filteredProducts);
      setloading(false)
    } catch (error) {
      console.error(error);
    }
  }

  function displayCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  var { data, isLoading } = useQuery('displayCategories', displayCategories);

  return (
    <>
    <Helmet> <title>Categories</title> </Helmet>
      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <FallingLines color='#4fa94d' width='200' visible={true} ariaLabel='falling-lines-loading' />
        </div>
      ) : (
        <div className='container'>
          <div className='row gy-3 mt-4'>
            {data?.data.data.map((category) => (
              <div className='col-md-2 category-container product cursor-pointer p-3' onClick={() => displayByCat(category.name)} key={category.id} >
                <h3 className='text-main text-center'>{category.name}</h3>
              </div>
            ))}
          </div>
  
          {flag ? 
          loading? <div className='d-flex justify-content-center align-items-center '>
          <FallingLines color='#4fa94d' width='200' visible={true} ariaLabel='falling-lines-loading' />
        </div>:
            <div className='mt-3'>
              {products.length > 0 ? (
                <div>
                  <h2 className='text-center fw-bold text-main fs-1 '>Products</h2>
                  <div className='row g-3'>
                    {products.map((product) => (
                      <div className='col-md-3 product py-3 px-3' key={product.id}>
                        <Link to={`/ProductDetails/${product.id}`}>
                          <img src={product.imageCover} alt='' className='w-100' />
                          <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                          <h3 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                          <div className='my-2 d-flex justify-content-between'>
                            <span>{product.price}EGP</span>
                            <span>
                              <i className='fas fa-star rating-color'></i>
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className='text-danger text-center text-uppercase fw-bolder fs-4'>No available products in this category to display</p>
              )}
            </div>
           : null}
        </div>
      )}
    </>
  );
}
