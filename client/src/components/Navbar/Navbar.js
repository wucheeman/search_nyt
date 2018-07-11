import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">
      Search the New York Times
    </Link>
    <div>
      <ul className="navbar-nav">
        {/* <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/about"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/" className="nav-link">
            About
          </Link>
        </li> */}
        <li
          className={
            window.location.pathname === "/home"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/saved"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/saved" className="nav-link">
            Saved
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
