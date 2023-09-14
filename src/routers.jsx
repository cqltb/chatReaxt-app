
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/register'
import Login from './components/login'
import PrivateRoute from './components/PrivateRoute'

const Routers = () => {
  return (
    <>
     <Routes>
            {/* <Route index='/' element={<Home />} /> */}
            <Route index='/' element={<PrivateRoute>
              <Home />
              
              </PrivateRoute>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/:name' element={<Store />} /> */} 
    </Routes>
    </>
  )
}

export default Routers