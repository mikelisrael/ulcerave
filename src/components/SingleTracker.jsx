import React from "react";
import moment from "moment";

const SingleTracker = ({ tracker }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border-2 px-4 py-2 focus-within:border-primaryBlue focus-within:bg-lightBlue md:py-4">
      <div className="flex-grow space-y-1">
        <h3 className="font-medium capitalize text-black md:text-lg">
          {tracker?.title}
        </h3>
        <div className="text-sm font-medium text-grey">
          <span className="capitalize">{tracker?.painLevel} </span>
          pain
        </div>
      </div>

      <button className="flex-shrink-0 whitespace-nowrap text-xs font-medium text-primaryBlue">
        See Details
      </button>
    </div>
  );
};

export default SingleTracker;
