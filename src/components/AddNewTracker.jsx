/* The code below is a React component that renders a form for adding a new symptom tracker. It allows
the user to select symptoms, pain level, add a description, and a title for the tracker. When the
user submits the form, the component updates the user's tracker list in the Firebase database and
displays a success message using the react-toastify library. The component also uses moment.js
library to display the current date and uuidv4 library to generate a unique id for the new tracker. */
import moment from "moment";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "react-toastify";
import { db } from "../utils/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useGlobalContext } from "../context";
import { convertDateToString } from "./AddNewReminder";
import { v4 as uuidv4 } from "uuid";

const AddNewTracker = ({ setOpen, setRefetchCount }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedPainLevel, setSelectedPainLevel] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useGlobalContext();
  const ulcerSymptoms = [
    "bloating",
    "nausea",
    "vomiting",
    "heartburn",
    "indigestion",
    "abdominal pain",
  ];

  const handleSymptomChange = (e) => {
    const value = e.target.value;

    if (selectedSymptoms.includes(value)) {
      return;
    } else {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tracker = {
      symptoms: selectedSymptoms,
      painLevel: selectedPainLevel,
      description,
      title,
      createdAt: convertDateToString(new Date()),
      id: uuidv4(),
    };

    // Update the user's tracker list
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

          // Update the tracker list
          const updatedtrackerList = [...(userData.tracker || []), tracker];

          // Set the updated document data with the new tracker list
          await setDoc(userRef, {
            ...userData,
            tracker: updatedtrackerList,
          }).then(() => {
            toast.success("Tracker added successfully!", {
              toastId: "add-tracker",
            });
            setRefetchCount((prev) => prev + 1);
            setOpen(false);
            setIsSubmitting(false);
          });
        }
      });
    } catch (error) {
      toast.error("Error adding tracker: " + error, {
        toastId: "add-tracker",
      });
      setIsSubmitting(false);
    }
  };

  const isEnabled =
    selectedSymptoms.length > 0 &&
    selectedPainLevel !== "" &&
    description !== "" &&
    title !== "" &&
    !isSubmitting;

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <section className="mb-5 text-center">
        <h1 className="text-center text-lg font-bold md:text-2xl">
          New Symptom
        </h1>
        <h3 className="text-grey">{moment().format("Do, MMM YYYY")}</h3>
      </section>

      <section className="space-y-5">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-md bg-gray-100 px-4 py-3 md:text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full rounded-md border bg-transparent px-4 py-2 md:text-lg"
          value={selectedPainLevel}
          onChange={(e) => setSelectedPainLevel(e.target.value)}
        >
          <option value="" hidden disabled="disabled">
            Pain Level
          </option>
          <option value="mild">Mild</option>
          <option value="severe">Severe</option>
          <option value="worst">Worst</option>
        </select>

        <div>
          <select
            className="w-full rounded-md border bg-transparent px-4 py-2 capitalize md:text-lg"
            value={
              selectedSymptoms.length > 0
                ? selectedSymptoms[selectedSymptoms.length - 1]
                : ""
            }
            onChange={handleSymptomChange}
          >
            <option value="" disabled hidden>
              Symptoms
            </option>
            {ulcerSymptoms.map((symptom) => (
              <option
                className={`capitalize ${
                  selectedSymptoms.includes(symptom) && "text-gray-300"
                }`}
                key={symptom}
                value={symptom}
              >
                {symptom}
              </option>
            ))}
          </select>
          {selectedSymptoms.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <li
                  key={symptom}
                  className="rounded-md border px-3 py-1 text-xs capitalize text-grey md:text-sm"
                >
                  {symptom}
                  <button
                    className="ml-1"
                    onClick={() => {
                      setSelectedSymptoms(
                        selectedSymptoms.filter((item) => item !== symptom)
                      );
                    }}
                  >
                    <CloseOutlinedIcon
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="mb-2 text-grey">Description</h4>
          <textarea
            placeholder="Describe the process that led you to your experience."
            className="w-full resize-none rounded-md bg-gray-100 px-4 py-2"
            cols={30}
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </section>

      <center>
        <button
          className="main_btn themed mt-8 w-full disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
          disabled={!isEnabled}
        >
          Save
        </button>
      </center>
    </form>
  );
};

export default AddNewTracker;
