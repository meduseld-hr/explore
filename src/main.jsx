import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root';
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Planner from './routes/Planner';
import Places from './routes/Places';
import Profile from './routes/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path='planner' element={<Planner/>}/>
      <Route path='places' element={<Places/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
