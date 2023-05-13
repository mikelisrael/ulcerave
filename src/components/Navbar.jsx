import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import { useGlobalContext } from "../context";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useGlobalContext();
  const { pathname } = useLocation();
  const [navBarVisible, setNavBarVisible] = useState(false);
  const [onboardingLoaded, setOnboardingLoaded] = useState(false); // new state variable

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
        });

        setIsLoggedIn(true);

        // fetch user document from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().avatar) {
          // navigate to dashboard page if user has an avatar
          navigate("/dashboard", { replace: true });
        } else {
          // navigate to onboarding page if user doesn't have an avatar
          navigate("/onboarding", { replace: true });
        }
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

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

  useEffect(() => {
    if (isLoggedIn) {
      if (!user?.avatar) {
        if (!onboardingLoaded) {
          // check if onboarding page has already been loaded
          navigate("/onboarding", { replace: true });
          setOnboardingLoaded(true); // set onboardingLoaded to true
        }
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoggedIn, user, onboardingLoaded]); // include onboardingLoaded as a dependency

  // sign out
  const handleSignOut = () => {
    auth.signOut();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`flex justify-between items-center py-10 px-8 md:px-16 lg:px-32 xl:px-48 absolute w-full z-10 ${
        pathname === "/onboarding" && "hidden"
      } ${isLoggedIn && "border-b border-gray-200"}`}
    >
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
            <li className="text-primaryBlue" onClick={handleSignOut}>
              sign out
            </li>
          </>
        )}
      </ul>

      {!isLoggedIn ? (
        <button
          onClick={() => navigate("login")}
          className="main_btn transparent"
        >
          Log in
        </button>
      ) : (
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar src={user?.avatar} alt={user?.firstName} />
          <KeyboardArrowDownIcon className="text-primaryBlue" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
