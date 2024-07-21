import React from "react";
import { buttonClick } from "../Animations";
import { FaArrowLeft } from "../assets/icons/index";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const CheckOutSuccess = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home");
    window.location.reload();
  };

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <img src="" className="w-full md:w-656" alt="" />
        <h1 className="text-[50px] text-textColor font-bold">Order Placed</h1>

        <motion.div {...buttonClick}>
          <button
            onClick={handleReturnHome}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-3xl text-textColor" />
            Get back to Home
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
