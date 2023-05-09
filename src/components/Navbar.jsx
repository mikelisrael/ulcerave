import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-10 px-8 md:px-16 lg:px-32 xl:px-48 absolute w-full z-10">
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
          <NavLink to="/">Our features</NavLink>
        </li>
        <li>
          <NavLink to="/">about us</NavLink>
        </li>
        <li>
          <NavLink to="/">contact</NavLink>
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
