/* The code below is a React component for the Home page of a web application called Ulcerave. It
includes HTML and CSS code to display the page layout and content, as well as JavaScript code to
handle user interactions and navigation using the React Router library. The component includes
several sections, such as a header with a call-to-action button, an introduction section with a
reminder feature, a resource center section, a symptom tracker section, and a footer section with
information about the web app. */
import React from "react";
import "./css/home.css";
import { useNavigate } from "react-router-dom";
import Ellipse from "../assets/ellipse_1.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="absolute left-1/2 top-0 -z-10 w-full -translate-x-1/2 select-none">
        <img src={Ellipse} alt="" />
      </div>

      <header
        className="universal_x flex flex-col items-center justify-center pb-24 pt-32 md:pb-32 md:pt-56"
        data-aos="fade-up"
      >
        <h1 className="text-center text-3xl font-bold lg:text-5xl">
          Manage your{" "}
          <span className="whitespace-nowrap text-orangeColor">
            Gastric Ulcer
          </span>
          <br /> with ease
        </h1>

        <p className="mt-5 text-center text-base text-grey lg:text-xl">
          Never miss a dose or meal with our reminders. Ulcerave also provides
          reliable symptom
          <br className="hidden xl:block" /> checker and resources
        </p>

        <button
          className="main_btn themed mt-10 text-lg"
          onClick={() => navigate("login")}
        >
          Get Started for Free
        </button>
      </header>

      <section className="universal_x intro" data-aos="fade-up">
        <div className="items-center justify-center gap-20 space-y-10 rounded-3xl bg-lightBlue px-8 py-12 md:grid">
          <div className="md:order-2">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Never Miss a Dose or Meal
            </h2>
            <p className="mt-5">
              Taking meals and medications on time is important for managing
              gastric ulcer symptoms and promoting healing. Ulcerave includes a
              convenient feature that send reminders to you to help you stay on
              top of your meal and medication schedule. You can customize the
              reminder to suit your needs and schedule, so you never miss a dose
              or meal.
            </p>
            <button
              className="main_btn themed mt-10"
              onClick={() => navigate("login")}
            >
              Get Started
            </button>
          </div>

          <div className="relative">
            <img src="/images/image_4.png" alt="reminder" />

            {/* quote  */}
            <blockquote
              className="absolute left-0 top-[35%] w-4/5 rounded-3xl bg-lightBlue px-5 py-3 shadow-lg md:-right-[2%] md:left-auto md:w-3/4"
              data-aos="fade-right"
            >
              <img src="/avatars/avatar_1.svg" className="w-14" alt="avatar" />
              <div className="mt-2 flex items-start gap-2">
                <p>
                  You'll never get used to the pain. It is time to take your
                  medication
                </p>
                <img src="/icons/clock.svg" className="w-8" alt="" />
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* stay informed and folders section */}
      <section className="universal_x py-28">
        <center>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Stay Informed and Empowered
          </h2>
          <p className="mt-5 text-center text-base text-grey lg:text-xl">
            Access a wealth of information on Gastric Ulcer. Our resource Centre
            helps you <br className="hidden lg:block" /> make informed Decisions
          </p>
          <button className="main_btn themed mt-10">Read More</button>

          {/* TODO: Include folders */}
        </center>
      </section>

      <section
        className="universal_x intro overflow-x-hidden overflow-y-hidden pb-12"
        data-aos="fade-up"
      >
        <div className="items-center justify-center gap-20 space-y-10 rounded-3xl bg-lightBlue px-8 py-12 md:grid">
          <div className="md:order-2">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Stay on top of your Symptoms
            </h2>
            <p className="mt-5">
              Ulcerave provides a tracker feature that helps you monitor your
              symptoms with ease. Share your progress with your healthcare
              provider. Take charge of your health today and try our intuitive
              and powerful tracker feature.
            </p>
            <button
              className="main_btn themed mt-10"
              onClick={() => navigate("login")}
            >
              Get Started
            </button>
          </div>

          <div className="relative">
            <img src="/images/image_6.png" alt="man with phone" />
          </div>
        </div>
      </section>

      <section className="universal_x_margin mb-12 mt-32 overflow-x-hidden border-t-4 border-t-lightBlue py-14">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold  md:text-2xl">
              Transforming gastric ulcer care
            </h2>

            <img
              src="/logo.svg"
              alt="logo"
              className="-mt-2 w-[50%] md:-mt-5 md:w-[80%]"
            />
          </div>

          <button className="main_btn themed" onClick={() => navigate("login")}>
            Get Started
          </button>
        </div>

        <div className="flex flex-col gap-10 md:gap-20">
          <p
            className="mt-10 border-l-[6px] border-l-lightBlue pl-5 text-grey md:max-w-[60%] md:self-end"
            data-aos="fade-right"
          >
            Ulcerave is a comprehensive and intuitive webapp that is designed to
            help Gastric Ulcer patients manage their symptoms and improve their
            quality of life. The goal is to empower patients to take control of
            their health by providing personalized tools, insights and
            supportive resources that cater to their unique needs.
          </p>
          <p
            className="border-l-[6px] border-l-lightBlue pl-5 text-grey md:max-w-[60%]"
            data-aos="fade-left"
          >
            With Ulcerave, managing Gastric ulcer would be seamless and
            stress-free. With a user-friendly interface that is easy to navigate
            and understand, it is optimized for the best possible user
            experience.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
