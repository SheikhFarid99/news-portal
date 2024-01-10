import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './dashboard/layout/MainLayout'
import AdminIndex from './dashboard/pages/AdminIndex'
import Login from './dashboard/pages/Login'
import ProtectDashboatd from './middleware/ProtectDashboatd'
import ProtectRole from './middleware/ProtectRole'
import Unable from './dashboard/pages/Unable'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<ProtectDashboatd />} >
          <Route path='' element={<MainLayout />}>
            <Route path='' element={<Navigate to='/dashboard/admin' />} />
            <Route path='unable-access' element={<Unable/>} />
            <Route path='' element={<ProtectRole role='admin' />} >
              <Route path='admin' element={<AdminIndex />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
