import React, { useContext } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const name = "Vite + React";
  return <AppContext.Provider value={{ name }}>{children}</AppContext.Provider>;
};

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
