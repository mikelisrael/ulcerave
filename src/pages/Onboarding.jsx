/* This is a React component that handles the onboarding process for a user. It allows the user to
select an avatar from a list of pre-defined images, and then updates the user's avatar in a Firebase
Firestore database. Once the user has selected an avatar, they can proceed to the dashboard page.
The component also includes a loader that is displayed for 5 seconds while the page is loading. */
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { db } from "../utils/firebase";
import Ellipse from "../assets/ellipse_1.png";
import { Avatar } from "@mui/material";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Onboarding = () => {
  // get user
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    "/avatars/avatar_1.svg",
    "/avatars/avatar_2.svg",
    "/avatars/avatar_3.svg",
    "/avatars/avatar_4.svg",
    "/avatars/avatar_5.svg",
    "/avatars/avatar_7.svg",
    "/avatars/avatar_8.svg",
    "/avatars/avatar_9.svg",
    "/avatars/avatar_12.svg",
    "/avatars/avatar_11.svg",
    "/avatars/avatar_13.svg",
    "/avatars/avatar_14.svg",
    "/avatars/avatar_15.svg",
    "/avatars/avatar_16.svg",
    "/avatars/avatar_10.svg",
    "/avatars/avatar_6.svg",
  ];

  const isEnabled = selectedAvatar;

  const setAvatar = async (avatar) => {
    // push to db collection firestore
    const docRef = collection(db, "users");

    const snapshots = await getDocs(docRef);

    try {
      // set to doc
      snapshots.forEach(async (item) => {
        if (item?.data()?.uid === user?.uid) {
          const docId = item.id;
          await setDoc(
            doc(db, "users", docId),
            { avatar: avatar },
            { merge: true }
          );
        }

        setSelectedAvatar(avatar);
      });

      // console.log("Avatar updated in Firestore!");
    } catch (e) {
      toast("Error updating avatar");
    }
  };

  const proceedToDashboard = () => {
    navigate("/dashboard", { replace: true });
    setUser({
      ...user,
      avatar: selectedAvatar,
    });
  };

  // show loader for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="universal_x pb-24 pt-20 md:pb-24" data-aos="zoom-out">
      <div className="absolute left-1/2 top-0 -z-10 w-full -translate-x-1/2 select-none">
        <img src={Ellipse} alt="" />
      </div>
      <center className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold  md:text-3xl">
            Welcome{" "}
            <span className="capitalize">
              {user?.firstName || <em className="text-xs">loading...</em>}
            </span>
          </h2>
          <p className="text-grey">
            Select an Ulcerave Avatar to complete your setup
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-base  font-bold md:text-xl">
            Select Avatar
          </h3>
          <Avatar
            sx={{ width: 150, height: 150, bgcolor: "#dbdbdb" }}
            alt="display picture"
            src={selectedAvatar} // add the src attribute here with the image URL
          >
            {!user?.avatar && <WallpaperOutlinedIcon />}
          </Avatar>
        </div>
      </center>

      <div className="mt-12 grid grid-cols-4 place-items-center gap-x-4 gap-y-6 sm:grid-cols-6 lg:grid-cols-8 lg:gap-y-9">
        {images.map((image, index) => {
          return (
            <button
              className="w-max rounded-full transition-all duration-300 ease-in-out hover:shadow-md"
              key={index}
              onClick={() => setAvatar(image)}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  border: selectedAvatar === image && "solid 3px #0082e8",
                }}
                alt="display picture"
                src={image} // add the src attribute here with the image URL
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex w-full justify-center md:justify-end">
        <button
          type="submit"
          className="main_btn themed mt-8 disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
          disabled={!isEnabled}
          onClick={() => proceedToDashboard()}
        >
          <span className="ml-3 inline-block">Proceed to Home Page</span>
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </main>
  );
};

export default Onboarding;
