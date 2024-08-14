import React, { useState } from 'react';
import '../Styles/Login.css';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    console.log('start handle submit');
    e.preventDefault();
    setServerError('');
    let valid = true;
    console.log('validate email');

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }
    console.log('validate password');

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;
    console.log('backend conn');

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password,
      });
      console.log('credentials');

      if (response.data.success) {
        // Assuming response.data contains user data and possibly a token
        // Store user data/token in localStorage or state if needed
        // Redirect to the dashboard
        const { token } = response.data; // Assuming the token is returned from the server

      // Store token in cookie
      document.cookie = `token=${token}; Path=/; Expires=`;

      // Optionally, you can redirect the user to another page or update state to reflect successful login
      console.log('Login successful');
        console.log('credentials are valid');
        navigate('/dashboard');
      } else {
        setServerError('Invalid email or password');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'An error occurred while logging in');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='login-container'>
        <div className='login-form-container'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>

            {serverError && <p className="error">{serverError}</p>}
            <button type="submit">Login</button>
            <p className='signup-span'>
              New user? <Link to="/signup">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
