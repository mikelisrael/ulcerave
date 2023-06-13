/* This is a React component that renders a blog post about life modifications for individuals with
gastric ulcers. It imports several icons from the Material UI library and a helper function from a
custom utility file. The component returns a JSX structure that includes the blog post title,
author, date, reading time, and social media sharing buttons. It also includes an image and a list
of tips for managing the condition. */
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getTitle } from "../../../utils/helperFunctions";

const LifeModifications = () => {
  getTitle("Life modifications");

  return (
    <main
      className="universal_x mx-auto max-w-6xl pb-24 pt-28 md:pb-24 md:pt-48"
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <div className="mx-auto w-max max-w-md">
        <h3 className="text-center text-xl font-semibold md:text-2xl">
          Life Modifications
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
        src="/images/image_3_land.png"
        alt="frown"
        className="mt-10 h-64 w-full rounded-2xl object-cover"
      />

      <h4 className="mt-2 text-center italic text-gray-400">
        Image from unsplash.com
      </h4>

      <div className="mx-auto mt-10 md:text-lg">
        <p className="mb-7">
          Once it is confirmed that you have a gastric ulcer diagnosis, certain
          lifestyle modifications form a key component of your treatment
          strategy.
        </p>

        <p className="mb-7">
          For instance, lowering body stress can aid with discomfort and
          healing. This is because individuals who are stressed may adopt
          unwholesome coping techniques, including binge drinking, smoking, or
          eating unhealthily, which may worsen gastric ulcers
        </p>

        <p className="mb-7">
          Besides stress levels, avoiding spicy, oily, and acidic meals can help
          you feel healthier. You may also discover that you have certain
          trigger foods which may irritate your bowel, produce too much acid, or
          give you heartburn. It is best to speak with your doctor to go over
          specifics since you might not have the same symptoms linked to foods
          as other people. <br />
          <br />
          Here are some additional tips to make the condition more manageable:
        </p>

        <ul className="ml-10 list-disc space-y-4">
          <li>
            Eating on a regular basis and in lesser servings can help to prevent
            overeating and lower gastrointestinal pressure.
          </li>
          <li>
            Certain drugs may aggravate the issue by irritating the stomach
            lining, hence, it is important to get a doctor's prescription before
            going on any medication regimen.
          </li>{" "}
          <li>
            Avoid wearing restrictive clothing; instead, pick stretchable
            materials and comfortable items to keep you comfortable if you
            frequently feel bloated.
          </li>
        </ul>
      </div>
    </main>
  );
};

export default LifeModifications;
