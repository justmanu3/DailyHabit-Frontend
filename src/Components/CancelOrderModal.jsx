import React from "react";

const CancelOrderModal = () => {
  return (
    <div className="w-full flex items-start justify-start ">
      <div className="fixed inset-0 flex items-center justify-center pt-6 px-24 w-full bg-black bg-opacity-50">
        <div className="grid pt-20 place-items-center">
          <div className="max-w-lg p-12 bg-white rounded-2xl relative">
            <div className="absolute top-4 right-4">
              <motion.button
                className="flex items-center justify-center w-6 h-6 text-white bg-red-500 hover:bg-red-600 rounded-xl"
                onClick={() => {
                  setCancel(false);
                }}
              >
                X
              </motion.button>
            </div>
            <h1 className="text-xl pt-7 text-red-500 font-semibold">
              Hello there,{" "}
              <span className="font-normal text-black">
                Want to Cancel Your Order?
              </span>
            </h1>

            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-red-400 shadow-lg focus:outline-none hover:bg-red-500 hover:shadow-none"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
