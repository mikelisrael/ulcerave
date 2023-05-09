import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useGlobalContext();
  const { pathname } = useLocation();
  const [navBarVisible, setNavBarVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center py-10 px-8 md:px-16 lg:px-32 xl:px-48 absolute w-full z-10">
      <NavLink to={isLoggedIn ? "dashboard" : "/"}>
        <img src="/logo.svg" alt="logo" />
      </NavLink>

      <ul className="capitalize flex items-center gap-8 lg:gap-10 font-medium">
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
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
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reminder"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
              >
                Reminder
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tracker"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
              >
                Tracker
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
              >
                resources
              </NavLink>
            </li>
          </>
        )}
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
