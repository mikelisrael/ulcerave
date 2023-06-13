/* This is a React component called `Loader` that renders a loading animation on the screen. It imports
the React library and a CSS file for styling. The component returns a div with a class name of `flex
h-screen w-full items-center justify-center` which centers the loading animation on the screen. The
animation itself is created using nested divs with class names of `glowworm-loader`,
`glowworm-motion`, `glowworm-container`, `glowworm-left`, and `glowworm-right`. Finally, the
component is exported as the default export. */
import React from "react";
import "./css/loader.css";

const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="glowworm-loader">
        <div className="glowworm-motion">
          <div className="glowworm-container">
            <div className="glowworm-left"></div>
            <div className="glowworm-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
