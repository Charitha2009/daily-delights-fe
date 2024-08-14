import React, { useState } from 'react';
import '../Styles/Signup.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        setFirstNameError(value ? '' : 'First Name is required');
        break;
      case 'lastName':
        setLastNameError(value ? '' : 'Last Name is required');
        break;
      case 'email':
        setEmailError(validateEmail(value) ? '' : 'Invalid email address');
        break;
      case 'password':
        setPasswordError(value ? '' : 'Password is required');
        break;
      case 'confirmPassword':
        setConfirmPasswordError(value === password ? '' : 'Passwords do not match');
        break;
      default:
        break;
    }
  };

  const Popup = ({ message, onClose }) => (
    <div className="popup">
      <div className="popup-inner">
        {/* <h2>Error</h2> */}
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField('firstName', firstName);
    validateField('lastName', lastName);
    validateField('email', email);
    validateField('password', password);
    validateField('confirmPassword', confirmPassword);

    if (
      firstName &&
      lastName &&
      validateEmail(email) &&
      password &&
      confirmPassword === password
    ) {
      try {
        const response = await axios.post('http://localhost:4000/api/users/signup', {
          firstName,
          lastName,
          email,
          password,
        });
        if (response.data) {
          setPopupMessage('User created successfully!');
          setShowPopup(true);
        } else {
          setPopupMessage('An error occurred while creating the user');
          setShowPopup(true);
        }
        console.log(response.data);
        // Redirect to login page or display a success message
      } catch (error) {
        const errorMessage = error.response?.data.message || 'An error occurred while creating the user';
        if (error.response && error.response.status === 400 && errorMessage === 'User already exists') {
          setPopupMessage('User already exists. Please login or use a different email.');
        } else {
          setPopupMessage(errorMessage);
        }
        setShowPopup(true);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <div>
      <Navbar />
      <div className='signup-container'>
        <div className='signup-form-container'>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => validateField('firstName', e.target.value)}
                required
              />
              {firstNameError && <p className="error"><b>{firstNameError}</b></p>}
            </div>
            <div className="input-container">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => validateField('lastName', e.target.value)}
                required
              />
              {lastNameError && <p className="error"><b>{lastNameError}</b></p>}
            </div>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)}
                required
              />
              {emailError && <p className="error"><b>{emailError}</b></p>}
            </div>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => validateField('password', e.target.value)}
                required
              />
              {passwordError && <p className="error"><b>{passwordError}</b></p>}
            </div>
            <div className="input-container">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={(e) => validateField('confirmPassword', e.target.value)}
                required
              />
              {confirmPasswordError && <p className="error"><b>{confirmPasswordError}</b></p>}
            </div>
            <button type="submit">Sign Up</button>
            <p className='signup-span'>
              Already Signed Up? <Link to="/login">Click here to login</Link>
            </p>
          </form>
        </div>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      </div>
    </div>
  );
};

export default Signup;
