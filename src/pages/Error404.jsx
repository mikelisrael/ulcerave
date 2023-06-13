import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Error404 = () => {
  const { isLoggedin } = useGlobalContext();

  return (
    <main>
      <div className="flex h-full flex-col items-center justify-center">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="error"
        />

        <div className="-translate-y-24 text-center">
          <h1 className="text-2xl font-bold">Looks like you're lost</h1>
          <p className="text-gray-500">
            The page you are looking for does not exist
          </p>
          <Link
            to={isLoggedin ? "/dashboard" : "/"}
            className="main_btn themed mx-auto mt-5 block w-max"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error404;
