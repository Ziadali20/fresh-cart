import { React, useContext, useState } from 'react'
import Style from './Login.module.css' 
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


import { ThreeDots } from  'react-loader-spinner'
import { Helmet } from 'react-helmet';

export default function Login() {
  let navigate=useNavigate()
  let [error, setError] = useState('')
  
  let {setUserToken}=useContext(UserContext)
const [isLoading, setisLoading] = useState(false)

const [err, seterr] = useState(false)
  let validationSchema=Yup.object({
    email:Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().required('password is required'),
  })

  async function Login(values)
  {
    setisLoading(true)
    let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setisLoading(false)
      setError(err.response.data.message)
    });
    if(data.message==='success')
    {
      setError('')
      setisLoading(false)

      localStorage.setItem("userToken",data.token)
      setUserToken(data.token)
     navigate('/');
    }
   
    
  }
  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema
    ,onSubmit:Login
  })
  return (<>
    <Helmet> <title>Login</title> </Helmet>

  <form onSubmit={formik.handleSubmit}>
  <h2>Login Form</h2>
  {error ? <p className='alert alert-danger my-3'>{error}</p> : ''}

      <label htmlFor="email" >Email</label>
      <input type="email" id='email' className='form-control mb-2'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}
      <label htmlFor="password" >password</label>
      <input type="password" id='password' className='form-control mb-2'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}
      
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

  <Link className='text-capitalize fw-bolder' to={'/Register'}>not have an account?</Link>
  </div>
  <div className=''>
  <button 
    disabled={!(formik.isValid && formik.dirty)}
    className="btn btn-success "
    type="submit"
  >
    Login
  </button>

  </div>
 </div>
 
)}
{err===true?<p className='alert alert-danger my-2 d-inline-block'>Incorrect email or password</p>:''}
    
  </form>
  </>

  )
}
