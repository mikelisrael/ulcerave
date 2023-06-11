import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";
import AppModalLayout from "../components/AppModalLayout";
import AddNewReminder from "../components/AddNewReminder";
import SingleReminder from "../components/SingleReminder";
import moment from "moment";

const Reminder = () => {
  getTitle("reminder");
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([
    {
      id: 1,
      category: "medication",
      description: "Take two tablets of your prescribed medication",
      date: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      category: "food",
      date: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      category: "medication",
      description:
        "Remember to take your prescribed ulcer medication. Avoid spicy and acidic foods to reduce ulcer symptoms.",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      createdAt: new Date(),
    },
    {
      id: 4,
      category: "food",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      createdAt: new Date(),
    },
    {
      id: 5,
      category: "medication",
      description: "Take the medication after meals for better absorption.",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      createdAt: new Date(),
    },
  ]);

  const groupRemindersByDate = () => {
    const groupedReminders = {};

    reminders.forEach((reminder) => {
      const reminderDate = moment(reminder.date).format("DD, MMM. YYYY");
      const today = moment().startOf("day");
      const tomorrow = moment().add(1, "day").startOf("day");

      let formattedDate;
      if (moment(reminder.date).isSame(today, "day")) {
        formattedDate = "Today";
      } else if (moment(reminder.date).isSame(tomorrow, "day")) {
        formattedDate = "Tomorrow";
      } else {
        formattedDate = reminderDate;
      }

      if (!groupedReminders[formattedDate]) {
        groupedReminders[formattedDate] = [reminder];
      } else {
        groupedReminders[formattedDate].push(reminder);
      }
    });

    return groupedReminders;
  };

  const groupedReminders = groupRemindersByDate();

  const sortedDates = Object.keys(groupedReminders).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Tomorrow") return -1;
    if (b === "Tomorrow") return 1;
    return a.localeCompare(b);
  });

  return (
    <main
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <center className="text-grey lg:text-lg">
        <p className="mb-6 max-w-md">
          Set reminders for medical schedule and other important tasks related
          to your Ulcer management
        </p>

        <button
          className="main_btn themed flex items-center gap-1"
          onClick={() => setOpen(true)}
        >
          <span>Set a Reminder</span> <AddIcon />
        </button>

        {reminders.length > 0 ? (
          sortedDates.map((date) => {
            const remindersForDate = groupedReminders[date];
            return (
              remindersForDate.length > 0 && (
                <div
                  key={date}
                  className="mt-7 max-w-lg space-y-2 text-left md:mt-14 md:space-y-4"
                >
                  <h3>{date}</h3>
                  {remindersForDate.map((reminder) => (
                    <SingleReminder key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              )
            );
          })
        ) : (
          <div className="mt-20 max-w-md md:mt-28">
            <img
              src="/icons/falling.svg"
              className="float w-3/5 select-none md:w-auto"
              alt=""
            />

            <h2 className="mt-5 text-lg font-medium md:text-2xl">
              There are currently no reminders set
            </h2>
            <p>
              Start adding reminders to stay on track with your important
              appointments.
            </p>
          </div>
        )}
      </center>

      <AppModalLayout open={open} setOpen={setOpen}>
        <AddNewReminder />
      </AppModalLayout>
    </main>
  );
};

export default Reminder;
