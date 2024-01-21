import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import StorePovider from './context/StorePovider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StorePovider>
    <>
      <App />
      <Toaster />
    </>
  </StorePovider>,
)
