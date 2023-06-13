/**
 * The DiagnoseUlcer function returns a React component that displays information on how gastric ulcers
 * are diagnosed, including various tests and procedures.
 * @returns A React component called DiagnoseUlcer.
 */
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getTitle } from "../../../utils/helperFunctions";

const DiagnoseUlcer = () => {
  getTitle("How Gastric Ulcer is Diagnosed");

  return (
    <main
      className="universal_x mx-auto max-w-6xl pb-24 pt-28 md:pb-24 md:pt-48"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <div className="mx-auto w-max max-w-md">
        <h3 className="text-center text-xl font-semibold md:text-2xl">
          How Gastric Ulcer <br className="block md:hidden" /> is Diagnosed
        </h3>

        <section className="mt-2 flex items-center gap-5">
          <div className="flex items-center gap-1">
            <CircleIcon className="text-gray-300" />
            <h4 className="md:text-lg">By Bethel Ohanugo</h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-300">●</span>
            <h4 className="text-grey">29th Apr, 2023</h4>
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
        src="/images/image_2_land.png"
        alt="hospital"
        className="mt-10 h-64 w-full rounded-2xl object-cover"
      />

      <h4 className="mt-2 text-center italic text-gray-400">
        Image from unsplash.com
      </h4>

      <div className="mx-auto mt-10 md:text-lg">
        <p className="mb-7">
          If your doctor suspects that you have gastric ulcer, tests would be
          carried out to determine whether the Helicobacter pylori specie exists
          in abnormal quantities in your stomach. <br />
          <br />
          Some of these tests include;
        </p>

        <ul className="mb-7 ml-10 list-disc space-y-4">
          <li>
            <span className="font-semibold">The urea breath test:</span> This
            involves drinking urea (a substance that H. pylori decomposes into
            ammonia and carbon dioxide) and checking your breath afterward. The
            CO2 released is measured to check for presence of an H. Pylori
            infection.
          </li>
          <li>
            <span className="font-semibold">The stool antigen test:</span> This
            involves testing a tiny stool sample for the bacterium.
          </li>{" "}
          <li>
            <span className="font-semibold">The blood test:</span> This involves
            testing your blood for antibodies specific to the bacterium.
            Antibodies are often released naturally in large quantities to help
            combat infections and this would indicate an infection.
          </li>
        </ul>

        <p>
          A much more reliable test is{" "}
          <span className="font-semibold">Gastroscopy</span> which involves
          passing a narrow pipe called an endoscope with a camera attached to it
          through your stomach. Images gotten would verify if there is a case of
          gastric ulcer in the stomach. Some of these tests are done in
          conjunction with one another and if any of these tests turn out to be
          positive, you must start treatment right away. Consult your doctor
          before taking any medication.
        </p>
      </div>
    </main>
  );
};

export default DiagnoseUlcer;
