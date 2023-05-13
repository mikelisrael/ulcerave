import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RangeSlider from "../components/Slider";
import Slider from "react-slick";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Dashboard = () => {
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
    <div className="universal_x pt-28 md:pt-48 pb-24 md:pb-24">
      <header className="bg-[100%] bg-blue-200 bg-[url('/images/status_check.svg')] bg-no-repeat py-5 md:py-10 rounded-[3.5rem] flex items-center justify-center flex-col status_check">
        <h4 className="font-bold flex gap-1">
          <span>Hello</span>
          <span>{user?.firstName}</span>{" "}
          <img src="/icons/hello_emoji.png" alt="hello emoji" />
        </h4>

        <h2 className="mt-5 font-bold text-2xl md:text-4xl">Status Check</h2>
        <p className="mt-1 text-base lg:text-lg text-grey text-center">
          What's your pain level?
        </p>

        {/* range slide */}
        <div className="mt-10 w-full flex justify-center">
          <RangeSlider />
        </div>
      </header>

      <center className="space-y-1 md:space-y-3 py-12 md:py-20">
        <p className="text-base lg:text-lg text-grey text-center capitalize">
          upcoming reminder
        </p>

        <h1 className="text-5xl font-bold">8 : 00 AM</h1>

        <div
          className={`details ${showDetails ? "open" : ""}`}
          ref={detailsRef}
          style={{ height: `${detailsHeight}px`, transition: "height 0.5s" }}
        >
          <div className="space-y-4">
            <p className="max-w-md text-base lg:text-lg text-grey capitalize">
              Breakfast with Kinfe and Boms at Mcdonalds lol. This is the text
              field. I think 2/3 lines max. What do you think?{" "}
            </p>

            <p className="max-w-md text-base lg:text-lg text-grey capitalize font-medium">
              Monday - Thursday
            </p>

            <p className="max-w-md text-base lg:text-lg text-grey capitalize">
              Snooze: 10 minutes
            </p>
          </div>
        </div>

        <button
          className="text-primaryBlue font-medium"
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

      <div className="py-2 px-2 md:px-6 border border-gray-200 rounded-3xl flex items-center justify-between gap-2">
        <div className="w-16 md:w-36">
          <img src="/icons/dancer.svg" alt="dancer" className="" />
        </div>

        <div className="flex-1">
          <h2 className="font-bold  sm:text-2xl md:text-2xl">
            Never miss a Medication or Meal{" "}
          </h2>
          <p className="text-xs lg:text-lg text-grey capitalize">
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
        <div className="flex items-center justify-between gap-3 mb-8">
          <h2 className="font-bold text-xl">Articles for you</h2>
          <button className="text-primaryBlue font-medium">See more</button>
        </div>

        <Slider {...settings} className="w-full">
          <article className="group cursor-pointer grid place-items-center">
            <div className="border border-gray-200 m-2 p-2">
              <img
                src="/images/image_1.png"
                alt="hello image"
                className="w-full group-hover:opacity-75 transition-all duration-300"
              />
              <div className="w-full">
                <h3 className="font-bold text-xl mt-3">Gastric Ulcer 101</h3>
                <p className="text-grey capitalize">By Bethel Ohanugo</p>
              </div>
            </div>
          </article>

          <article className="group cursor-pointer grid place-items-center">
            <div className="border border-gray-200 m-2 p-2">
              <img
                src="/images/image_2.png"
                alt="hospital"
                className="w-full group-hover:opacity-75 transition-all duration-300"
              />

              <div className="w-full">
                <h3 className="font-bold text-xl mt-3">
                  How Gastric Ulcer is Diagnosed
                </h3>
                <p className="text-grey capitalize">By Bethel Ohanugo</p>
              </div>
            </div>
          </article>

          <article className="group cursor-pointer grid place-items-center">
            <div className="border border-gray-200 m-2 p-2">
              <img
                src="/images/image_3.png"
                alt="frown"
                className="w-full group-hover:opacity-75 transition-all duration-300"
              />

              <div className="w-full">
                <h3 className="font-bold text-xl mt-3">
                  Lifestyle Modification
                </h3>
                <p className="text-grey capitalize">By Bethel Ohanugo</p>
              </div>
            </div>
          </article>

          <article className="group cursor-pointer grid place-items-center">
            <div className="border border-gray-200 m-2 p-2">
              <img
                src="/images/image_1.png"
                alt="hello image"
                className="w-full group-hover:opacity-75 transition-all duration-300"
              />
              <div className="w-full">
                <h3 className="font-bold text-xl mt-3">Gastric Ulcer 101</h3>
                <p className="text-grey capitalize">By Bethel Ohanugo</p>
              </div>
            </div>
          </article>

          <article className="group cursor-pointer grid place-items-center">
            <div className="border border-gray-200 m-2 p-2">
              <img
                src="/images/image_2.png"
                alt="hospital"
                className="w-full group-hover:opacity-75 transition-all duration-300"
              />

              <div className="w-full">
                <h3 className="font-bold text-xl mt-3">
                  How Gastric Ulcer is Diagnosed
                </h3>
                <p className="text-grey capitalize">By Bethel Ohanugo</p>
              </div>
            </div>
          </article>

          <article className="group cursor-pointer grid place-items-center">
            <div className="border border-gray-200 m-2 p-2">
              <img
                src="/images/image_3.png"
                alt="frown"
                className="w-full group-hover:opacity-75 transition-all duration-300"
              />

              <div className="w-full">
                <h3 className="font-bold text-xl mt-3">
                  Lifestyle Modification
                </h3>
                <p className="text-grey capitalize">By Bethel Ohanugo</p>
              </div>
            </div>
          </article>
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
