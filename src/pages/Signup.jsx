import React from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <main className=" bg-lightGrey flex flex-col justify-between">
      <div className="max-w-[500px] mt-36 mb-20 mx-auto">
        <center>
          <img src="/logo.svg" className="w-40" alt="logo" />
        </center>
        <form className="bg-white rounded-3xl py-7 px-14">
          <center>
            <h2 className="font-bold text-2xl">Create an Account</h2>
          </center>

          <div className="mt-8 space-y-6 text-grey">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-grey rounded-md py-3 px-4 outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full border border-grey rounded-md py-3 px-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-grey rounded-md py-3 px-4 outline-none"
            />

            {/* style password with eye icon */}
            <div className="mt-6 relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-grey rounded-md py-3 px-4 outline-none"
              />

              <button type="button" className="absolute right-3 top-3">
                <VisibilityOffOutlinedIcon fontSize="small" />
              </button>
            </div>

            <button type="submit" className="mt-8 main_btn themed w-full">
              Sign in
            </button>

            <center>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primaryBlue hover:underline"
              >
                Log in
              </Link>
            </center>
          </div>

          <div className="mt-6 border-t-lightGrey border-t-2 pt-6">
            <button className="w-full border border-grey px-5 py-3 rounded-full font-semibold flex items-center justify-center gap-3">
              <img src="/icons/google.png" className="w-6" alt="google" />
              <span>Sign in with Google</span>
            </button>

            <center className="mt-3">
              By creating an account, I accept Ulcerave’s{" "}
              <a
                href=""
                className="mt-5 font-medium text-primaryBlue hover:underline whitespace-nowrap"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href=""
                className="mt-5 font-medium text-primaryBlue hover:underline whitespace-nowrap"
              >
                Privacy Policy
              </a>
            </center>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
