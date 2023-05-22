import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { getTitle } from "../../../utils/helperFunctions";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Link, useOutlet } from "react-router-dom";

const Articles = () => {
  getTitle("articles");
  const [inputText, setInputText] = useState("");
  const outlet = useOutlet();

  return (
    <>
      {outlet || (
        <div
          className="universal_x pb-24 pt-12 md:pb-24 md:pt-40"
          data-aos="fade-in"
          data-aos-duration="300"
        >
          <center className="text-grey lg:text-lg">
            <div className="max-w-lg">
              Get credible information and resources about Gastric ulcer
              <div className="relative mt-7">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchOutlinedIcon
                    fontSize="large"
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-full border border-gray-300 p-3 pl-12 text-base focus:outline-none"
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
            </div>
          </center>

          <section>
            <ul className="mt-10 border-b border-gray-300 pb-3">
              <li className="font-medium text-primaryBlue">Articles for you</li>
            </ul>

            <ul>
              <li className="flex gap-5 border-b border-gray-300 py-12">
                <Link to="gastric-ulcer-101">
                  <img
                    src="/images/image_1.png"
                    alt="hello image"
                    className="h-64 w-64 rounded-2xl object-cover transition-all duration-300 hover:opacity-80 focus:opacity-80"
                  />
                </Link>

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
                    the intestinal wall in the stomach. It often appears as
                    sores...
                  </p>

                  <section className="mt-16 flex max-w-2xl items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AccessTimeIcon fontSize="small" />
                      <span>16 mins read</span>
                    </div>

                    <div className="space-x-3">
                      <button>
                        <StarIcon className="text-goldColor" fontSize="small" />
                      </button>
                      <button className="text-grey">
                        <ShareOutlinedIcon fontSize="small" />
                      </button>
                    </div>
                  </section>
                </div>
              </li>

              <li className="flex gap-5 border-b border-gray-300 py-12">
                <Link to="how-gastric-ulcer-is-diagnosed">
                  <img
                    src="/images/image_2.png"
                    alt="hospital"
                    className="h-64 w-64 rounded-2xl object-cover transition-all duration-300 hover:opacity-80 focus:opacity-80"
                  />
                </Link>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">
                    How Gastric Ulcer is Diagnosed
                  </h3>
                  <section className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-1">
                      <CircleIcon className="text-gray-300" />
                      <h4 className="text-lg">By Bethel Ohanugo</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-300">●</span>
                      <h4 className="text-grey">29th Apr, 2023</h4>
                    </div>
                  </section>

                  <p className="mt-5 max-w-2xl text-grey lg:text-lg">
                    If your doctor suspects that you have gastric ulcer, tests
                    would be carried out to determine whether the Helicobacter
                    pylori specie exists in abnormal quantities in your stomach.
                  </p>

                  <section className="mt-16 flex max-w-2xl items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AccessTimeIcon fontSize="small" />
                      <span>16 mins read</span>
                    </div>

                    <div className="space-x-3">
                      <button>
                        <StarBorderOutlinedIcon
                          className="text-grey"
                          fontSize="small"
                        />
                      </button>
                      <button className="text-grey">
                        <ShareOutlinedIcon fontSize="small" />
                      </button>
                    </div>
                  </section>
                </div>
              </li>

              <li className="flex gap-5  py-12">
                <Link to="life-modifications">
                  <img
                    src="/images/image_3.png"
                    alt="frown"
                    className="h-64 w-64 rounded-2xl object-cover transition-all duration-300 hover:opacity-80 focus:opacity-80"
                  />
                </Link>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">
                    Lifestyle Modifications
                  </h3>
                  <section className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-1">
                      <CircleIcon className="text-gray-300" />
                      <h4 className="text-lg">By Bethel Ohanugo</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-300">●</span>
                      <h4 className="text-grey">29th Apr, 2023</h4>
                    </div>
                  </section>

                  <p className="mt-5 max-w-2xl text-grey lg:text-lg">
                    Once it is confirmed that you have a gastric ulcer
                    diagnosis, certain lifestyle modifications form a key
                    component of your treatment strategy...
                  </p>

                  <section className="mt-16 flex max-w-2xl items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AccessTimeIcon fontSize="small" />
                      <span>16 mins read</span>
                    </div>

                    <div className="space-x-3">
                      <button>
                        <StarIcon className="text-goldColor" fontSize="small" />
                      </button>
                      <button className="text-grey">
                        <ShareOutlinedIcon fontSize="small" />
                      </button>
                    </div>
                  </section>
                </div>
              </li>
            </ul>
          </section>
        </div>
      )}
    </>
  );
};

export default Articles;
