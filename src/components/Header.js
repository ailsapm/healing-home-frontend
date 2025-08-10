//import React and useContext hook
import React, { useContext } from 'react';
//import Link for client-side routing
import { Link } from 'react-router-dom';
//import UserContext to access the current user's login state
import { UserContext } from '../contexts/UserContext';
//import logo image
import logo from '../assets/logo.png';
//import stylesheet
import '../styles/style.css';


const Header = () => {
  //get the user object from context
  const { user } = useContext(UserContext);

  return (
    //className header to apply css styling
    <header className="header">
      {/* logo and title link to either "/" or "/home" depending on user login status */}
      <Link to={user ? "/home" : "/"} className="header-link">
        <img 
          src={logo} 
          alt="Healing Home Logo" 
          className="header-logo" 
        />
        <h1 className="header-title">Healing Home</h1>
      </Link>
      {/* tagline displayed to right of header */}
      <div className="header-tagline">
        Wellness begins at home
      </div>
    </header>
  );
}

export default Header;

