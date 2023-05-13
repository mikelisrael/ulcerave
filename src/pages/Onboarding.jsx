import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { db } from "../utils/firebase";
import Ellipse from "../assets/ellipse_1.png";
import { Avatar } from "@mui/material";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  // get user
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  // if (user?.avatar) {
  //   navigate("/dashboard", { replace: true });
  //   return;
  // }

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

  const isEnabled = user?.avatar;

  const setAvatar = async (avatar) => {
    // set user avatar to local storage

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
          setUser({
            ...user,
            avatar: avatar,
          });
        }
      });

      // console.log("Avatar updated in Firestore!");
    } catch (e) {
      toast("Error updating avatar");
    }

    setUser({
      ...user,
      avatar: avatar,
    });
  };

  return (
    <div className="universal_x pt-20 pb-24 md:pb-24" data-aos="zoom-out">
      <div className="absolute w-full top-0 left-1/2 -translate-x-1/2 -z-10 select-none">
        <img src={Ellipse} alt="" />
      </div>
      <center className="space-y-6">
        <div>
          <h2 className="font-bold text-2xl  md:text-3xl">
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
          <h3 className="font-bold text-base  md:text-xl mb-5">
            Select Avatar
          </h3>
          <Avatar
            sx={{ width: 150, height: 150, bgcolor: "#dbdbdb" }}
            alt="display picture"
            src={user?.avatar} // add the src attribute here with the image URL
          >
            {!user?.avatar && <WallpaperOutlinedIcon />}
          </Avatar>
        </div>
      </center>

      <div className="grid place-items-center grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6 lg:gap-y-9 mt-12">
        {images.map((image, index) => {
          return (
            <button
              className="hover:shadow-md w-max rounded-full transition-all duration-300 ease-in-out"
              key={index}
              onClick={() => setAvatar(image)}
            >
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt="display picture"
                src={image} // add the src attribute here with the image URL
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 w-full flex justify-center md:justify-end">
        <button
          type="submit"
          className="mt-8 main_btn themed disabled:bg-gray-300 disabled:cursor-not-allowed focus:disabled:!bg-gray-300 hover:disabled:!bg-gray-300"
          disabled={!isEnabled}
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          <span className="ml-3 inline-block">Proceed to Home Page</span>
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
