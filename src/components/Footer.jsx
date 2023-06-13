/**
 * This is a React functional component that renders a footer with a logo and a copyright notice.
 * @returns The Footer component is being returned, which contains a footer element with a dark
 * background color and white text. Inside the footer, there is a centered image with a class of "w-40"
 * and an alt attribute of "logo", as well as a small element with a copyright notice and the text
 * "ULCERAVE".
 */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark py-7 text-white">
      <center>
        <img src="/logo.svg" className="w-40" alt="logo" />
        <small className="-mt-2 block">&copy; 2023 ULCERAVE</small>
      </center>
    </footer>
  );
};

export default Footer;
