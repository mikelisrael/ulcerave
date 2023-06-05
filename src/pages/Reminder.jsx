import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";
import AppModalLayout from "../components/AppModalLayout";
import AddNewReminder from "../components/AddNewReminder";

const Reminder = () => {
  getTitle("reminder");
  const [open, setOpen] = useState(false);

  return (
    <main
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <center className="text-grey lg:text-lg">
        <p className="mb-6 max-w-md">
          Set reminders for medical schedule, and other important task related
          to your Ulcer management
        </p>

        <button
          className="main_btn themed flex items-center gap-1"
          onClick={() => setOpen(true)}
        >
          <span>Set a Reminder</span> <AddIcon />
        </button>

        <div className="mt-28 max-w-md">
          <img
            src="/icons/falling.svg"
            className="float w-3/5 select-none md:w-auto"
            alt=""
          />

          <h2 className="mt-5 text-lg font-medium md:text-2xl">
            There are currently no reminders set
          </h2>
          <p>
            Start adding reminder to stay on track with your important
            appointment
          </p>
        </div>
      </center>

      <AppModalLayout open={open} setOpen={setOpen}>
        <AddNewReminder />
      </AppModalLayout>
    </main>
  );
};

export default Reminder;
