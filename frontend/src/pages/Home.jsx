import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils/Error';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User LoggedOut');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }

  const handleForgotPassword = () => {
    navigate('/resetpassword');
  };

  return (
    <div  >
        <h1 className='h2'>Welcome {loggedInUser} ✨</h1>
      <div className='button-group'>
        <button onClick={handleLogout}>Logout</button>
        <button type='button' onClick={handleForgotPassword}> Reset Password</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
