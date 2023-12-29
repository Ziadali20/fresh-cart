import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../Context/CartContext';
import { Bars, FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Cart() {
  const { getUserCart, deleteItem, updateQuantity, clearUserCart,checkout } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartId, setCartId] = useState(null);
  let url=window.location.origin
  async function clearCart() {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1300)),
      {
        pending: 'Clearing your cart...',
        success: 'Cart cleared successfully',
      }
    );

    const { data } = await clearUserCart();
    setCartDetails(null);
    displayCart();
  }

  async function removeItem(productId) {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1300)),
      {
        pending: 'Removing product from your cart...',
        success: 'Product removed successfully',
      }
    );

    const { data } = await deleteItem(productId);
    setCartDetails(data);
    displayCart();
  }

  async function update(productId, count) {
    const { data } = await updateQuantity(productId, count);
    setCartDetails(data);
    displayCart();
  }

  async function displayCart() {

    const { data } = await getUserCart();
    setCartId(data?.data?._id);
  
    setCartDetails(data);
    setIsLoading(false)
  }
let navigate=useNavigate()
  useEffect(() => {
    displayCart();
  }, []);
  return (
    <>
     <Helmet>
                <title>Cart</title>
            </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <FallingLines color="#4fa94d" width={200} visible={true} ariaLabel="falling-lines-loading" />
        </div>
      ) : (
        <>
          {cartDetails === null || cartDetails === undefined ? (
            <h2>Your cart is empty</h2>
          ) : (
            <div className="mx-auto p-2 bg-main-light">
              <h3>Shopping cart</h3>
              <div className='d-flex justify-content-between align-items-center'>
                <div>

              <h4 className="h6 fw-bolder">Cart items: {cartDetails.numOfCartItems}</h4>
              <h6 className="text-main fw-bolder">Total cart price: {cartDetails.data.totalCartPrice}</h6>
                </div>
                <button className="btn d-block text-white bg-main w-25" onClick={() => clearCart()}>
                Clear cart
              </button>
              </div>
              {cartDetails.data.products.map((product) => (
                <div key={product.product.id} className="row mt-2">
                  <div className="col-md-2">
                    <img src={product.product.imageCover} alt="" className="w-100" />
                  </div>
                  <div className="col-md-10">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3>{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                        <h5 className="text-main">price: {product.price}</h5>
                        <button className="btn" onClick={() => removeItem(product.product.id)}>
                          <i className="text-main fas fa-trash-can me-1"></i>Remove
                        </button>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn border-main p-1"
                          onClick={() => update(product.product.id, product.count + 1)}
                        >
                          +
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button
                          className="btn border-main p-1"
                          disabled={product.count <= 1}
                          onClick={() => update(product.product.id, product.count - 1)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* <button className=' btn my-3 d-block m-auto w-50 bg-main text-white'onClick={}><Link to={'/CheckoutOnline'}>checkout</Link></button> */}
            <button className=' btn my-3 d-block m-auto w-50 bg-main text-white fw-bolder text-uppercase'onClick={()=>navigate('/CheckoutOnline')}>checkout online</button>
            <button className=' btn my-3 d-block m-auto w-50 bg-main text-white  fw-bolder text-uppercase'onClick={()=>navigate('/CheckoutCash')}>checkout cash</button>
            </div>
          )}
        </>
      )}
    </>
  );
   }