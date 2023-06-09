import moment from "moment";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AddNewTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
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

  return (
    <div className="space-y-5">
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
        />

        <select
          className="w-full rounded-md border bg-transparent px-4 py-2 md:text-lg"
          defaultValue=""
        >
          <option value="" hidden disabled="disabled">
            Pain Level
          </option>
          <option value="medication">Medication</option>
          <option value="food">Food</option>
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
                  className="rounded-md border px-3 py-1 text-sm capitalize text-grey"
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
            placeholder="Description"
            className="w-full resize-none rounded-md bg-gray-100 px-4 py-3 md:text-lg"
            cols={30}
            rows={5}
          ></textarea>
        </div>
      </section>

      <center>
        <button
          className="main_btn themed mt-8 w-full disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:!bg-gray-300 focus:disabled:!bg-gray-300"
          disabled={true}
        >
          Save
        </button>
      </center>
    </div>
  );
};

export default AddNewTracker;
