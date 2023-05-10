import React from "react";
import "./css/home.css";
import { useNavigate } from "react-router-dom";
import Ellipse from "../assets/ellipse_1.png";
import GoToDashboard from "../components/GoToDashboard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute w-full top-0 left-1/2 -translate-x-1/2 -z-10 select-none">
        <img src={Ellipse} alt="" />
      </div>

      <header
        className="universal_x pt-56 pb-32 flex items-center justify-center flex-col"
        data-aos="fade-up"
      >
        <h1 className="text-3xl lg:text-5xl font-bold text-center">
          Manage your{" "}
          <span className="text-orangeColor whitespace-nowrap">
            Gastric Ulcer
          </span>
          <br /> with ease
        </h1>

        <p className="mt-5 text-base lg:text-xl text-grey text-center">
          Never miss a dose or meal with our reminders. Ulcerave also provides
          reliable symptom
          <br className="hidden xl:block" /> checker and resources
        </p>

        <button
          className="main_btn themed text-lg mt-10"
          onClick={() => navigate("login")}
        >
          Get Started for Free
        </button>
      </header>

      <section className="universal_x intro" data-aos="fade-up">
        <div className="space-y-10 md:grid bg-lightBlue py-12 px-8 items-center justify-center gap-20 rounded-3xl">
          <div className="md:order-2">
            <h2 className="font-bold text-3xl lg:text-4xl">
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
              className="bg-lightBlue absolute w-3/4 px-5 py-3 shadow-lg top-[35%] -right-[2%] rounded-3xl"
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
        </div>
      </section>

      {/* stay informed and folders section */}
      <section className="py-28 universal_x">
        <center>
          <h2 className="font-bold text-3xl lg:text-4xl">
            Stay Informed and Empowered
          </h2>
          <p className="mt-5 text-base lg:text-xl text-grey text-center">
            Access a wealth of information on Gastric Ulcer. Our resource Centre
            helps you <br className="hidden lg:block" /> make informed Decisions
          </p>
          <button className="main_btn themed mt-10">Read More</button>

          {/* TODO: Include folders */}
        </center>
      </section>

      <section className="universal_x intro" data-aos="fade-up">
        <div className="space-y-10 md:grid bg-lightBlue py-12 px-8 items-center justify-center gap-20 rounded-3xl">
          <div className="md:order-2">
            <h2 className="font-bold text-3xl lg:text-4xl">
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

            {/* quote  */}
            <img
              src="/images/image_5.png"
              className="absolute md:w-3/4 px-5 py-3 -bottom-[25%] -right-[2%] rounded-3xl"
              data-aos="fade-left"
            />
          </div>
        </div>
      </section>

      <section className="my-32 universal_x_margin border-t-lightBlue border-t-4 py-14">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base  md:text-2xl">
              Transforming gastric ulcer care
            </h2>

            <img
              src="/logo.svg"
              alt="logo"
              className="w-[50%] md:w-[80%] -mt-2 md:-mt-5"
            />
          </div>

          <button className="main_btn themed" onClick={() => navigate("login")}>
            Get Started
          </button>
        </div>

        <div className="flex flex-col gap-10 md:gap-20">
          <p
            className="mt-10 pl-5 border-l-[6px] border-l-lightBlue md:max-w-[60%] text-grey md:self-end"
            data-aos="fade-right"
          >
            Ulcerave is a comprehensive and intuitive webapp that is designed to
            help Gastric Ulcer patients manage their symptoms and improve their
            quality of life. Our Mission is to empower patients to take control
            of their health by providing personalized tools, insights and
            supportive resources that cater to their unique needs.
          </p>
          <p
            className="pl-5 border-l-[6px] border-l-lightBlue md:max-w-[60%] text-grey"
            data-aos="fade-left"
          >
            A Ulcerave, we believe tha managing Gastric ulcer should be a
            seamless and stress-free experience. That is why we are dedicated to
            providing a user-friendly interface that is easy to navigate and
            understand. Our team of experienced professionals works tirelessly
            to ensure that our app is always up-to-date and optimized for the
            best possible user experience.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
