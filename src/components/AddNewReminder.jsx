import React, { useRef, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment/moment";
import "./css/checkbox.css";
import { useGlobalContext } from "../context";
import { toast } from "react-toastify";
import { db } from "../utils/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

//  function to wrap date in string
export const convertDateToString = (date) => {
  return date.toISOString();
};

/* The code below is a React component that handles the form submission for adding a reminder. It
  uses various state variables and refs to manage the selected date, category, repeat days, snooze
  value, and description. It also includes functions to handle changes in the date and time inputs,
  as well as checkbox changes for repeat days. The handleSubmit function updates the user's reminder
  list in the Firestore database and displays success or error messages using the toast library. The
  isEnabled variable is used to disable the submit button while the form is being submitted or if no
  category is selected. */
const AddNewReminder = ({ setOpen, setRefetchCount }) => {
  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);
  const dayInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMeridiem, setSelectedMeridiem] = useState(
    selectedDate.getHours() >= 12 ? "pm" : "am"
  );
  const [isRepeat, setIsRepeat] = useState(false);
  const [allDaysChecked, setAllDaysChecked] = useState(Array(7).fill(false));
  const [snoozeValue, setSnoozeValue] = useState("00");
  const descriptionRef = useRef(null);
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // check if current date is greater than selected date
    if (selectedDate < new Date()) {
      toast.error("Please select a valid date/time");
      setIsSubmitting(false);
      return;
    }

    // if there is no category selected
    if (!selectedCategory) {
      toast.error("Please select a category");
      setIsSubmitting(false);
      return;
    }

    // get repeat days array
    const repeatDays = [];
    allDaysChecked.forEach((day, index) => {
      if (day) {
        repeatDays.push(index);
      }
    });

    const reminder = {
      category: selectedCategory,
      date: convertDateToString(selectedDate),
      repeat: repeatDays,
      snooze: parseInt(snoozeValue || 0),
      description: descriptionRef?.current?.value || "",
      createdAt: convertDateToString(new Date()),
      id: uuidv4(),
    };

    // Update the user's reminder list
    const docRef = collection(db, "users");

    try {
      const snapshots = await getDocs(docRef);
      snapshots.forEach(async (item) => {
        if (item?.data()?.uid === user?.uid) {
          const docId = item.id;
          const userRef = doc(db, "users", docId);

          // Fetch the latest user document data
          const docSnapshot = await getDoc(userRef);
          const userData = docSnapshot.data();

          // Update the reminder list
          const updatedReminderList = [...(userData.reminder || []), reminder];

          // Set the updated document data with the new reminder list
          await setDoc(userRef, {
            ...userData,
            reminder: updatedReminderList,
          }).then(() => {
            toast.success("Reminder added successfully!", {
              toastId: "reminder_added",
            });
            setRefetchCount((prev) => prev + 1);
            setOpen(false);
            setIsSubmitting(false);
          });
        }
      });
    } catch (error) {
      toast.error("Error adding reminder: " + error, {
        toastId: "reminder_added",
      });
      setIsSubmitting(false);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

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

  // Function to handle checkbox changes for individual days
  const handleDayCheckboxChange = (index, checked) => {
    const updatedDaysChecked = [...allDaysChecked];
    updatedDaysChecked[index] = checked;
    setAllDaysChecked(updatedDaysChecked);
  };

  // Function to handle "Repeat" checkbox change
  const handleRepeatCheckboxChange = (checked) => {
    setIsRepeat(checked);
    if (!checked) {
      setAllDaysChecked(Array(7).fill(false));
    }
  };

  //  handle snooze input
  const handleSnooze = () => {
    // Check if the input value is empty or already has two digits
    if (snoozeValue.length === 0 || snoozeValue.length === 2) {
      return;
    }

    // Check if the input value is "0"
    if (snoozeValue === "0") {
      setSnoozeValue("00");
    } else {
      // Pad the input value with a leading zero if it has only one digit
      setSnoozeValue(snoozeValue.padStart(2, "0"));
    }
  };

  const isEnabled = !isSubmitting && selectedCategory;

  /* The code below is rendering a form component in JavaScript React. The form allows the user to
 create a new reminder by selecting a date, category, time, and snooze duration. The user can also
 choose to repeat the reminder on specific days of the week. If the category selected is
 "medication", the user can also add a note about the dosage. The form includes validation to ensure
 that all required fields are filled out before the user can submit the form. */
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <section className="mb-5 text-center">
        <h1 className="text-center text-lg font-bold md:text-2xl">
          New Reminder
        </h1>
        <h3 className="text-grey">{moment().format("Do, MMM YYYY")}</h3>
      </section>

      <section>
        <div
          className="flex select-none rounded-md border px-4 py-2"
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
          {/* BUG: select button not displaying properly on iPhone */}
          <div>
            <span className="mb-2 block text-grey">Month</span>
            <div>
              <select
                className="!h-full !rounded-none bg-gray-100 p-3 capitalize md:text-lg"
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
          </div>

          <div>
            <span className="mb-2 block text-grey">Year</span>
            {/* handle year change */}
            <input
              type="text"
              inputMode="numeric"
              className="w-16 bg-gray-100 p-3 text-center md:w-20 md:text-lg"
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
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
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
              defaultValue={
                selectedDate
                  ? selectedDate.getHours().toString().padStart(2, "0")
                  : "00"
              }
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
              defaultValue={
                selectedDate
                  ? selectedDate.getMinutes().toString().padStart(2, "0")
                  : "00"
              }
              onBlur={handleMinuteChange}
              ref={minuteInputRef}
              onKeyDown={handleKeyPress}
              maxLength={2}
            />

            {/* BUG: select button not displaying properly on iPhone */}
            <div>
              <select
                className="!h-full !rounded-none bg-gray-100 p-3 capitalize md:text-lg"
                defaultValue={selectedMeridiem} // Set default value from state
                onChange={handleMeridiemChange} // Handle meridiem change
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <span className="mb-2 block text-grey">Type in Snooze</span>

          <div className="flex gap-1 md:gap-3">
            <input
              type="text"
              inputMode="numeric"
              className="w-14 bg-gray-100 p-3 text-center md:text-lg"
              maxLength={2}
              value={snoozeValue}
              onChange={(e) => {
                setSnoozeValue(e.target.value);
                if (e.target.value >= "60") {
                  setSnoozeValue("59");
                }
              }}
              onBlur={handleSnooze}
            />

            <span className="self-center text-grey">mins</span>
          </div>
        </div>
      </section>

      <section>
        <label className="repeat_check flex select-none items-center gap-2">
          <input
            type="checkbox"
            checked={isRepeat}
            onChange={(e) => handleRepeatCheckboxChange(e.target.checked)}
            className="hidden"
          />
          <div className="checkmark flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white">
            {/* checkmark */}
            <div className={`checkmark-icon ${isRepeat ? "" : "hidden"}`}>
              <CheckCircleIcon
                fontSize="small"
                className="-translate-y-[0.12rem] text-primaryBlue"
              />
            </div>
          </div>
          <span>Repeat</span>
        </label>

        <div
          className={`repeat_days mt-5 flex items-center justify-center gap-3 sm:gap-5 md:gap-10 ${
            !isRepeat && "pointer-events-none opacity-30"
          }`}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={isRepeat && allDaysChecked[index]}
                onChange={(e) =>
                  handleDayCheckboxChange(index, e.target.checked)
                }
                className="hidden"
              />
              <div className="single_day flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-100 font-bold uppercase text-grey">
                {day}
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="!mt-7">
        {selectedCategory === "medication" && (
          <textarea
            className="w-full resize-none rounded-md bg-gray-100 px-4 py-2"
            placeholder="Write a little note about dosage"
            rows={5}
            ref={descriptionRef}
          ></textarea>
        )}
      </section>

      <center>
        <button
          className="main_btn themed mt-8 w-full disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
          disabled={!isEnabled}
        >
          Set Reminder
        </button>
      </center>
    </form>
  );
};

export default AddNewReminder;
