import React, { useState } from "react";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = ({ onLogin,loginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // console.log(onLogin);
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="heading">Venue Admin Login</div>
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <div className="eye-icon">
          <FontAwesomeIcon icon={showPassword ? faEyeSlash:faEye} onClick={handleTogglePassword} />
          </div>
        </div>
        {loginError && <p style={{marginLeft:'8px'}}>Invalid Username or Password. Please enter again.</p>}
        <button type="button" onClick={handleSubmit} className="signin-button">
          Sign in
        </button>
      </form>
      <p>New Registration ?</p>
    </div>
  );
};

export default LoginPage;
