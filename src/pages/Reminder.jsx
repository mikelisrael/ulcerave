import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";
import AppModalLayout from "../components/AppModalLayout";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const Reminder = () => {
  getTitle("reminder");
  const [createNew, setCreateNew] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addNew = () => {
    setCreateNew(true);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) setCreateNew(false);
  }, [open]);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formattedDate = selectedDate
    ? moment(selectedDate).format("Do MMM, YYYY")
    : "Select a date";

  const handleDayChange = (event) => {
    const { value } = event.target;
    const day = parseInt(value);

    if (!isNaN(day) && day >= 1 && day <= 31) {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);
      setSelectedDate(newDate);
    }
  };
  return (
    <main
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      {!createNew && (
        <>
          <center className="text-grey lg:text-lg">
            <p className="mb-6 max-w-md">
              Set reminders for medical schedule, and other important task
              related to your Ulcer management
            </p>

            <button
              className="main_btn themed flex items-center gap-1"
              onClick={addNew}
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
        </>
      )}

      <AppModalLayout open={open} setOpen={setOpen}>
        <div className="space-y-5">
          <section className="mb-5 text-center">
            <h1 className="text-center text-lg font-bold md:text-2xl">
              New Reminder
            </h1>
            <h3 className="text-grey">{formattedDate}</h3>
          </section>

          <section>
            <div
              className="flex rounded-md border px-4 py-2"
              onClick={toggleDatePicker}
            >
              <div className="relative isolate flex-grow md:text-lg">
                {!selectedDate ? (
                  <span className="text-grey">Select a date</span>
                ) : (
                  <span>{moment(selectedDate).format("Do MMM, YYYY")}</span>
                )}
                {/* <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  onClickOutside={toggleDatePicker}
                  dateFormat="do MMM, yyyy"
                  className="w-full bg-transparent" // Add this CSS class
                /> */}
              </div>
              <KeyboardArrowDownOutlinedIcon fontSize="small" />
            </div>
          </section>

          <section className="flex gap-5">
            <div>
              <span className="mb-2 block text-grey">Day</span>
              <input
                type="text"
                inputMode="numeric"
                className="w-12 bg-gray-100 p-3 text-center md:text-lg"
                value={selectedDate ? selectedDate.getDate() : ""}
                onChange={handleDayChange}
              />
            </div>

            <div>
              <span className="mb-2 block text-grey">Month</span>
              <div className="bg-gray-100 p-3 md:text-lg">March</div>
            </div>

            <div>
              <span className="mb-2 block text-grey">Year</span>
              <div className="bg-gray-100 p-3 md:text-lg">2023</div>
            </div>
          </section>

          <select
            className="w-full rounded-md border bg-transparent px-4 py-2 md:text-lg"
            defaultValue=""
          >
            <option value="" hidden disabled="disabled">
              Select Category
            </option>
            <option value="medication">Medication</option>
            <option value="food">Food</option>
          </select>
        </div>
      </AppModalLayout>
    </main>
  );
};

export default Reminder;
