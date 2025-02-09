import React from 'react';
import '../../assets/styles/Navbar.css';
import logo from '../../assets/images/house.png';

const Navbar = ({ message }) => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" onClick={handleLogoClick} />
        <span className="navbar-title">FutureTecht</span>
      </div>
      {message && <div className="navbar-message">{message}</div>}
    </nav>
  );
};

export default Navbar;