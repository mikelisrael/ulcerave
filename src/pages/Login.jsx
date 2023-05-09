import React from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className=" bg-lightGrey flex flex-col justify-between">
      <div className="max-w-[500px] mt-36 mb-20 mx-auto">
        <center>
          <img src="/logo.svg" className="w-40" alt="logo" />
        </center>
        <form className="bg-white rounded-3xl py-7 px-14">
          <center>
            <h2 className="font-bold text-2xl">Welcome back</h2>
            <p className="text-grey">Please enter your details to Sign in</p>
          </center>

          <div className="mt-8 text-grey">
            <input
              type="email"
              placeholder="Email"
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
            <a
              href=""
              className="mt-2 hover:underline block text-primaryBlue font-medium w-max"
            >
              Forgot Password?
            </a>

            <button type="submit" className="mt-8 main_btn themed w-full">
              Sign in
            </button>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="mt-5 font-medium text-primaryBlue hover:underline"
              >
                Create An account
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t-lightGrey border-t-2 pt-8">
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

      <Footer />
    </main>
  );
};

export default Login;
