import React, { useContext } from 'react'
import Style from './Navbar.module.css' 
import Logo from'../../finalProject assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
// UserContext
export default function Navbar() {
  let {userToken,setUserToken}=useContext(UserContext)
  let navigate=useNavigate()
  userToken=localStorage.getItem('userToken');
  function logout()
  {
    setUserToken(null)
    localStorage.removeItem('userToken');
    navigate('/Login')
  }
  return (<>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid d-flex align-items-center">
    <Link className="navbar-brand" to={'/'}><img src={Logo}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button >
    <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken? <>
              <li className="nav-item">
          <Link className="nav-link " to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/Cart'}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/Categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/Brands'}>Brands</Link>
        </li>
        </>:<>
        <li className="nav-item">
          <Link className="nav-link " to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/Categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/Brands'}>Brands</Link>
        </li>
        </>
        
      }
 
      </ul>
      
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userToken?  <li className="nav-item cursor-pointer">
              <span className="nav-link" onClick={()=>logout()}>Logout</span>
            </li>: <>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            </>
            
            }
    
          
      </ul>
      
    
    </div>

  </div>
</nav>
  </>
  
  )
}
