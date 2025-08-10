//import Link for client-side routing
import { Link } from 'react-router-dom';
//import useContext hook
import { useContext } from 'react';
//import UserContext to get user info and logout function
import { UserContext } from '../contexts/UserContext';
//import styling
import '../styles/style.css';

const Navbar = () => {
  // get the user and handleLogout values from context
  const { user, handleLogout } = useContext(UserContext);

  return (
    // use className to apply navbar styles
    <nav className="navbar">
      <ul className="navbar-list">
        {user ? (
          <>
            {/* links visible only when user is logged in */}
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/plants">Healing Plants</Link></li> 
            <li><Link to="/courses">Healing Courses</Link></li>   
            <li><Link to="/blog">Healing Home Journal</Link></li> 
            <li><Link to="/recipes">Healing Apothecary</Link></li> 
            <li><Link to="/healing-moments">Healing Moments</Link></li>                 
            <li><Link to="/about">About</Link></li>

            {/* only show Admin Dashboard link if the user is an admin */}
            {user.admin && (
              <li><Link to="/admin">Admin Dashboard</Link></li>
            )}

            {/* custom logout button styled to fit into navbar */}
            <li>
              <button type="button" onClick={handleLogout} className="btn custom-btn-navbar">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            {/* links visible when no user is logged in */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/about">About</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;



