import axios from 'axios';
import React, { useContext } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FeaturedProducts() {
  let { addToCart } = useContext(CartContext);
let navigate=useNavigate()
  async function addProduct(productId) {
    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Adding product to your cart...',
      success: 'Product added successfully',
    
    });
    let { data } = await addToCart(productId);
  }

  async function getFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isLoading } = useQuery('getFeaturedProducts', getFeaturedProducts);

  return (
    
    <>

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
      <div className="row gy-3 mt-2 ">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <FallingLines color="#4fa94d" width="200" visible={true} ariaLabel="falling-lines-loading" />
          </div>
        
        ) : (
          <>
            {data?.data?.data.map((product) => (
             
              <div className="col-lg-3 cursor-pointer" key={product._id}>
            {product.brand!=null}
                <div className="product py-3 px-3">
                  <Link to={`/ProductDetails/${product._id}`}>
                    <img src={product.imageCover} className="w-100" alt="" />
                    <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                    <h3 className="h6 fw-bolder">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button className="btn bg-main text-white btn-sm text-capitalize w-100 mt-2" onClick={() =>
                    localStorage.getItem('userToken')?addProduct(product.id):navigate('/Login')
                    }>
                        add to cart
                      </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}