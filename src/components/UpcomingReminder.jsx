/* This is a React component called `UpcomingReminder` that displays the next upcoming reminder for a
user. It uses various hooks such as `useState`, `useRef`, and `useEffect` to manage the component's
state and lifecycle. It also imports various dependencies such as `moment` and `react-toastify` for
date/time formatting and displaying error messages respectively. The component fetches the user's
reminders from Firebase Firestore and finds the next upcoming reminder based on the current date and
time. It then displays the reminder's date/time and additional details such as description, repeat,
and snooze time (if applicable). The component also allows the user to toggle the display of the
additional details by clicking on a button. */
import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useGlobalContext } from "../context";
import { toast } from "react-toastify";
import moment from "moment";
import { repeatParser } from "./SingleReminder";

const UpcomingReminder = ({}) => {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const [detailsHeight, setDetailsHeight] = useState(0);
  const { user } = useGlobalContext();
  const [upcomingReminder, setUpcomingReminder] = useState(null);

  useEffect(() => {
    if (showDetails) {
      setDetailsHeight(detailsRef.current.scrollHeight);
    } else {
      setDetailsHeight(0);
    }
  }, [showDetails, detailsRef]);

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

        // Get the current date and time
        const currentDateTime = moment();

        // Find the next upcoming reminder
        let nextReminder = null;
        let nextReminderDateTime = null;

        remindersData.flat().forEach((reminder) => {
          const reminderDateTime = moment(reminder.date);

          // Only consider reminders with a future date and time
          if (reminderDateTime.isSameOrAfter(currentDateTime)) {
            if (
              !nextReminder ||
              reminderDateTime.isBefore(nextReminderDateTime)
            ) {
              nextReminder = reminder;
              nextReminderDateTime = reminderDateTime;
            }
          }
        });

        setUpcomingReminder(nextReminder || null);
      } catch (error) {
        toast.error("Error fetching reminders: " + error, {
          toastId: "Error fetching reminders",
        });
      }
    };
    fetchReminders();
  }, [user.uid]);

  return (
    <center className="space-y-1 py-12 md:space-y-3 md:py-20">
      <p className="text-center text-base text-grey lg:text-lg">
        {upcomingReminder
          ? "Upcoming reminder"
          : "You have no upcoming reminders"}
      </p>

      {upcomingReminder && (
        <>
          {" "}
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {moment(upcomingReminder?.date).format("hh : mm A")}
          </h1>
          <div
            className={`details ${showDetails ? "open" : ""}`}
            ref={detailsRef}
            style={{
              height: `${detailsHeight}px`,
              transition: "height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275",
            }}
          >
            <div className="space-y-4 text-grey lg:text-lg">
              {upcomingReminder?.description && (
                <p className="max-w-md first-letter:uppercase">
                  {upcomingReminder?.description}
                </p>
              )}

              {upcomingReminder?.repeat.length > 0 && (
                <p className="max-w-md font-medium capitalize">
                  {repeatParser(upcomingReminder?.repeat)}
                </p>
              )}

              {upcomingReminder?.snooze > 0 && (
                <p className="max-w-md capitalize">
                  Snooze: {upcomingReminder?.snooze}{" "}
                  {upcomingReminder?.snooze === 1 ? "minute" : "minutes"}
                </p>
              )}
            </div>
          </div>
          {
            // if there is snooze or repeat or description
            (upcomingReminder?.snooze > 0 ||
              upcomingReminder?.repeat?.length > 0 ||
              upcomingReminder?.description?.length > 0) && (
              <button
                className="font-medium text-primaryBlue"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    <span>Collapse</span>
                    <KeyboardArrowUpIcon />
                  </>
                ) : (
                  <>
                    <span>See Details</span>
                    <KeyboardArrowDownIcon />
                  </>
                )}
              </button>
            )
          }
        </>
      )}
    </center>
  );
};

export default UpcomingReminder;
