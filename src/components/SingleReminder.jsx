import React, { useState } from "react";
import moment from "moment";
import { Modal } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            quaerat eius accusantium saepe odio aperiam aliquid velit dolore
            voluptatum consectetur ipsum quae laudantium amet debitis, ipsa
            mollitia. Accusamus, totam laudantium!
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SingleReminder;
