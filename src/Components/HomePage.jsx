import React, { useState } from "react";
import { motion } from "framer-motion";
import Delivery from "../assets/icons/Delivery.png";
import imageright from "../assets/Images/joh.jpg";
import { buttonClick } from "../Animations";
import slideimg1 from "../assets/Images/slideimg1.jpeg";
import slideimg2 from "../assets/Images/slideimg2.jpg";
import slideimg3 from "../assets/Images/slideimg3.jpg";
import slideimg4 from "../assets/Images/slideimg4.jpg";

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState("slide1");

  // Array of slide ids for easy navigation
  const slides = ["slide1", "slide2", "slide3", "slide4"];

  // Handler to change the slide
  const showSlide = (slideId) => {
    setActiveSlide(slideId);
  };

  return (
    <div className="">
      <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-10 ">
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="px-4 py-1 flex items-center justify-center gap-2 bg-green-300 rounded-full">
            <p className="text-white">Free Delivery</p>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md ">
              <img src={Delivery} alt="" />
            </div>
          </div>
          <p className="text-[24px] text-lighttextGray md:text-[52px] font-sans font-extrabold tracking-wide">
            Healthy Food,Healthy You!{"  "}
            <span className="text-red-500">Fastest Delivery in your City</span>
          </p>
          <p className="text-textColor text-lg">
            Daily Habit believes in food that’s as good for the planet as it is
            for you. We work directly with farmers to help transition their land
            from conventional to organic, and to improve biodiversity. There’s
            no artificial ANYTHING up in our food – just real ingredients grown
            by real people.
          </p>
          <motion.button
            {...buttonClick}
            className="bg-red-500 hover:bg-red-300 px-4 py-2 rounded-2xl text-white text-base font-semibold"
          >
            Order Now
          </motion.button>
        </div>

        <div className="flex w-full md:justify-end">
          <img
            // className="absolute top-0 right-0 md:right-12 w-full h-420 md:w-[300px] md:h-650 rounded-full"
            className="md:max-w-lg w-full h-[530px] object-cover  rounded-[150px]"
            src={imageright}
            alt=""
          />
        </div>
      </motion.div>

      {/* carosoul */}

      <div className="carousel w h-420 pt-20 overflow-hidden relative">
        {slides.map((slideId) => (
          <div
            key={slideId}
            id={slideId}
            className={`carousel-item relative w-full h-420 ${
              activeSlide === slideId ? "" : "hidden"
            }`}
          >
            <img
              src={
                slideId === "slide1"
                  ? slideimg1
                  : slideId === "slide2"
                  ? slideimg2
                  : slideId === "slide3"
                  ? slideimg3
                  : slideimg4
              }
              className="w-full h-full object-cover"
              alt={`Slide ${slideId}`}
            />

            <div className="absolute inset-0 flex justify-between items-center px-5 ">
              <button
                className="btn btn-circle"
                onClick={() =>
                  showSlide(
                    slides[
                      (slides.indexOf(slideId) + slides.length - 1) %
                        slides.length
                    ]
                  )
                }
              >
                ❮
              </button>
              <button
                className="btn btn-circle"
                onClick={() =>
                  showSlide(
                    slides[(slides.indexOf(slideId) + 1) % slides.length]
                  )
                }
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
