/* The code below is a React component for a login page. It allows users to sign in with their email
and password or with their Google account. The component uses Firebase authentication and Firestore
to handle user authentication and database storage. The component also includes form validation and
error handling using the react-toastify library. */
import React, { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../utils/firebase";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getTitle } from "../../utils/helperFunctions";

const Login = () => {
  getTitle("login");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEnabled = user.email && user.password && !isSubmitting;

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

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;

        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          return toast.error("Invalid email or password");
        }

        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in the database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // User already exists in the database
        const userData = docSnap.data();
        if (userData.avatar) {
          // navigate to dashboard if user has an avatar
          navigate("/dashboard", { replace: true });
        } else {
          // navigate to onboarding if user doesn't have an avatar
          navigate("/onboarding", { replace: true });
        }
      } else {
        // Add the new user to the database
        const newUser = {
          uid: user.uid,
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          email: user.email,
        };
        await setDoc(doc(db, "users", user.uid), newUser);
      }

      setIsSubmitting(false);
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
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
          className="rounded-3xl bg-white px-4 py-7 sm:px-7 md:px-14"
          onSubmit={handleSubmit}
        >
          <center>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-grey">Please enter your details to Sign in</p>
          </center>

          <div className="mt-8 text-grey">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-grey px-4 py-3 outline-none"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            {/* style password with eye icon */}
            <div className="relative mt-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-md border border-grey px-4 py-3 outline-none"
                name="password"
                value={user.password}
                onChange={handleChange}
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
            <a
              href=""
              className="mt-2 block w-max font-medium text-primaryBlue hover:underline"
            >
              Forgot Password?
            </a>

            <button
              disabled={!isEnabled}
              type="submit"
              className="main_btn themed mt-8 w-full disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
            >
              Sign in
            </button>

            <center className="my-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="mt-5 font-medium text-primaryBlue hover:underline"
              >
                Create An account
              </Link>
            </center>
          </div>

          {/* sign in with google button */}
          <div className="border-t-2 border-t-lightGrey pt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-grey px-5 py-3 font-semibold"
              disabled={isSubmitting}
            >
              <img src="/icons/google.png" className="w-6" alt="google" />
              <span>Sign in with Google</span>
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

export default Login;
