import React from 'react'
import { Navigate } from 'react-router-dom'

function ProductRoutes({children}) {

    let token = localStorage.getItem('token')

    if (!token){

        return <Navigate to={"/"}></Navigate>
    }

    return children
}

export default ProductRoutes