import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";


export default function AllOrders() {
  let user=jwtDecode(localStorage.getItem('userToken'));
 const [allOrders, setAllOrders] = useState(null)
 
  async function getAllOrders(id)
  {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  
    setAllOrders(data)

  }
  useEffect(()=>{
  getAllOrders(user.id)

  }
  ,[])
  return (<>
  <Helmet>
  <title >All orders</title>
  </Helmet>
  <h2 className='mt-5 text-center fw-bolder'>All orders</h2>

  <div className="table-responsive">
  <table className="table table-striped">
    <thead className="text-uppercase">
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Number of items</th>
        <th scope="col">Payment method</th>
        <th scope="col">Total Price</th>
      </tr>
    </thead>
    <tbody>
      {allOrders?.map((order) => (
        <tr key={order.id}>
          <td>{order.createdAt.substring(2, 10)}</td>
          <td>{order.cartItems.length}</td>
          <td>{order.paymentMethodType}</td>
          <td>{order.totalOrderPrice}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  </>

  )

}
