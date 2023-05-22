import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RangeSlider from "../components/Slider";
import Slider from "react-slick";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getTitle } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";

const Dashboard = () => {
  getTitle("home");
  const { user } = useGlobalContext();
  const [showDetails, setShowDetails] = useState(false);
  const [detailsHeight, setDetailsHeight] = useState(0);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (showDetails) {
      setDetailsHeight(detailsRef.current.scrollHeight);
    } else {
      setDetailsHeight(0);
    }
  }, [showDetails, detailsRef]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // show arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <header className="status_check flex flex-col items-center justify-center rounded-[3.5rem] bg-blue-200 bg-[url('/images/status_check.svg')] bg-[100%] bg-no-repeat py-5 md:py-10">
        <h4 className="flex gap-1 font-bold">
          <span>Hello</span>
          <span>{user?.firstName}</span>{" "}
          <img src="/icons/hello_emoji.png" alt="hello emoji" />
        </h4>

        <h2 className="mt-5 text-2xl font-bold md:text-4xl">Status Check</h2>
        <p className="mt-1 text-center text-base text-grey lg:text-lg">
          What's your pain level?
        </p>

        {/* range slide */}
        <div className="mt-10 flex w-full justify-center">
          <RangeSlider />
        </div>
      </header>

      <center className="space-y-1 py-12 md:space-y-3 md:py-20">
        <p className="text-center text-base capitalize text-grey lg:text-lg">
          upcoming reminder
        </p>

        <h1 className="text-5xl font-bold">8 : 00 AM</h1>

        <div
          className={`details ${showDetails ? "open" : ""}`}
          ref={detailsRef}
          style={{
            height: `${detailsHeight}px`,
            transition: "height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275",
          }}
        >
          <div className="space-y-4">
            <p className="max-w-md text-base capitalize text-grey lg:text-lg">
              Breakfast with Kinfe and Boms at Mcdonalds lol. This is the text
              field. I think 2/3 lines max. What do you think?{" "}
            </p>

            <p className="max-w-md text-base font-medium capitalize text-grey lg:text-lg">
              Monday - Thursday
            </p>

            <p className="max-w-md text-base capitalize text-grey lg:text-lg">
              Snooze: 10 minutes
            </p>
          </div>
        </div>

        <button
          className="font-medium text-primaryBlue"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <span>Collapse</span>
              <KeyboardArrowUpIcon />
            </>
          ) : (
            <>
              <span>See Details</span>
              <KeyboardArrowDownIcon />
            </>
          )}
        </button>
      </center>

      <div className="flex items-center justify-between gap-2 rounded-3xl border border-gray-200 px-2 py-2 md:px-6">
        <div className="w-16 md:w-36">
          <img src="/icons/dancer.svg" alt="dancer" />
        </div>

        <div className="flex-1">
          <h2 className="font-bold  sm:text-2xl md:text-2xl">
            Never miss a Medication or Meal{" "}
          </h2>
          <p className="text-xs capitalize text-grey lg:text-lg">
            Click to set your medication reminders
          </p>
        </div>

        <button>
          <AddCircleIcon
            className="text-primaryBlue"
            fontSize={window.innerWidth < 768 ? "small" : "large"}
          />
        </button>
      </div>

      <div className="space-y-3 py-24">
        <div className="mb-8 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Articles for you</h2>
          <Link to="/articles" className="font-medium text-primaryBlue">
            See more
          </Link>
        </div>

        <Slider {...settings} className="w-full">
          <Link
            to="/articles/gastric-ulcer-101"
            className="group grid cursor-pointer place-items-center"
          >
            <div className="m-2 border border-gray-200 p-2">
              <img
                src="/images/image_1.png"
                alt="hello image"
                className="w-full transition-all duration-300 group-hover:opacity-75"
              />
              <div className="w-full">
                <h3 className="mt-3 text-xl font-bold">Gastric Ulcer 101</h3>
                <p className="capitalize text-grey">By Bethel Ohanugo</p>
              </div>
            </div>
          </Link>

          <Link
            to="/articles/how-gastric-ulcer-is-diagnosed"
            className="group grid cursor-pointer place-items-center"
          >
            <div className="m-2 border border-gray-200 p-2">
              <img
                src="/images/image_2.png"
                alt="hospital"
                className="w-full transition-all duration-300 group-hover:opacity-75"
              />

              <div className="w-full">
                <h3 className="mt-3 text-xl font-bold">
                  How Gastric Ulcer is Diagnosed
                </h3>
                <p className="capitalize text-grey">By Bethel Ohanugo</p>
              </div>
            </div>
          </Link>

          <Link
            to="/articles/life-modifications"
            className="group grid cursor-pointer place-items-center"
          >
            <div className="m-2 border border-gray-200 p-2">
              <img
                src="/images/image_3.png"
                alt="frown"
                className="w-full transition-all duration-300 group-hover:opacity-75"
              />

              <div className="w-full">
                <h3 className="mt-3 text-xl font-bold">
                  Lifestyle Modification
                </h3>
                <p className="capitalize text-grey">By Bethel Ohanugo</p>
              </div>
            </div>
          </Link>
        </Slider>
      </div>
    </div>
  );
};

export default Dashboard;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#d1d1d1",
        borderRadius: "50%",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#d1d1d1",
        borderRadius: "50%",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}
