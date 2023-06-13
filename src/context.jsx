/* This code is creating a React context called `AppContext` and exporting a provider component called
`AppProvider` and a custom hook called `useGlobalContext`. */
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visited, setVisited] = useState(false);
  const [user, setUser] = useState({});

  // on user first visit, cache visited
  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      localStorage.setItem("visited", true);
      setVisited(true);
    } else {
      setVisited(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, visited, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
