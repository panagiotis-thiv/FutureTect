import React from 'react';
import './Navbar.css';
import logo from './assets/house.png'; // Adjust the path to your logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#">
        <img src={logo} alt="OptiHouse Logo" className="navbar-logo" />
        </a>
        <span className="navbar-title">OptiHouse</span>
      </div>
    </nav>
  );
};

export default Navbar;