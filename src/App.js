import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from'./Components/Layout/Layout'
import Cart from'./Components/Cart/Cart'
import Categories from'./Components/Categories/Categories'
import Brands from'./Components/Brands/Brands'

import Login from'./Components/Login/Login'
import Register from'./Components/Register/Register'
import ProductDetails from'./Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './Context/UserContext';
import NotFound from './Components/NotFound/NotFound';
import CheckoutOnline from './Components/CheckoutOnline/CheckoutOnline';
import CheckoutCash from './Components/CheckoutCash/CheckoutCash';
import AllOrders from './Components/AllOrders/AllOrders';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';


let routes=createHashRouter([
  {path:'/',element:<Layout/>,children:[

    {index:true,element:<Home/>},
    {path:'Cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'E-commerce' , element:<Home/>},
    {path:'ProductDetails/:id' , element:<ProductDetails/>},
    {path:'Categories',element:<Categories/>},
    {path:'Brands',element:<Brands/>},
    {path:'Login',element:<Login/>},
    {path:'Register',element:<Register/>},
    {path:'CheckoutOnline',element:<ProtectedRoute><CheckoutOnline/></ProtectedRoute>},
    {path:'CheckoutOnline/allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},

    {path:'CheckoutCash',element:<ProtectedRoute><CheckoutCash/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'*',element:<NotFound/>},

  ]}
])

export default function App() {
  let queryClient=new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <UserContextProvider >
    <CartContextProvider >

      <RouterProvider router={routes}></RouterProvider>
      </CartContextProvider >
      </UserContextProvider >
    </QueryClientProvider>

    </>
  );
}
