/* This is a React component called `Dashboard` that renders the main content of a web page. It imports
various components and functions from other files and libraries, such as `useState` and
`useGlobalContext` from React, `RangeSlider`, `AddCircleIcon`, `Link`, and `useNavigate` from
different files in the project, and `getTitle` from a utility function. */
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import RangeSlider from "../components/Slider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getTitle } from "../../utils/helperFunctions";
import { Link, useNavigate } from "react-router-dom";
import AppModal from "../components/RecommendationModal";
import UpcomingReminder from "../components/UpcomingReminder";

const Dashboard = () => {
  getTitle("home");
  const { user } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSliderChange = (event, newValue) => {
    // Handle the slider value change here
    if (newValue > 0) {
      setOpen(true);
    }
  };

  return (
    <main>
      <AppModal open={open} setOpen={setOpen} />
      <div
        className="universal_x pt-28 md:pt-48"
        data-aos="fade-in"
        data-aos-duration="300"
      >
        <header className="status_check flex flex-col items-center justify-center rounded-3xl bg-blue-200 bg-[url('/images/status_check.svg')] bg-cover bg-center bg-no-repeat py-5 md:rounded-[3.5rem] md:py-10">
          <h4 className="flex gap-1 font-bold">
            <span>Hello</span>
            <span>{user?.firstName}</span>{" "}
            <img src="/icons/hello_emoji.png" alt="hello emoji" />
          </h4>

          <h2 className="mt-2 text-2xl font-bold md:mt-5 md:text-4xl">
            Status Check
          </h2>
          <p className="mt-1 text-center text-base text-grey lg:text-lg">
            What's your pain level?
          </p>

          {/* range slide */}
          <div className="mt-10 flex w-full justify-center">
            <RangeSlider handleSliderChange={handleSliderChange} />
          </div>
        </header>

        <UpcomingReminder />

        <div className="flex items-center justify-between gap-2 rounded-3xl border border-gray-200 px-2 py-2 md:px-6">
          <div className="w-16 md:w-36">
            <img src="/icons/dancer.svg" alt="dancer" />
          </div>

          <div className="flex-1">
            <h2 className="whitespace-nowrap text-base font-bold sm:text-lg md:text-2xl">
              Never miss a Medication or Meal{" "}
            </h2>
            <p className="text-xs capitalize text-grey lg:text-lg">
              Click to set your medication reminders
            </p>
          </div>

          <button onClick={() => navigate("/reminder")}>
            <AddCircleIcon
              className="text-primaryBlue"
              fontSize={window.innerWidth < 768 ? "small" : "large"}
            />
          </button>
        </div>

        <div className="relative pt-24">
          <div className="mb-5 flex items-center justify-between gap-3 lg:mb-8">
            <h2 className="text-base font-bold md:text-xl">Articles for you</h2>
            <Link to="/resources" className="font-medium text-primaryBlue">
              See more
            </Link>
          </div>

          <section className="scroll_container overflow-x-auto">
            <div className="flex items-stretch gap-3">
              <Link
                to="/resources/gastric-ulcer-101"
                className="group w-full min-w-[300px] cursor-pointer place-items-center border border-gray-200 p-2"
              >
                <img
                  src="/images/image_1.png"
                  alt="hello image"
                  className="w-full transition-all duration-300 group-hover:opacity-75"
                />
                <div className="w-full">
                  <h3 className="mt-3 text-base font-bold md:text-xl">
                    Gastric Ulcer 101
                  </h3>
                  <p className="capitalize text-grey">By Bethel Ohanugo</p>
                </div>
              </Link>

              <Link
                to="/resources/how-gastric-ulcer-is-diagnosed"
                className="group w-full min-w-[300px] cursor-pointer place-items-center border border-gray-200 p-2"
              >
                <img
                  src="/images/image_2.png"
                  alt="hospital"
                  className="w-full transition-all duration-300 group-hover:opacity-75"
                />

                <div className="w-full">
                  <h3 className="mt-3 text-base font-bold md:text-xl">
                    How Gastric Ulcer is Diagnosed
                  </h3>
                  <p className="capitalize text-grey">By Bethel Ohanugo</p>
                </div>
              </Link>

              <Link
                to="/resources/life-modifications"
                className="group w-full min-w-[300px] cursor-pointer place-items-center border border-gray-200 p-2"
              >
                <img
                  src="/images/image_3.png"
                  alt="frown"
                  className="w-full transition-all duration-300 group-hover:opacity-75"
                />

                <div className="w-full">
                  <h3 className="mt-3 text-base font-bold md:text-xl">
                    Lifestyle Modification
                  </h3>
                  <p className="capitalize text-grey">By Bethel Ohanugo</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
