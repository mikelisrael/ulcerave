/**
 * The SingleTracker function is a React component that displays a summary of a pain tracker and allows
 * the user to view more details in a modal.
 * @returns The SingleTracker component is being returned.
 */
import React, { useState } from "react";
import moment from "moment";
import { Modal } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const SingleReminder = ({ reminder }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {" "}
      <div className="flex items-center gap-2 rounded-lg border-2 px-4 py-2 focus-within:border-primaryBlue focus-within:bg-lightBlue md:py-4">
        <div className="flex-grow space-y-1">
          <h3 className="font-medium capitalize text-black md:text-lg">
            {reminder?.category}
          </h3>
          <span className="block text-sm font-medium text-grey">
            {moment(reminder?.date).format("hh:mm A")}
          </span>
          <p className="text-sm">
            {reminder?.description?.length > 50
              ? reminder?.description?.slice(0, 50) + "..."
              : reminder?.description}
          </p>
        </div>

        <button
          className="flex-shrink-0 whitespace-nowrap text-xs font-medium text-primaryBlue"
          onClick={() => setOpen(true)}
        >
          See Details
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* style modal with tailwind */}
        <div className="flex h-full w-full items-center justify-center bg-black/5">
          <div
            className="relative w-11/12 rounded-xl bg-white p-4 shadow-md md:w-1/2 md:p-6 lg:w-1/3 lg:p-8"
            data-aos="zoom-out"
            data-aos-duration="300"
          >
            <button
              className="absolute right-5 top-5"
              onClick={() => setOpen(false)}
            >
              <CloseOutlinedIcon fontSize="small" />
            </button>
            <h3 className="mb-5 text-center text-grey md:text-lg">
              {moment(reminder?.createdAt).format("Do, MMM YYYY")}
            </h3>
            <section className="flex items-center">
              <div className="flex-grow">
                <h3 className="font-medium capitalize text-black md:text-lg">
                  {reminder?.category}
                </h3>

                <div>
                  <h2 className="mt-1 text-lg font-medium text-black md:text-2xl">
                    {moment(reminder?.date).format("hh:mm A")}
                  </h2>

                  {reminder?.snooze > 0 && (
                    <small className="text-xs text-grey">
                      Snooze: {reminder?.snooze}{" "}
                      {reminder?.snooze > 1 ? "minutes" : "minute"}
                    </small>
                  )}
                </div>
              </div>

              <span className="w-[40%] text-right text-xs text-grey md:text-sm lg:w-[35%]">
                {repeatParser(reminder?.repeat)}
              </span>
            </section>

            <p className="mt-1">{reminder?.description}</p>

            <center>
              <button
                className="main_btn themed mt-8 w-full disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
                disabled={true}
              >
                Edit
              </button>
            </center>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SingleReminder;

export function repeatParser(repeat) {
  if (!repeat || repeat.length === 0) {
    return "";
  }

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const sortedRepeat = [...repeat].sort();

  let parsedDays = [];
  let startDay = sortedRepeat[0];
  let endDay = sortedRepeat[0];

  for (let i = 1; i < sortedRepeat.length; i++) {
    if (sortedRepeat[i] === sortedRepeat[i - 1] + 1) {
      endDay = sortedRepeat[i];
    } else {
      if (startDay === endDay) {
        parsedDays.push(weekdays[startDay]);
      } else if (endDay - startDay === 1) {
        parsedDays.push(weekdays[startDay]);
        parsedDays.push(weekdays[endDay]);
      } else {
        parsedDays.push(`${weekdays[startDay]} - ${weekdays[endDay]}`);
      }
      startDay = sortedRepeat[i];
      endDay = sortedRepeat[i];
    }
  }

  if (startDay === endDay) {
    parsedDays.push(weekdays[startDay]);
  } else if (endDay - startDay === 1) {
    parsedDays.push(weekdays[startDay]);
    parsedDays.push(weekdays[endDay]);
  } else {
    parsedDays.push(`${weekdays[startDay]} - ${weekdays[endDay]}`);
  }

  return parsedDays.join(", ");
}
