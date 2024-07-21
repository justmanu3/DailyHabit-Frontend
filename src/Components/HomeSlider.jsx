import React from "react";
import { motion } from "framer-motion";
import Slider from "../Components/Slider";

const HomeSlider = () => {
  return (
    <motion.div className="w-full flex items-start justify-start flex-col pt-8">
      <div className="m-5 w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-textColor font-bold">
            Our Best Smoothies
          </p>
          <div className="w-40 h-1 rounded-md bg-red-400"></div>
        </div>
      </div>
      <Slider />
    </motion.div>
  );
};

export default HomeSlider;
