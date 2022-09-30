import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root';
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Profile from './routes/Profile';
import Landing from './routes/Landing';
import Trips from './routes/Trips';
import Dashboard from './routes/Dashboard';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path='landing' element={<Landing/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='trips' element={<Trips/>} />
      <Route path='dashboard' element={<Dashboard/>}>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
