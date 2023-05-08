import React from "react";
import "./css/home.css";
import { useNavigate } from "react-router-dom";
import Ellipse from "../assets/ellipse_1.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute w-full top-0 left-1/2 -translate-x-1/2 -z-10 select-none">
        <img src={Ellipse} alt="" />
      </div>

      <header
        className="universal_x py-32 flex items-center justify-center flex-col"
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-bold text-center">
          Manage your{" "}
          <span className="text-[var(--orange)]">Gastric Ulcer</span>
          <br /> with ease
        </h1>

        <p className="mt-5 text-xl text-[var(--grey)] text-center">
          Never miss a dose or meal with our reminders. Ulcerave also provides
          reliable symptom
          <br className="hidden lg:block" /> checker and resources
        </p>

        <button
          className="main_btn themed text-lg mt-10"
          onClick={() => navigate("login")}
        >
          Get Started for Free
        </button>
      </header>

      <section className="universal_x intro" data-aos="fade-up">
        <div className="grid bg-[var(--lighter)] py-12 px-8 items-center justify-center gap-20 rounded-3xl">
          <div className="relative">
            <img src="/images/image_4.png" alt="reminder" />

            {/* quote  */}
            <blockquote
              className="bg-[var(--lighter)] absolute w-3/4 px-5 py-3 shadow-lg top-[35%] -right-[2%] rounded-3xl"
              data-aos="fade-right"
            >
              <img src="/avatars/avatar_1.svg" className="w-14" alt="avatar" />
              <div className="flex gap-2 mt-2 items-start">
                <p>
                  You'll never get used to the pain. It is time to take your
                  medication
                </p>
                <img src="/icons/clock.svg" className="w-8" alt="" />
              </div>
            </blockquote>
          </div>

          <div>
            <h2 className="font-bold text-4xl">Never Miss a Dose or Meal</h2>
            <p className="mt-5">
              Taking meals and medications on time is important for managing
              gastric ulcer symptoms and promoting healing. Ulcerave includes a
              convenient feature that send reminders to you to help you stay on
              top of your meal and medication schedule. You can customize the
              reminder to suit your needs and schedule, so you never miss a dose
              or meal.
            </p>
            <button className="main_btn themed mt-10">Get Started</button>
          </div>
        </div>
      </section>

      {/* stay informed and folders section */}
      <section className="py-28 universal_x">
        <center>
          <h2 className="font-bold text-4xl">Stay Informed and Empowered</h2>
          <p className="mt-5 text-xl text-[var(--grey)] text-center">
            Access a wealth of information on Gastric Ulcer. Our resource Centre
            helps you <br className="hidden lg:block" /> make informed Decisions
          </p>
          <button className="main_btn themed mt-10">Read More</button>

          {/* TODO: Include folders */}
        </center>
      </section>

      <section className="universal_x intro" data-aos="fade-up">
        <div className="grid bg-[var(--lighter)] py-12 px-8 items-center justify-center gap-20 rounded-3xl">
          <div className="relative">
            <img src="/images/image_6.png" alt="man with phone" />

            {/* quote  */}
            <img
              src="/images/image_5.png"
              className="absolute w-3/4 px-5 py-3 -bottom-[25%] -right-[2%] rounded-3xl"
              data-aos="fade-left"
            />
          </div>

          <div>
            <h2 className="font-bold text-4xl">Stay on top of your Symptoms</h2>
            <p className="mt-5">
              Ulcerave provides a tracker feature that helps you monitor your
              symptoms with ease. Share your progress with your healthcare
              provider. Take charge of your health today and try our intuitive
              and powerful tracker feature.
            </p>
            <button className="main_btn themed mt-10">Get Started</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
