import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";

const Tracker = () => {
  getTitle("tracker");

  return (
    <main
      className="universal_x pb-24 pt-12 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <center className="text-grey lg:text-lg">
        <p className="mb-6 max-w-md">Log in your Gastric Ulcer symptoms</p>

        <button className="main_btn themed flex items-center gap-1">
          <span>Add a new entry</span> <AddIcon />
        </button>

        <div className="mt-28 max-w-md">
          <img
            src="/icons/running.svg"
            className="w-3/5 select-none md:w-auto"
            alt=""
          />

          <h2 className="mt-5 text-lg font-medium md:text-2xl">
            There is no data to display yet
          </h2>
          <p>Start documenting your progress today!</p>
        </div>
      </center>
    </main>
  );
};

export default Tracker;
