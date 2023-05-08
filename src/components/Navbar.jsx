import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <NavLink to="/">
        <img src="/logo.svg" alt="logo" />
      </NavLink>

      <ul className="capitalize flex items-center gap-8 lg:gap-10 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive && "text-primaryBlue"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="features">Our features</NavLink>
        </li>
        <li>
          <NavLink to="about">about us</NavLink>
        </li>
        <li>
          <NavLink to="contact">contact</NavLink>
        </li>
      </ul>

      <button
        onClick={() => navigate("login")}
        className="main_btn transparent"
      >
        Log in
      </button>
    </nav>
  );
};

export default Navbar;
