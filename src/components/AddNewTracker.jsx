import moment from "moment";
import React from "react";

const AddNewTracker = () => {
  return (
    <div className="space-y-5">
      <section className="mb-5 text-center">
        <h1 className="text-center text-lg font-bold md:text-2xl">
          New Symptom
        </h1>
        <h3 className="text-grey">{moment().format("Do, MMM YYYY")}</h3>
      </section>
    </div>
  );
};

export default AddNewTracker;
