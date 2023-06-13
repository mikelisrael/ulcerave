/* The code defines a React component called `SingleReminder` that displays a summary of a reminder and
allows the user to view more details in a modal. The component takes a `reminder` object as a prop
and uses it to display the reminder's category, date, and description. When the user clicks on the
"See Details" button, a modal opens up displaying more information about the reminder, including its
creation date, time, and repeat schedule. The `repeatParser` function is also defined to parse the
repeat schedule and display it in a human-readable format. */
import React, { useState } from "react";
import moment from "moment";
import { Modal } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const SingleTracker = ({ tracker }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border-2 px-4 py-2 focus-within:border-primaryBlue focus-within:bg-lightBlue md:py-4">
        <div className="flex-grow space-y-1">
          <h3 className="font-medium capitalize text-black md:text-lg">
            {tracker?.title}
          </h3>
          <div className="text-sm font-medium text-grey">
            <span className="capitalize">{tracker?.painLevel} </span>
            pain
          </div>
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
              {moment(tracker?.createdAt).format("Do, MMM YYYY")}
            </h3>
            <section className="flex items-center">
              <div>
                <h2 className="mt-1 text-base font-medium text-black md:text-xl">
                  {tracker?.title}
                </h2>
                <span className="block text-sm text-grey first-letter:uppercase">
                  {tracker?.painLevel} pain
                </span>
              </div>
            </section>

            <p className="mt-1">{tracker?.description}</p>

            <div>
              {tracker?.symptoms?.length > 0 &&
                tracker?.symptoms?.map((symptom, index) => (
                  <span
                    key={index}
                    className="mr-2 mt-2 inline-block rounded-md border px-3 py-1 text-xs capitalize text-grey md:text-sm"
                  >
                    {symptom}
                  </span>
                ))}
            </div>

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

export default SingleTracker;
