import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

const SideNav = ({ isOpen, toggleNav }) => {
  const handleLinkClick = () => {
    if (isOpen) {
      toggleNav();
    }
  };
  return (
    <nav className={isOpen ? "sidenav sidenav--open" : "sidenav"}>
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleLinkClick}>
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/admin" onClick={handleLinkClick}>
            Admin
          </Link>
        </li>
      </ul>
      <button className="sidenav__close-btn" onClick={toggleNav}>
        <i className="fa fa-times"></i>
      </button>
    </nav>
  );
};

export default SideNav;
