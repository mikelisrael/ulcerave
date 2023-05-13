import React, { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../utils/firebase";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
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

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        // check if user exists in the database
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("user exists");
          return;
        } else {
          // add the new user to the database
          const newUser = {
            uid: user.uid,
            firstName: user.displayName.split(" ")[0],
            lastName: user.displayName.split(" ")[1],
            email: user.email,
          };
          await addDoc(collection(db, "users"), newUser);
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
    <>
      <main
        className=" bg-lightGrey flex flex-col justify-between"
        data-aos="zoom-out"
        data-aos-duration="300"
      >
        <div className="max-w-[350px] md:max-w-[500px] mt-24 md:mt-36 mb-20 mx-auto">
          <center>
            <img src="/logo.svg" className="w-40" alt="logo" />
          </center>
          <form
            className="bg-white rounded-3xl py-7 px-4 sm:px-7 md:px-14"
            onSubmit={handleSubmit}
          >
            <center>
              <h2 className="font-bold text-2xl">Welcome back</h2>
              <p className="text-grey">Please enter your details to Sign in</p>
            </center>

            <div className="mt-8 text-grey">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-grey rounded-md py-3 px-4 outline-none"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              {/* style password with eye icon */}
              <div className="mt-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-grey rounded-md py-3 px-4 outline-none"
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
                className="mt-2 hover:underline block text-primaryBlue font-medium w-max"
              >
                Forgot Password?
              </a>

              <button
                disabled={!isEnabled}
                type="submit"
                className="mt-8 main_btn themed w-full disabled:bg-gray-300 disabled:cursor-not-allowed focus:disabled:!bg-gray-300 hover:disabled:!bg-gray-300"
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
            <div className="border-t-lightGrey border-t-2 pt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-grey px-5 py-3 rounded-full font-semibold flex items-center justify-center gap-3"
              >
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
    </>
  );
};

export default Login;
