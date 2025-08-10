import React from 'react';
//importing styles
import '../styles/style.css';

const About = () => {
  return (
    // centre content vertically and horizontally using flexbox 
    <div className="container d-flex justify-content-center align-items-start min-vh-100 py-5">
      
      {/* custom styled card for text content */}
      <div className="custom-text-card">
        <div className="card-body">
          
          {/* page heading */}
          <h1 className="card-title mb-4">About Healing Home</h1>

          {/* about text */}
          <p>
            Healing Home is an online sanctuary for mindful living and traditional wellness.
            We offer online classes and resources that help you slow down, reconnect,
            and restore — all from the comfort of your own space.
          </p>

          <p>
            No travel. No pressure. Just space to heal — at your pace, in your way.
          </p>

          <p>
            Whether you're seeking balance, a sense of calm, renewed health, or a deeper connection
            to yourself, Healing Home gives you the tools to begin — and continue — your journey to
            well-being, wherever you are.
          </p>

          <p>Welcome home.</p>

          {/* centered logo image */}
          <img
            src="/logo.png"
            alt="Healing Home Logo"
            className="about-logo"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
