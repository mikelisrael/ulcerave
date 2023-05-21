import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { getTitle } from "../../../utils/helperFunctions";

const Articles = () => {
  getTitle("articles");
  const [inputText, setInputText] = useState("");

  return (
    <div
      className="universal_x pb-24 pt-28 md:pb-24 md:pt-40"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <center className="text-grey lg:text-lg">
        <div className="max-w-lg">
          Get credible information and resources about Gastric ulcer
          <div className="relative mt-7">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchOutlinedIcon fontSize="large" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-gray-300 p-3 pl-12 text-sm focus:outline-none"
              placeholder="Search"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="button"
              className={`absolute bottom-2.5 right-5 ${
                inputText.length > 0 ? "block" : "hidden"
              }`}
              onClick={() => setInputText("")}
            >
              <ClearOutlinedIcon fontSize="small" />
            </button>
          </div>
        </div>
      </center>

      <section>
        <ul className="mt-10 border-b border-gray-300 pb-3 ">
          <li className="text-primaryBlue">Articles for you</li>
        </ul>

        <ul>
          <li></li>
        </ul>
      </section>
    </div>
  );
};

export default Articles;
