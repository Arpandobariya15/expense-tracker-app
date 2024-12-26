import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
  return (
    <div>
        <h1>Welcome! {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>

            </div>
            <ToastContainer />
    </div>
  )
}

export default Home
