import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h2> 404 ERROR !</h2>
        <h3>Page not Found</h3>


        <p>Go to the <Link to='/'>Welcome Page</Link>. </p>
    </div>
  )
}

export default NotFound