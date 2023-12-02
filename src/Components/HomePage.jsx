// HomePage.jsx
import React, { useState } from 'react';
import LoginPage from './LoginPage';
import './LoginPage.css';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const HomePage = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [id,setId]=useState();
    const [data,setData]=useState();

  const handleLogin = async (username,password) => {
    const requestData = {
        username: username,
        password: password,
    }
    await axios.post(`https://stg.dhunjam.in/account/admin/login`, requestData)
    .then(response => {
        console.log('Login successful', response.data);
        setId(response.data.data.id);
        getAdminDetails(response.data.data.id);
    })
    .catch(error => {
      console.error('Error during login:', error);
    });
  };

  const getAdminDetails = async (id) => {
    console.log(id);
    await axios.get(`https://stg.dhunjam.in/account/admin/${id}`)
    .then(response => {
        console.log('Admin Details', response.data);
        setData(response.data.data);
        setLoggedIn(true);
    })
    .catch(error => {
        console.error('Error during admin:', error);
    })
  }

  

  return (
    <div className='home-container'>
      {isLoggedIn ? (
        <AdminDashboard data={data} />
      ) : (
         <LoginPage onLogin={handleLogin} /> 
       )} 
    </div>
  );
};

export default HomePage;
