/* The above code is a React component that displays a user's gastric ulcer symptoms entries. It
fetches the user's entries from Firebase Firestore and groups them by date. It also allows the user
to add new entries and search for specific entries. The component uses various other components such
as AppModalLayout, AddNewTracker, and SingleTracker to display the entries and handle user
interactions. */
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getTitle } from "../../utils/helperFunctions";
import AppModalLayout from "../components/AppModalLayout";
import AddNewTracker from "../components/AddNewTracker";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SingleTracker from "../components/SingleTracker";
import moment from "moment";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useGlobalContext } from "../context";
import { toast } from "react-toastify";
import { db } from "../utils/firebase";

const Tracker = () => {
  getTitle("tracker");
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [refetchCount, setRefetchCount] = useState(0);
  const { user } = useGlobalContext();
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        // Create a query to get the user's trackers based on the UID
        const trackersQuery = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );

        // Fetch the trackers documents
        const querySnapshot = await getDocs(trackersQuery);

        // // Extract the trackers data from the documents
        const trackersData = querySnapshot.docs.map((doc) => {
          return doc.data()?.tracker || [];
        });

        setTrackers(trackersData.flat());
      } catch (error) {
        toast.error("Error fetching trackers:", error);
      }
    };

    fetchTrackers();
  }, [user.uid, refetchCount]);

  const groupTrackersByDate = () => {
    const groupedTrackers = {};

    trackers.forEach((tracker) => {
      const trackerDate = moment(tracker.createdAt).format("DD MMM, YYYY");
      const today = moment().startOf("day");

      let formattedDate;
      if (moment(tracker.createdAt).isSame(today, "day")) {
        formattedDate = "Today";
      } else {
        formattedDate = trackerDate;
      }

      if (!groupedTrackers[formattedDate]) {
        groupedTrackers[formattedDate] = [tracker];
      } else {
        groupedTrackers[formattedDate].push(tracker);
      }
    });

    return groupedTrackers;
  };

  const groupedTrackers = groupTrackersByDate();

  const sortedDates = Object.keys(groupedTrackers).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    return (
      moment(b, "DD MMM, YYYY").valueOf() - moment(a, "DD MMM, YYYY").valueOf()
    );
  });

  return (
    <main
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      {sortedDates.length > 0 ? (
        <>
          <h2 className="text-center font-medium text-black lg:text-lg">
            You have made {trackers.length}{" "}
            {trackers.length > 1 ? "entries" : "entry"}
          </h2>

          <div className="mx-auto mt-7 max-w-2xl text-grey md:mt-10 lg:text-lg">
            <section className="flex items-center gap-4">
              <button
                className="main_btn transparent flex h-12 w-12 items-center gap-1 !px-3 md:h-auto md:w-auto md:!px-5"
                onClick={() => setOpen(true)}
              >
                <span className="hidden md:block">Add entry</span>
                <AddIcon />
              </button>

              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchOutlinedIcon
                    fontSize="large"
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-full border border-gray-300 p-3 pl-12 focus:outline-none md:text-base"
                  placeholder="Search"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  type="button"
                  className={`absolute bottom-[13px] right-5 ${
                    inputText.length > 0 ? "block" : "hidden"
                  }`}
                  onClick={() => setInputText("")}
                >
                  <ClearOutlinedIcon fontSize="small" />
                </button>
              </div>
            </section>

            <section className="mt-7 text-left md:mt-14">
              {sortedDates.map((date) => {
                const trackersForDate = groupedTrackers[date];

                const filteredTrackersForDate = trackersForDate.filter(
                  (tracker) =>
                    tracker.title
                      .toLowerCase()
                      .includes(inputText.toLowerCase()) ||
                    tracker.painLevel.toString().includes(inputText)
                );

                if (filteredTrackersForDate.length === 0) {
                  return null;
                }

                return (
                  <div
                    className="mt-7 space-y-2 md:mt-14 md:space-y-4"
                    key={date}
                  >
                    <h3>{date}</h3>
                    {filteredTrackersForDate.map((tracker, index) => (
                      <SingleTracker key={index} tracker={tracker} />
                    ))}
                  </div>
                );
              })}
            </section>
          </div>
        </>
      ) : (
        <center className="text-grey lg:text-lg">
          <p className="mb-6 max-w-md">Log in your Gastric Ulcer symptoms</p>

          <button
            className="main_btn themed flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            <span>Add a new entry</span> <AddIcon />
          </button>

          <div className="mt-28 max-w-md">
            <img
              src="/icons/running.svg"
              className="float w-3/5 select-none md:w-auto"
              alt=""
            />

            <h2 className="mt-5 text-lg font-medium md:text-2xl">
              There is no data to display yet
            </h2>
            <p>Start documenting your progress today!</p>
          </div>
        </center>
      )}

      <AppModalLayout open={open} setOpen={setOpen}>
        <AddNewTracker setOpen={setOpen} setRefetchCount={setRefetchCount} />
      </AppModalLayout>
    </main>
  );
};

export default Tracker;
