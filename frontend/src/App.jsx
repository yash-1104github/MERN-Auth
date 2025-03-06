import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <div>
      <h1 className='h1'>Mern Authentication App</h1>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/home' element={<Home />}  />
      </Routes>
    </div>
  )
}

export default App
