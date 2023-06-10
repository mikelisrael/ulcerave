import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";
import AppModalLayout from "../components/AppModalLayout";
import AddNewTracker from "../components/AddNewTracker";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SingleTracker from "../components/SingleTracker";
import moment from "moment";

const Tracker = () => {
  getTitle("tracker");
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [trackers, setTrackers] = useState([
    {
      title: "Took a new medication",
      painLevel: "mild",
      createdAt: new Date(),
    },
    {
      title: "I was triggered after taking avocado",
      painLevel: "mild",
      createdAt: new Date(),
    },
    {
      title: "Fried Plantain and eggs",
      painLevel: "severe",
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)), //NOTE: the day before yesterday
    },
  ]);

  const groupTrackersByDate = () => {
    const groupedTrackers = {};

    trackers.forEach((tracker) => {
      const trackerDate = moment(tracker.createdAt).format("DD MMM, YYYY");
      const today = moment().startOf("day");

      let formattedDate;
      if (moment(tracker.createdAt).isSame(today, "day")) {
        formattedDate = "Today";
      } else {
        formattedDate = trackerDate;
      }

      if (!groupedTrackers[formattedDate]) {
        groupedTrackers[formattedDate] = [tracker];
      } else {
        groupedTrackers[formattedDate].push(tracker);
      }
    });

    return groupedTrackers;
  };

  const groupedTrackers = groupTrackersByDate();

  const sortedDates = Object.keys(groupedTrackers).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    return (
      moment(b, "DD MMM, YYYY").valueOf() - moment(a, "DD MMM, YYYY").valueOf()
    );
  });

  return (
    <main
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      {sortedDates.length > 0 ? (
        <>
          <h2 className="text-center font-medium text-black lg:text-lg">
            You have made {trackers.length}{" "}
            {trackers.length > 1 ? "entries" : "entry"}
          </h2>

          <div className="mx-auto mt-7 max-w-2xl text-grey md:mt-10 lg:text-lg">
            <section className="flex items-center gap-4">
              <button
                className="main_btn transparent flex h-12 w-12 items-center gap-1 !px-3 md:h-auto md:w-auto md:!px-5"
                onClick={() => setOpen(true)}
              >
                <span className="hidden md:block">Add entry</span>
                <AddIcon />
              </button>

              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchOutlinedIcon
                    fontSize="large"
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-full border border-gray-300 p-3 pl-12 focus:outline-none md:text-base"
                  placeholder="Search"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  type="button"
                  className={`absolute bottom-[13px] right-5 ${
                    inputText.length > 0 ? "block" : "hidden"
                  }`}
                  onClick={() => setInputText("")}
                >
                  <ClearOutlinedIcon fontSize="small" />
                </button>
              </div>
            </section>

            <section className="mt-7 text-left md:mt-14">
              {sortedDates.map((date) => {
                const trackersForDate = groupedTrackers[date];
                return (
                  <div
                    className="mt-7 space-y-2 md:mt-14 md:space-y-4"
                    key={date}
                  >
                    <h3>{date}</h3>
                    {trackersForDate.map((tracker, index) => (
                      <SingleTracker key={index} tracker={tracker} />
                    ))}
                  </div>
                );
              })}
            </section>
          </div>
        </>
      ) : (
        <center className="text-grey lg:text-lg">
          <p className="mb-6 max-w-md">Log in your Gastric Ulcer symptoms</p>

          <button
            className="main_btn themed flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            <span>Add a new entry</span> <AddIcon />
          </button>

          <div className="mt-28 max-w-md">
            <img
              src="/icons/running.svg"
              className="float w-3/5 select-none md:w-auto"
              alt=""
            />

            <h2 className="mt-5 text-lg font-medium md:text-2xl">
              There is no data to display yet
            </h2>
            <p>Start documenting your progress today!</p>
          </div>
        </center>
      )}

      <AppModalLayout open={open} setOpen={setOpen}>
        <AddNewTracker />
      </AppModalLayout>
    </main>
  );
};

export default Tracker;
