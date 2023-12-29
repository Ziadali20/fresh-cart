import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CheckoutCash() {
  
  const { checkoutCash,getUserCartId} = useContext(CartContext);
  useEffect(()=>{
    getUserCartId();
  },[])
  const [isLoading, setIsLoading] = useState(false);
let navigate=useNavigate()
  async function handleCheckout(values) {
    setIsLoading(true);
 
      let {data} = await checkoutCash(values);
    //  console.log(data?);
    data?console.log(data):console.log('');
    if(data?.status==='success')
    {
      navigate('/allorders')
    
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: handleCheckout
  });

  return (
    <>
    <Helmet> <title>Chekout</title> </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <h2>Shipping Form</h2>
        <label htmlFor="details">Address</label>
        <input
          type="text"
          id="details"
          className="form-control mb-2"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.details && formik.touched.details ? (
          <p className="alert alert-danger">{formik.errors.details}</p>
        ) : null}

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          className="form-control mb-2"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className="alert alert-danger">{formik.errors.phone}</p>
        ) : null}

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          className="form-control mb-2"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.city && formik.touched.city ? (
          <p className="alert alert-danger">{formik.errors.city}</p>
        ) : null}

        {isLoading ? (
          <button className="btn btn-success ms-auto d-block mt-3" disabled>
            <ThreeDots
              height={25}
              width={65}
              radius={9}
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="btn btn-success ms-auto d-block mt-3"
            type="submit"
          >
            Order now
          </button>
        )}
      </form>
    </>
  );
}
