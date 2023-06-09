import React from 'react'
import moment from "moment";

const SingleReminder = ({reminder}) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border-2 px-4 py-2 focus-within:bg-lightBlue md:py-4 focus-within:border-primaryBlue">
      <div className="flex-grow space-y-1">
        <h3 className="font-medium capitalize text-black md:text-lg">
          {reminder?.category}
        </h3>
        <span className="block text-sm font-medium text-grey">
          {moment(reminder?.date).format("hh:mm A")}
        </span>
        <p className="text-sm">
          {reminder?.description?.length > 50
            ? reminder?.description?.slice(0, 50) + "..."
            : reminder?.description}
        </p>
      </div>

      <button className="flex-shrink-0 whitespace-nowrap text-xs font-medium text-primaryBlue">
        See Details
      </button>
    </div>
  );
}

export default SingleReminder
