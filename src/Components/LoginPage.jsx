import React, { useState } from 'react';
import './LoginPage.css'; // Import your stylesheet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';

const LoginPage = ({onLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');

    const handleTogglePassword=()=>{
        setShowPassword(!showPassword);
    }

    const handleSubmit = () => {
        console.log(onLogin);
        onLogin(username, password);
    }

return (
    <div className="login-container">
      <h2 className="heading">Venue Admin Login</h2>
      <form>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="password-input-container input-container">
          <input
            type={showPassword ?'text':'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <div className="eye-icon">
          <FontAwesomeIcon icon={showPassword ? faEyeSlash:faEye} onClick={handleTogglePassword} />
          </div>
        </div>
        <button type="button" onClick={handleSubmit} className="signin-button">
          Sign in
        </button>
      </form>
      <p>
        New Registration ?
      </p>
    </div>
  );
  
};

export default LoginPage;
