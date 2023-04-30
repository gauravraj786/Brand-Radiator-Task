import React from "react";
import logo from "../../logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ isOpen, toggleNav }) => {
  return (
    <header className="header">
      <div
        data-testid="hamburger_btn"
        className={isOpen ? "hamburger-btn__open" : "hamburger-btn"}
        onClick={toggleNav}
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <div className="header__logo-container">
        <img src={logo} alt="Logo" className="header__logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/about" className="header__nav-link">
              About
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/contact" className="header__nav-link">
              Contact Us
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/admin" className="header__nav-link">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
