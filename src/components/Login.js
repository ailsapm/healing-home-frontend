//for managing state and context
import React, { useState, useContext } from 'react';
//import UserContext to get user info and update user state
import { UserContext } from '../contexts/UserContext';
//for navigation and redirection
import { useNavigate, Navigate, Link } from 'react-router-dom';
//import styling
import '../styles/style.css';

const Login = () => {
  //get current user and setUser function from context
  const { user, setUser } = useContext(UserContext);
  //state to store email input value
  const [email, setEmail] = useState('');
  //state to store password input value
  const [password, setPassword] = useState('');
  //state to store any error message to be shown
  const [error, setError] = useState(null);
  //to redirect user to another route
  const navigate = useNavigate();

  //if user is already logged in, redirect to home page
  if (user) return <Navigate to="/home" />;

  //function to handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      //send POST request to login endpoint with email and password
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',          //send cookies with request
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        //if login successful, get user data from response
        const user = await response.json();
        //update user context with logged-in user data
        setUser(user);
        //redirect to home page after successful login
        navigate('/home');
      } else {
        //if login fails, get error message from response
        const error = await response.json();
        setError(error.error || 'Invalid credentials');
      }
    } catch (err) {
      //handle network or unexpected errors
      setError('Something went wrong');
    }
  };

  return (
    //login form container
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      {/*show error message if there is one */}
      {error && <p className="login-error">{error}</p>}

       {/* email input field */}
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/*password input field */}
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/*submit login button */}
      <button type="submit" className="btn custom-btn">
        Login
      </button>

       {/*section for users without an account to register */}
      <div className="register-section">
        <p>Don't have an account?</p>
        <Link to="/register">
          <button type="button" className="btn custom-btn">Register</button>
        </Link>
      </div>
    </form>
  );
}

export default Login;
