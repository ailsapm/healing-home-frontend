//import React and useState/useContext functions
import React, { useState, useContext } from 'react';
//import UserContext to access the logged-in user and setUser function
import { UserContext } from '../contexts/UserContext';
//import navigation tools
import { Navigate, Link } from 'react-router-dom';
//import styling
import '../styles/style.css';

const Register = () => {
  //get user and setUser from context
  const { user, setUser } = useContext(UserContext);

  //set up local state for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  //set up local state for error messages
  const [errors, setErrors] = useState([]);

  //if a user is already logged in, redirect to home
  if (user) return <Navigate to="/home" />;

  //update formData when any input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', //include cookies
        body: JSON.stringify({ user: formData }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); //successfully registered
      } else {
        setErrors(data.errors || ['Something went wrong']);
      }
    } catch (err) {
      setErrors(['Something went wrong']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Register</h2>

      {/* show any error messages */}
      {errors.length > 0 && (
        <ul className="login-error">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      {/* username input */}
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* email input */}
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* password input */}
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* confirm password input */}
      <div className="input-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
      </div>

      {/* submit button */}
      <button type="submit" className="btn custom-btn">
        Register
      </button>

      {/* link to sign in page */}
      <div className="register-section">
        <p>Already have an account?</p>
        <Link to="/login">
          <button type="button" className="btn custom-btn">Sign In</button>
        </Link>
      </div>
    </form>
  );
}

export default Register;

