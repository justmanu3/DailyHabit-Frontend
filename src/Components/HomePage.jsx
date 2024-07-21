import React, { useState } from "react";
import { motion } from "framer-motion";
import Delivery from "../assets/icons/Delivery.png";
import imageright from "../assets/Images/joh.jpg";
import { buttonClick } from "../Animations";
import slideimg2 from "../assets/Images/slideimg2.jpg";
import slideimg3 from "../assets/Images/slideimg3.jpg";
import slideimg4 from "../assets/Images/slideimg4.jpg";

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState("slide1");

  // Array of slide ids for easy navigation
  const slides = ["slide1", "slide2", "slide3"];

  // Handler to change the slide
  const showSlide = (slideId) => {
    setActiveSlide(slideId);
  };

  return (
    <div className="w-full pt-6">
      <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="px-4 py-1 flex items-center justify-center gap-2 bg-green-300 rounded-full">
            <p className="text-white">Free Delivery</p>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
              <img src={Delivery} alt="Delivery Icon" />
            </div>
          </div>
          <p className="text-[24px] text-lighttextGray md:text-[36px] lg:text-[52px] font-sans font-extrabold tracking-wide">
            Healthy Food, Healthy You!{" "}
            <span className="text-red-500">Fastest Delivery in your City</span>
          </p>
          <p className="text-textColor text-base md:text-lg">
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

        <div className="flex w-full justify-center md:justify-end mt-6 md:mt-0">
          <img
            className="w-full h-[300px] sm:h-[400px] md:h-[530px] object-cover rounded-lg md:rounded-[150px]"
            src={imageright}
            alt="Healthy Food"
          />
        </div>
      </motion.div>

      {/* Carousel */}
      <div className="carousel w-full h-[200px] sm:h-[300px] md:h-[350px] pt-20 overflow-hidden relative">
        {slides.map((slideId) => (
          <div
            key={slideId}
            id={slideId}
            className={`carousel-item relative w-full h-full ${
              activeSlide === slideId ? "" : "hidden"
            }`}
          >
            <img
              src={
                slideId === "slide1"
                  ? slideimg2
                  : slideId === "slide2"
                  ? slideimg3
                  : slideimg4
              }
              className="w-full h-full object-cover"
              alt={`Slide ${slideId}`}
            />

            <div className="absolute inset-0 flex justify-between items-center px-2 sm:px-5">
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
