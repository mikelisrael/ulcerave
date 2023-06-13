/* This is a React component that renders a page about gastric ulcers. It imports several icons from
the Material UI library and a helper function from a custom utility file. The component returns a
main element with various sections containing information about gastric ulcers, including their
causes, symptoms, and treatment. */
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getTitle } from "../../../utils/helperFunctions";

const GastricUlcer = () => {
  getTitle("Gastric Ulcer 101");

  return (
    <main
      className="universal_x mx-auto max-w-6xl pb-24 pt-28 md:pb-24 md:pt-48"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <div className="mx-auto w-max max-w-md">
        <h3 className="text-center text-xl font-semibold md:text-2xl">
          Gastric Ulcer 101
        </h3>

        <section className="mt-2 flex items-center gap-5">
          <div className="flex items-center gap-1">
            <CircleIcon className="text-gray-300" />
            <h4 className="md:text-lg">By Bethel Ohanugo</h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-300">●</span>
            <h4 className="text-grey">28th Apr, 2023</h4>
          </div>
        </section>

        <section className="mt-3 flex max-w-2xl items-center justify-between">
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

      <img
        src="/images/image_1_land.png"
        alt="hello image"
        className="mt-10 h-64 w-full rounded-2xl object-cover"
      />

      <h4 className="mt-2 text-center italic text-gray-400">
        Image from unsplash.com
      </h4>

      <div className="mx-auto mt-10 md:text-lg">
        <h3 className="text-xl font-semibold">What is it?</h3>
        <p className="mb-7">
          Gastric ulcer is a hole or rupture in the gut or along the intestinal
          wall in the stomach. It often appears as sores.
        </p>

        <h3 className="text-xl font-semibold">Causes</h3>
        <p className="mb-7">
          It is caused by a bacterium specie known as Helicobacter pylori, which
          is normally present in the stomach in minimal amounts. Your stomach
          tissue may be compromised, however, when this bacterium is present in
          large amounts, causing a formation of sores and intense pain. It can
          also be triggered by certain lifestyle habits such as smoking,
          drinking alcohol.
        </p>

        <h3 className="text-xl font-semibold">Signs & Symptoms</h3>
        <p className="mb-7">
          Some symptoms you may experience if you have ulcer are bloody stools,
          bloated stomach, nausea, feeling nauseous or dizzy, intense stomach
          pain amongst others. Complications such as bleeding at the site of the
          ulcer can also occur when it is left undiagnosed for a while. Many
          medical conditions have common symptoms so a consultation with a
          doctor should be done to confirm the diagnosis.
        </p>

        <h3 className="text-xl font-semibold">Treatment</h3>
        <p>
          Treatment will depend on the severity of the ulcer. Antacids,
          antibiotics, and proton pump inhibitors such as Omeprazole can be
          taken either individually or combined as directed by a medical doctor.
        </p>
      </div>
    </main>
  );
};

export default GastricUlcer;
