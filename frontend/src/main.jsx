import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import FooterPage from './pages/FooterPage.jsx'
import { Toaster } from 'react-hot-toast';
const router =createBrowserRouter([
  {
    path : '/',
    element: <App />,
    children : [
      {
        path : '/dashboard',
        element: <DashboardPage />,
      },
      {
        path : '/register',
        element: <RegisterPage />,
      },
      {
        path : '/login',
        element: <LoginPage />,
      },
    ]
  },
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
