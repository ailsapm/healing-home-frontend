import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';  //import to access logged in user if any
import { Link } from 'react-router-dom';   //import for navigation
import '../styles/style.css'; //import styles

const LandingPage = () => {
  const { user } = useContext(UserContext); // access user state to show login/register buttons conditionally

  return (
    <div className="landing-container">
      {/* heading */}
      <h1>Welcome to Healing Home!</h1>

      {/* logo */}
      <img
        src="/logo.png"
        alt="Healing Home Logo"
        className="landing-logo"
      />

      <p>Your safe space to heal and grow.</p>

      {/* show login/register only if user is not logged in */}
      {!user && (
        <>
          <Link to="/login">
            <button type="button" className="btn custom-btn">Login</button>
          </Link>
          <br /><br />

          <p>Don't have an account?</p>
          <Link to="/register">
            <button type="button" className="btn custom-btn">Register</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LandingPage;

