/* This is a React component called `Reminder` that displays a list of reminders fetched from a
Firebase database. It uses various React hooks such as `useState`, `useEffect`, and
`useGlobalContext` to manage state and fetch data. It also uses external libraries such as `moment`
for date formatting and `react-toastify` for displaying error messages. The component renders a
button to add new reminders and groups the fetched reminders by date, displaying them in separate
sections. It also includes a modal component for adding new reminders. */
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";
import AppModalLayout from "../components/AppModalLayout";
import AddNewReminder from "../components/AddNewReminder";
import SingleReminder from "../components/SingleReminder";
import moment from "moment";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Reminder = () => {
  getTitle("reminder");
  const { user } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        // Create a query to get the user's reminders based on the UID
        const remindersQuery = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );

        // Fetch the reminders documents
        const querySnapshot = await getDocs(remindersQuery);

        // Extract the reminders data from the documents
        const remindersData = querySnapshot.docs.map((doc) => {
          return doc.data()?.reminder || [];
        });

        const getFutureReminders = (reminders) => {
          const currentDateTime = moment();

          const futureReminders = reminders.filter((reminder) => {
            const reminderDateTime = moment(reminder.date);
            const isSameDate = reminderDateTime.isSameOrAfter(
              currentDateTime,
              "day"
            );
            const isSameTime = reminderDateTime.isSameOrAfter(
              currentDateTime,
              "minute"
            );

            return isSameDate && isSameTime;
          });

          return futureReminders;
        };

        const futureReminders = getFutureReminders(remindersData.flat());
        setReminders(futureReminders);
      } catch (error) {
        toast.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, [user.uid, refetchCount]);

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
                  key={uuidv4()}
                  className="mt-7 max-w-lg space-y-2 text-left md:mt-14 md:space-y-4"
                >
                  <h3>{date}</h3>
                  {remindersForDate.map((reminder) => (
                    <SingleReminder key={uuidv4()} reminder={reminder} />
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
        <AddNewReminder setOpen={setOpen} setRefetchCount={setRefetchCount} />
      </AppModalLayout>
    </main>
  );
};

export default Reminder;
