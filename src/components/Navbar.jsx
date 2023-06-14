/* The code below is a React component that renders a navigation bar. It includes conditional rendering
based on whether the user is logged in or not, and displays different links accordingly. It also
includes a mobile navigation menu that can be toggled open and closed. The component also handles
user authentication using Firebase authentication and Firestore. */
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import { useGlobalContext } from "../context";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import OutsideClickHandler from "react-outside-click-handler";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import "./css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useGlobalContext();
  const { pathname } = useLocation();
  const [showPopUP, setShowPopUP] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // refresh window
      if (user) {
        setUser({
          uid: user.uid,
        });

        setIsLoggedIn(true);

        // fetch user document from Firestore
        // const docRef = doc(db, "users", user.uid);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists() && docSnap.data().avatar) {
        //   navigate("/dashboard", { replace: true });
        // } else {
        //   navigate("/onboarding", { replace: true });
        // }
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (!user?.avatar) {
        navigate("/onboarding", { replace: true });
      } else if (user?.avatar) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoggedIn, user]);

  // get user from users collection
  useEffect(() => {
    (async () => {
      let users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.push(doc.data());
      });

      // get user from users array
      const currentUser = users.find(
        (user) => user.uid === auth?.currentUser?.uid
      );

      // set user
      setUser(currentUser);
    })();
  }, [isLoggedIn]);

  // if openMobileNav is true, disable scrolling
  useEffect(() => {
    if (openMobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openMobileNav]);

  const closeMobileNav = () => {
    if (openMobileNav) {
      setOpenMobileNav(false);
    }
  };

  // sign out
  const handleSignOut = () => {
    auth.signOut();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const ReturnLinks = ({ blockLinks }) => {
    return (
      <ul
        className={`${
          blockLinks ? "block" : "hidden"
        } items-center gap-8 space-y-8 text-base font-medium capitalize text-grey md:flex md:space-y-0 md:text-black md:text-inherit lg:gap-10`}
      >
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
                onClick={closeMobileNav}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={closeMobileNav}>
                Our features
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={closeMobileNav}>
                about us
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={closeMobileNav}>
                contact
              </NavLink>
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
                onClick={closeMobileNav}
              >
                <span className="mr-3 md:hidden">
                  <HomeIcon />
                </span>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reminder"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
                onClick={closeMobileNav}
              >
                <span className="mr-3 md:hidden">
                  <AccessTimeIcon />
                </span>
                Reminder
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tracker"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
                onClick={closeMobileNav}
              >
                <span className="mr-3 md:hidden">
                  <BookmarkBorderOutlinedIcon />
                </span>
                Tracker
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive ? "text-primaryBlue" : undefined
                }
                onClick={closeMobileNav}
              >
                <span className="mr-3 md:hidden">
                  <ArticleOutlinedIcon />
                </span>
                resources
              </NavLink>
            </li>
          </>
        )}
      </ul>
    );
  };

  return (
    <>
      <nav
        className={`absolute z-10 flex w-full items-center justify-between px-8 py-5 md:px-16 md:py-10 lg:px-32 xl:px-48  ${
          pathname === "/onboarding" && "hidden" //: "hidden md:flex"
        } ${isLoggedIn && "border-b border-gray-200"}`}
      >
        {isLoggedIn ? (
          <>
            <div className="md:hidden">
              <Avatar src={user?.avatar} alt={user?.firstName} />
            </div>

            <NavLink to="/dashboard" className="hidden md:block">
              <img src="/logo.svg" alt="logo" />
            </NavLink>
          </>
        ) : (
          <NavLink to="/">
            <img src="/logo.svg" alt="logo" />
          </NavLink>
        )}

        <ReturnLinks />

        <div className="hidden md:block">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("login")}
              className="main_btn transparent"
            >
              Log in
            </button>
          ) : (
            <OutsideClickHandler onOutsideClick={() => setShowPopUP(false)}>
              <div
                className="relative flex cursor-pointer items-center gap-2"
                onClick={() => setShowPopUP(!showPopUP)}
              >
                <Avatar src={user?.avatar} alt={user?.firstName} />
                <KeyboardArrowDownIcon className="text-primaryBlue" />

                <div
                  className={`nav_popout absolute right-2/4 top-full mt-1 w-max rounded-md bg-white shadow-sm ${
                    showPopUP && "open"
                  }`}
                >
                  <button
                    className="space-x-1 rounded bg-[#FCEDED] p-2 text-red-500"
                    onClick={handleSignOut}
                  >
                    <LogoutIcon fontSize="small" className="-scale-x-100" />{" "}
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </OutsideClickHandler>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpenMobileNav(true)}>
          <MenuIcon />
        </button>
      </nav>

      {/* mobile nav */}
      <aside
        className={`left-0 top-0 z-30 h-screen w-full bg-white px-8 pt-5 duration-500 md:px-16 lg:px-32 xl:px-48 ${
          openMobileNav ? "fixed md:hidden" : "hidden"
        }`}
      >
        <section
          className={`flex items-center ${
            isLoggedIn ? "justify-end" : "justify-between"
          } `}
        >
          {!isLoggedIn && (
            <NavLink to="/" onClick={closeMobileNav}>
              <img src="/logo.svg" alt="logo" />
            </NavLink>
          )}

          <button onClick={() => setOpenMobileNav(false)}>
            <CloseOutlinedIcon />
          </button>
        </section>

        {isLoggedIn && (
          <section className="mt-3">
            <Avatar
              src={user?.avatar}
              alt={user?.firstName}
              sx={{
                width: 50,
                height: 50,
              }}
            />

            <h2 className="mt-3 text-xl font-bold">
              {user?.firstName + " " + user.lastName}
            </h2>
          </section>
        )}

        <section className="mt-10">
          <ReturnLinks blockLinks={true} />
        </section>

        {!isLoggedIn && (
          <section className="mt-8 space-y-3">
            <button
              onClick={() => {
                navigate("signup");
                closeMobileNav();
              }}
              className="main_btn themed block w-full sm:w-1/2"
            >
              Sign Up
            </button>

            <button
              onClick={() => {
                navigate("login");
                closeMobileNav();
              }}
              className="main_btn transparent block w-full hover:!bg-transparent hover:!text-primaryBlue sm:w-1/2"
            >
              Log in
            </button>
          </section>
        )}

        {isLoggedIn && (
          <button
            className="mt-32 w-full space-x-1 rounded-xl bg-[#FCEDED] p-2 text-base text-red-500"
            onClick={() => {
              handleSignOut();
              closeMobileNav();
            }}
          >
            <LogoutIcon fontSize="small" className="-scale-x-100" />{" "}
            <span>Sign out</span>
          </button>
        )}
      </aside>
    </>
  );
};

export default Navbar;
