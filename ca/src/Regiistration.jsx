import React, { useState } from 'react';
import './App.css';

const Register = ({ onSuccessfulRegistration }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const hasThreeOrMoreChars = (str) => str.length >= 3 && str.length <= 30;
  const isNameValid = (name) => hasThreeOrMoreChars(name) && /^[a-zA-Z\s]+$/.test(name);

  const isEmailValid = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const hasTenOrMoreChars = (str) => str.length >= 10;
  const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
  const isPasswordValid = (password) => hasTenOrMoreChars(password) && hasSpecialChar(password);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (isNameValid(user.name) && isEmailValid(user.email) && isPasswordValid(user.password) && user.password === user.repeatPassword) {
      setFormValid(true);
      console.log('User Data:', user);
      onSuccessfulRegistration();
    } else {
      setFormValid(false);
      setErrorMessage('Please check your inputs');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        {!formValid && formSubmitted && !isNameValid(user.name) && <span>Name should be 3 to 30 characters</span>}

        <label>
          Email:
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        {!formValid && formSubmitted && !isEmailValid(user.email) && <span>Enter a valid email address</span>}

        <label>
          Password:
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        {!formValid && formSubmitted && !isPasswordValid(user.password) && <span>Password should be at least 10 characters with one special character</span>}

        <label>
          Repeat Password:
          <input
            type="password"
            value={user.repeatPassword}
            onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
          />
        </label>
        {!formValid && formSubmitted && user.password !== user.repeatPassword && <span>Passwords do not match</span>}

        {!formValid && formSubmitted && <span>{errorMessage}</span>}

        <button type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;