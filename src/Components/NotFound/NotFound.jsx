import React from 'react'
import notfound from'../../finalProject assets/images/error.svg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (<>
    <Helmet> <title>Not found</title> </Helmet>

  <div className='d-flex justify-content-center align-items-center'>

    <img src={notfound} className='w-75'/>
  </div>
  </>
  )
}
