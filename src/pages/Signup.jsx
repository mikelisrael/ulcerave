import React, { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import GoToDashboard from "../components/GoToDashboard";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../utils/firebase";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // if all fields are filled and is not submitting
  const isEnabled =
    user.firstName &&
    user.lastName &&
    user.email &&
    user.password &&
    !isSubmitting;

  // handle change
  const handleChange = (e) => {
    // name and value of input
    const name = e.target.name;
    const value = e.target.value;

    // update user
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        console.log(userCredential);
        const newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        };

        // add user to Firestore
        try {
          await addDoc(collection(db, "users"), newUser);
          toast.success("Signed up successfully");
        } catch (e) {
          // error adding user to Firestore database
          toast.error(e.message);
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          return toast.error("Email already in use");
        }
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  //sign up with google
  const handleGoogleSignUp = () => {
    // sign in with google
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const newUser = {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          email: user.email,
          password: "", // since Google sign-in does not provide a password, set it to an empty string
        };
        // add the new user to the database
        addDoc(collection(db, "users"), newUser)
          .then(() => {
            toast.success("Signed up successfully");
          })
          .catch((error) => {
            // if it contains invalid-email, no error
            if (error.code === "auth/invalid-email") {
              return;
            }
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <main
        className=" bg-lightGrey flex flex-col justify-between"
        data-aos="zoom-out"
        data-aos-duration="300"
      >
        <div className="max-w-sm md:max-w-[500px] mt-36 mb-20 mx-auto">
          <center>
            <img src="/logo.svg" className="w-40" alt="logo" />
          </center>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl py-7 px-4 sm:px-7 md:px-14"
          >
            <center>
              <h2 className="font-bold text-2xl">Create an Account</h2>
            </center>

            <div className="mt-8 space-y-6 text-grey">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="w-full border border-grey rounded-md py-3 px-4 outline-none"
                value={user.firstName}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="w-full border border-grey rounded-md py-3 px-4 outline-none"
                value={user.lastName}
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full border border-grey rounded-md py-3 px-4 outline-none"
                value={user.email}
                onChange={handleChange}
              />

              {/* style password with eye icon */}
              <div className="mt-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="w-full border border-grey rounded-md py-3 px-4 outline-none"
                  value={user.password}
                  onChange={handleChange}
                  minLength={6}
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  )}
                </button>
              </div>

              {/* create account button */}
              <button
                type="submit"
                className="mt-8 main_btn themed w-full disabled:bg-gray-300 disabled:cursor-not-allowed focus:!bg-gray-300 hover:!bg-gray-300"
                disabled={!isEnabled}
              >
                Create Account
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

            {/* sign up with google button */}
            <div className="mt-6 border-t-lightGrey border-t-2 pt-6">
              <button
                type="button"
                className="w-full border border-grey px-5 py-3 rounded-full font-semibold flex items-center justify-center gap-3"
                onClick={handleGoogleSignUp}
              >
                <img src="/icons/google.png" className="w-6" alt="google" />
                <span>Sign up with Google</span>
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
    </>
  );
};

export default SignUp;
