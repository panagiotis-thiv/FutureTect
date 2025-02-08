import React from 'react';
import './Navbar.css';
import logo from './assets/house.png'; // Adjust the path to your logo

const Navbar = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" onClick={handleLogoClick} />
        <span className="navbar-title">OptiHouse</span>
      </div>
    </nav>
  );
};

export default Navbar;