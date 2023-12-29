import { React, useState } from 'react'
import Style from './Register.module.css' 
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'
import { Helmet } from 'react-helmet';

export default function Register() {

let navigate=useNavigate()
let [error, setError] = useState('')

const [isLoading, setisLoading] = useState(false)
  let validationSchema=Yup.object({
    name:Yup.string().min(3,'Name must be contains of at least 3 characters').required('Name is required').max(20,'Name must less than 20 characters'),
    email:Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().matches(/[A-Z][a-z0-9]{8,20}$/, 'Password must be between 8-20 characters and starts with UPPERCASE letter').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'password , repassword not match').required('repassword is required'),
    phone:Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,'not vaild phone number').required('phone is required')
  })
  async function register(values)
  {
    setisLoading(true)
    let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .catch((err) => {
      setisLoading(false)
      setError(err.response.data.message)
    })
   if(data?.message==='success')
   {
    setError('')

   setisLoading(false)

     navigate('/Login')
   }
  }
  let formik=useFormik({
    initialValues:{
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema
    ,onSubmit:register
  })
  return (<>
<Helmet><title>Register</title></Helmet>
  <form onSubmit={formik.handleSubmit}>
  <h2>Register Form</h2>
  {error ? <p className='alert alert-danger my-3'>{error}</p> : ''}

        <label htmlFor="name">Name:</label>
        <input type="text" id='name' className='form-control mb-2' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>{formik.errors.name}</p> : ''}
      <label htmlFor="email" >Email</label>
      <input type="email" id='email' className='form-control mb-2'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}
      <label htmlFor="password" >password</label>
      <input type="password" id='password' className='form-control mb-2'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}
      <label htmlFor="rePassword" >Repassword</label>
      <input type="password" id='rePassword' className='form-control mb-2'name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>{formik.errors.rePassword}</p> : ''}
      <label htmlFor="phone" >phone</label>
      <input type="tel" id='phone' className='form-control mb-2'name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p> : ''}

      {isLoading ? (
 <button className='btn btn-success ms-auto d-block mt-3'>
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
  <div className='d-flex  mt-3 align-items-center justify-content-between'>
  <div>

  <Link className='text-capitalize fw-bolder' to={'/Login'}>already have an account?</Link>
  </div>
  <div>
  <button
    disabled={!(formik.isValid && formik.dirty)}
    className="btn btn-success "
    type="submit"
  >
    Register
  </button>
  </div>

 </div>
)}

    
  </form>
  </>

  )
}
