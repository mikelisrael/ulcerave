import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import moment from "moment/moment";

const AddNewReminder = () => {
  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);
  const dayInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMeridiem, setSelectedMeridiem] = useState(
    selectedDate.getHours() >= 12 ? "pm" : "am"
  );

  //   useEffect(() => {
  //     // check if selected date is afternoon or morning and console it
  //     if (selectedDate.getHours() >= 12) {
  //       console.log("afternoon");
  //     } else {
  //       console.log("morning");
  //     }

  //     console.log(selectedDate);
  //   }, [selectedDate]);

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

  // handle month change
  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (
      !isNaN(month) &&
      (selectedDate.getFullYear() > currentYear || month >= currentMonth)
    ) {
      const newDate = new Date(selectedDate);
      newDate.setMonth(month);
      setSelectedDate(newDate);
    } else {
      // Fallback to current month if invalid month entered or previous month selected
      event.target.value = selectedDate ? selectedDate.getMonth() : "";
    }
  };

  // handle year change
  const handleYearChange = () => {
    const year = parseInt(yearInputRef.current.value);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    if (
      !isNaN(year) &&
      year.toString().length === 4 &&
      (year > currentYear ||
        (year === currentYear && selectedDate.getMonth() >= currentMonth))
    ) {
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

  //   handle hour change
  const handleHourChange = () => {
    const hour = parseInt(hourInputRef.current.value);

    if (!isNaN(hour) && hour >= 0 && hour <= 12) {
      const newDate = new Date(selectedDate);
      const selectedMeridiem = newDate.getHours() >= 12 ? "pm" : "am";
      let updatedHour = hour;

      if (selectedMeridiem === "pm" && hour !== 12) {
        updatedHour += 12;
      } else if (selectedMeridiem === "am" && hour === 12) {
        updatedHour = 0;
      }

      newDate.setHours(updatedHour);
      setSelectedDate(newDate);
      hourInputRef.current.value = hour.toString().padStart(2, "0");
    } else {
      hourInputRef.current.value = selectedDate
        ? selectedDate.getHours().toString().padStart(2, "0")
        : "";
    }
  };

  // handle minute change
  const handleMinuteChange = () => {
    const minute = parseInt(minuteInputRef.current.value);

    if (!isNaN(minute) && minute >= 0 && minute <= 59) {
      const newDate = new Date(selectedDate);
      newDate.setMinutes(minute);
      setSelectedDate(newDate);
      minuteInputRef.current.value = minute.toString().padStart(2, "0");
    } else {
      minuteInputRef.current.value = selectedDate
        ? selectedDate.getMinutes().toString().padStart(2, "0")
        : "";
    }
  };

  // handle am and pm change
  const handleMeridiemChange = (event) => {
    const newMeridiem = event.target.value;
    const newDate = new Date(selectedDate);
    let hour = newDate.getHours();

    if (newMeridiem === "am" && hour >= 12) {
      hour -= 12;
    } else if (newMeridiem === "pm" && hour < 12) {
      hour += 12;
    }

    newDate.setHours(hour);
    setSelectedDate(newDate);
    setSelectedMeridiem(newMeridiem);
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numbers, backspace, and tab
    if (
      !/^\d+$/.test(keyValue) &&
      event.key !== "Backspace" &&
      event.key !== "Tab" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight"
    ) {
      event.preventDefault();
    }

    // Handle enter key
    if (event.key === "Enter") {
      const activeElement = document.activeElement;
      if (activeElement === dayInputRef.current) {
        handleDayChange();
      } else if (activeElement === yearInputRef.current) {
        handleYearChange();
      } else if (activeElement === hourInputRef.current) {
        handleHourChange();
      } else if (activeElement === minuteInputRef.current) {
        handleMinuteChange();
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
            </div>
            <KeyboardArrowDownOutlinedIcon fontSize="small" />
          </div>
        </section>

        {showDatePicker && (
          <section className="flex gap-3 md:gap-5">
            <div>
              <span className="mb-2 block text-grey">Day</span>
              <input
                type="text"
                inputMode="numeric"
                className="w-8 bg-gray-100 py-3 text-center md:w-12 md:text-lg"
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
              <select
                className="bg-gray-100 p-3 capitalize md:text-lg"
                onChange={handleMonthChange}
                defaultValue={selectedDate ? selectedDate.getMonth() : ""}
              >
                <option value={0}>January</option>
                <option value={1}>February</option>
                <option value={2}>March</option>
                <option value={3}>April</option>
                <option value={4}>May</option>
                <option value={5}>June</option>
                <option value={6}>July</option>
                <option value={7}>August</option>
                <option value={8}>September</option>
                <option value={9}>October</option>
                <option value={10}>November</option>
                <option value={11}>December</option>
              </select>
            </div>

            <div>
              <span className="mb-2 block text-grey">Year</span>
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

        {/* enter time  */}
        <section className="flex justify-between">
          <div>
            <span className="mb-2 block text-grey">Type in time</span>

            <div className="flex gap-1 md:gap-3">
              <input
                type="text"
                inputMode="numeric"
                className="w-8 bg-gray-100 py-3 text-center md:w-12 md:text-lg"
                defaultValue={"00"}
                onBlur={handleHourChange}
                ref={hourInputRef}
                onKeyDown={handleKeyPress}
                maxLength={2}
              />

              <span className="self-center text-3xl text-grey">:</span>

              <input
                type="text"
                inputMode="numeric"
                className="w-8 bg-gray-100 py-3 text-center md:w-12 md:text-lg"
                defaultValue={"00"}
                onBlur={handleMinuteChange}
                ref={minuteInputRef}
                onKeyDown={handleKeyPress}
                maxLength={2}
              />

              <select
                className="bg-gray-100 p-3 capitalize md:text-lg"
                defaultValue={selectedMeridiem} // Set default value from state
                onChange={handleMeridiemChange} // Handle meridiem change
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>

          <div>
            <span className="mb-2 block text-grey">Type in Snooze</span>

            <div className="flex gap-1 md:gap-3">
              <input
                type="text"
                inputMode="numeric"
                className="w-14 bg-gray-100 p-3 text-center md:text-lg"
                defaultValue="00"
                maxLength={2}
              />

              <span className="self-center text-grey">mins</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddNewReminder;
