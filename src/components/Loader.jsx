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
