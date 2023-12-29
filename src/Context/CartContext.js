import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let baseUrl = 'https://ecommerce.routemisr.com';
  let headers = {
    token: localStorage.getItem('userToken')
  }
  
  async function addToCart(productId) {
      return axios.post(baseUrl + '/api/v1/cart/', { productId: productId }, { headers: headers }).then((response) => response).catch((error) => error);
  }

  const [CartId, setCartId] = useState(null);
  let url = window.location.href;

  async function getUserCartId() {
    let { data } = await axios.get(baseUrl + '/api/v1/cart', { headers: headers }).then((response) => response).catch((error) => error);
    setCartId(data?.data._id);
  }


  async function getUserCart() {

    return axios.get(baseUrl + '/api/v1/cart', { headers: headers }).then((response) => response).catch((error) => error);
  }

  async function deleteItem(productId) {
    return axios.delete(baseUrl + '/api/v1/cart/' + productId, { headers }).then((response) => response).catch((error) => error);
  }

  async function clearUserCart() {
    return axios.delete(baseUrl + '/api/v1/cart/', { headers }).then((response) => response).catch((error) => error);
  }

  async function updateQuantity(productId, count) {
    return axios.put(baseUrl + '/api/v1/cart/' + productId, { count: count }, { headers: headers }).then((response) => response).catch((error) => error);
  }

  async function checkoutOnline(values) {
    return axios.post(baseUrl + '/api/v1/orders/checkout-session/' + CartId + '?url=' + url, { shippingAddress: values }, { headers: headers }).then((response) => response).catch((error) => error);
  }

  async function checkoutCash(values) {
    return axios.post(baseUrl + '/api/v1/orders/'+ CartId, { shippingAddress: values }, { headers: headers }).then((response) => response).catch((error) => error);
  
  }

  return (
    <>
      <CartContext.Provider value={{ getUserCart, deleteItem, addToCart, updateQuantity, clearUserCart, checkoutOnline, checkoutCash ,getUserCartId}}>
        {props.children}
      </CartContext.Provider>
    </>

  )
}