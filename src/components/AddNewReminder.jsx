import React, { useRef, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const AddNewReminder = () => {
  const dayInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formattedDate = selectedDate
    ? moment(selectedDate).format("Do MMM, YYYY")
    : "Select a date";

  // handle day change
  const handleDayChange = () => {
    const day = parseInt(dayInputRef.current.value);

    if (!isNaN(day) && day >= 1 && day <= 31) {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);

      // Compare with current date
      const currentDate = new Date();

      if (newDate < currentDate) {
        // Check if the entered day is less than the current day
        if (day < currentDate.getDate()) {
          newDate.setDate(currentDate.getDate()); // Set day to current day
          dayInputRef.current.value = selectedDate
            ? selectedDate.getDate()
            : "";
        }
      }

      // Check if the resulting date is valid
      if (isValidDate(newDate)) {
        setSelectedDate(newDate);
      } else {
        // Fallback to current day if the resulting date is invalid
        dayInputRef.current.value = selectedDate ? selectedDate.getDate() : "";
      }
    } else {
      // Fallback to current day if invalid day entered
      dayInputRef.current.value = selectedDate ? selectedDate.getDate() : "";
    }
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // handle year change
  const handleYearChange = () => {
    const year = parseInt(yearInputRef.current.value);
    const currentYear = new Date().getFullYear();

    if (!isNaN(year) && year.toString().length === 4 && year >= currentYear) {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(year);
      setSelectedDate(newDate);
    } else {
      // Fallback to current year if invalid year entered or previous year selected
      yearInputRef.current.value = selectedDate
        ? selectedDate.getFullYear()
        : "";
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numbers, backspace, and tab
    if (
      !/^\d+$/.test(keyValue) &&
      event.key !== "Backspace" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }

    // Handle enter key
    if (event.key === "Enter") {
      const activeElement = document.activeElement;
      if (activeElement === dayInputRef.current) {
        handleDayChange();
      } else {
        handleYearChange();
      }
    }
  };

  return (
    <>
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

        {showDatePicker && (
          <section className="flex gap-5">
            <div>
              <span className="mb-2 block text-grey">Day</span>
              <input
                type="text"
                inputMode="numeric"
                className="w-12 bg-gray-100 p-3 text-center md:text-lg"
                defaultValue={selectedDate ? selectedDate.getDate() : ""}
                onBlur={handleDayChange}
                ref={dayInputRef}
                onKeyDown={handleKeyPress}
                maxLength={2}
              />
            </div>

            {/* set month */}
            <div>
              <span className="mb-2 block text-grey">Month</span>
              <div className="bg-gray-100 p-3 capitalize md:text-lg">
                October
              </div>
            </div>

            <div>
              <span className="mb-2 block text-grey">Year</span>
              {/* <div className="bg-gray-100 p-3 md:text-lg">2023</div> */}
              {/* handle year change */}
              <input
                type="text"
                inputMode="numeric"
                className="w-20 bg-gray-100 p-3 text-center md:text-lg"
                defaultValue={selectedDate ? selectedDate.getFullYear() : ""}
                onBlur={handleYearChange}
                onKeyDown={handleKeyPress}
                ref={yearInputRef}
                maxLength={4}
              />
            </div>
          </section>
        )}

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
    </>
  );
};

export default AddNewReminder;
