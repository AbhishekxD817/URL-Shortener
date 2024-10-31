import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RedirectPage from './RedirectPage.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "u/:shortenUrl", element: <RedirectPage /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
