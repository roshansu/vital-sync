import React from 'react'
import { Navigate } from 'react-router-dom'

const Redirect = ({route}) => {
    return <Navigate to={`/${route}`} />
} 

export default Redirect
