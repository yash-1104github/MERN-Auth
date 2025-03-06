import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/Error';

const ResetPassword = () => {

    const [newPassword, setnewPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            return handleError('You are not authorized to reset password');
        }
        
        if (!email || !newPassword) {
            return handleError('email and password are required');
        }
        try {
            // const url = "http://localhost:8080/auth/resetpassword";
            const url = `https://mern-auth-api-woad.vercel.app/auth/resetpassword`;

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, newPassword })
            });

            const data = await response.json();
            const { success, message, error } = data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            }
            else {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div>
            <div className='container'>
                <h1>Reset Password</h1>
                <form onSubmit={handleResetPassword}>
                    <label>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email...'
                    />
                    <label>New Password</label>
                    <input
                        type='password'
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        placeholder='Enter new password...'
                    />
                    <button type='submit'>Reset Password</button>
                </form>
                <span>Don't want to reset password?   
                <Link to='/login'> Login</Link>
                </span>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ResetPassword
