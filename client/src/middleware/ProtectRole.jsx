import React,{useContext} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import storeContext from '../context/storeContext'

const ProtectRole = ({ role }) => {

    const { store } = useContext(storeContext)

    if (store.userInfo?.role === role) {
        return <Outlet />
    } else {
        return <Navigate to='/dashboard/unable-access' />
    }
}

export default ProtectRole