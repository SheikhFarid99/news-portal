import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectDashboatd = () => {

    const userInfo = {
        name: "farid",
        role: "admin"
    }

    if (userInfo) {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }

}

export default ProtectDashboatd