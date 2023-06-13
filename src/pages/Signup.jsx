/* The code below is a React component for a sign-up page. It allows users to create an account by
filling out a form with their first name, last name, email, and password. The component uses
Firebase authentication to create a new user account and Firestore to store user data. It also
includes a sign-up with Google option. The component uses state to manage form input and submission,
and it uses React Router to navigate to different pages based on the user's authentication status.
The component also includes some UI elements such as an eye icon to show/hide the password and a
button to submit the form */
import React, { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../utils/firebase";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getTitle } from "../../utils/helperFunctions";

const SignUp = () => {
  getTitle("sign up");

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;

        const newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          uid: uid,
        };

        // add user to Firestore
        try {
          await addDoc(collection(db, "users"), newUser);
          // fetch the user's document from the Firestore database
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          const userData = docSnap.exists();

          if (!userData.avatar) {
            // navigate to onboarding page if user doesn't have an avatar
            navigate("/onboarding", { replace: true });
          } else {
            // navigate to dashboard page if user has an avatar
            navigate("/dashboard", { replace: true });
          }
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

  // handle sign up with Google popup
  const handleGoogleSignUp = () => {
    setIsSubmitting(true);

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        // check if user exists in the database
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.avatar) {
            // navigate to dashboard if user has an avatar
            navigate("/dashboard", { replace: true });
          } else {
            // navigate to onboarding if user doesn't have an avatar
            navigate("/onboarding", { replace: true });
          }
        } else {
          // add the new user to the database
          const newUser = {
            uid: user.uid,
            firstName: user.displayName.split(" ")[0],
            lastName: user.displayName.split(" ")[1],
            email: user.email,
          };
          await addDoc(collection(db, "users"), newUser);
          navigate("/onboarding", { replace: true });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <main
      className=" flex flex-col justify-between bg-lightGrey"
      data-aos="zoom-out"
      data-aos-duration="300"
    >
      <div className="mx-auto mt-28 w-[20rem] md:mt-36 md:w-[30rem]">
        <center>
          <img src="/logo.svg" className="w-40" alt="logo" />
        </center>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white px-4 py-7 sm:px-7 md:px-14"
        >
          <center>
            <h2 className="text-2xl font-bold">Create an Account</h2>
          </center>

          <div className="mt-8 space-y-6 text-grey">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="w-full rounded-md border border-grey px-4 py-3 outline-none"
              value={user.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="w-full rounded-md border border-grey px-4 py-3 outline-none"
              value={user.lastName}
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="w-full rounded-md border border-grey px-4 py-3 outline-none"
              value={user.email}
              onChange={handleChange}
            />

            {/* style password with eye icon */}
            <div className="relative mt-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="w-full rounded-md border border-grey px-4 py-3 outline-none"
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
              className="main_btn themed mt-8 w-full disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
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
          <div className="mt-6 border-t-2 border-t-lightGrey pt-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-full border border-grey px-5 py-3 font-semibold"
              onClick={handleGoogleSignUp}
            >
              <img src="/icons/google.png" className="w-6" alt="google" />
              <span>Sign up with Google</span>
            </button>

            <center className="mt-3">
              By creating an account, I accept Ulcerave’s{" "}
              <a
                href=""
                className="mt-5 whitespace-nowrap font-medium text-primaryBlue hover:underline"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href=""
                className="mt-5 whitespace-nowrap font-medium text-primaryBlue hover:underline"
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
