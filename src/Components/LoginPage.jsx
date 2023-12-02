import React, { useState } from 'react';
import './LoginPage.css'; // Import your stylesheet

const LoginPage = ({onLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="button" onClick={handleSubmit} className="save-button">
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
