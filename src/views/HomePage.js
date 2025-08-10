import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext'; //import context to access user data
import '../styles/style.css'; //import styles

//homePage component
const HomePage = () => {
  //get  current user object from UserContext
  const { user } = useContext(UserContext);

  //if user data hasn't loaded yet, show a loading message
  if (!user) return <p>Loading user...</p>;

  return (
    //main container with centred layout and padding
    <main className="container d-flex justify-content-center align-items-start min-vh-100 py-5">
      {/* card wrapper with custom styling */}
      <div className="custom-text-card">
        <div className="card-body">
          {/* personalized welcome heading */}
          <h2 className="card-title mb-4">
            Welcome back, {user.username || 'friend'}!
          </h2>

          {/* update and announcement messages */}
          <p>
            There's a lot blooming lately - both in the garden and in our healing space! Here's what's new:
          </p>

          {/* highlight new recipes */}
          <p>
            <strong>New in the Healing Apothecary</strong> - Our summer herbal blends are here, featuring cooling herbs to support you through the season. Check out our new <em>Lemon Balm & Hibiscus</em> remedy.
          </p>

          {/* mention new blog post */}
          <p>
            <strong>Latest from the Healing Home Journal</strong> - “Cooling Herbs for Summer Heat & Heart Support” is live on the blog! Holistic tips, plant wisdom, and seasonal wellness support.
          </p>

          <p className="mt-2">
            We're always evolving, and your presence is a big part of this community's heart. Make yourself at home, and let us support your wellness journey this season.
          </p>

          <p className="mt-2">With love and light,</p>
          <p><strong>The Healing Home Team</strong></p>

          {/* logo image */}
          <img
            src="/logo.png"
            alt="Healing Home Logo"
            className="homepage-logo"
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

