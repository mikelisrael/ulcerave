import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { getTitle } from "../../../utils/helperFunctions";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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

      <div>
        <ul className="mt-10 border-b border-gray-300 pb-3">
          <li className="text-primaryBlue">Articles for you</li>
        </ul>

        <ul>
          <li className="flex gap-5 border-b border-gray-300 py-12">
            <img
              src="/images/image_1.png"
              alt="hello image"
              className="h-64 w-64 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Gastric Ulcer 101</h3>
              <section className="mt-2 flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <CircleIcon className="text-gray-300" />
                  <h4 className="text-lg">By Bethel Ohanugo</h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-300">●</span>
                  <h4 className="text-grey">28th Apr, 2023</h4>
                </div>
              </section>

              <p className="mt-5 max-w-2xl text-grey lg:text-lg">
                Gastric ulcer is a hole or rupture in the gut or along
                the intestinal wall in the stomach. It often appears as sores...
              </p>

              <section></section>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Articles;
