import React from "react";
import { Link } from "react-router-dom";
// import logo from '../assets/Logo/'

const Welcome = () => {
  return (
    <div>
      <div className="bg-orange-300">
        <div className="w-screen min-h-screen flex flex-col text-black lg:pt-12">
          {/* <img className='absolute w-full h-full object-cover mix-blend-overlay' src={landingPage} alt="/" /> */}

          <main className="container mx-auto px-6 pt-28 flex-1 md:text-left text-center">
            {/* <div className="flex items-center justify-items-start gap-4 w-full">
              <img src={logo} className="w-10" alt="" />
              <p className=" text-3xl">DAILY HOBBY</p>
            </div> */}

            <h1 className="text-4xl md:text-6xl lg:text-7xl md:pl-11  font-light mb-8 text-white ">
              Instant
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl  md:pl-11  font-bold mb-8 text-white ">
              APETITE
            </h1>

            <div className="flex flex-col md:flex-row justify-center mb-4"></div>

            <div className=" pt-9 opacity-75 font-bold text-gray-700 text-xl  uppercase md:px-12">
              Available in Every Corners
            </div>
            <div className=" pt-2 opacity-75 font-bold text-white text-xl md:px-12 ">
              Finger licking good Food,at your Fingertip.
            </div>
            <br />
            <br />
            <div className="text-lg  md:text-2xl lg:text-3xl py-2 px-7  md:px-10 lg:py-4 lg:px-8 lg:ml-12 md:ml-9 text-white bg-red-500 w-fit mx-auto mb-8 rounded-3xl">
              <Link to="/login"> Start Ordering</Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
