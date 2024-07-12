import React from "react";
import { BsFillBellFill, MdLogout } from "../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { buttonClick } from "../Animations";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../Config/firebase.config";

const DbHeader = () => {
  //getting user from the redux
  const user = useSelector((state) => state.user);
  // const firebaseAuth = getAuth(app);


  // const signOut = () => {
  //   firebaseAuth
  //     .signOut()
  //     .then(() => {
  //       dispatch(setUserNull());
  //       navigate("/login", { replace: true });
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-textColor">
        Welcome to Daily Habit !
        {user?.name && (
          <span className="block text-base text-gray-900">{`Hello ${user?.name} ...`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        {/* <div className="flex items-center justify-center gap-3 px-4 py-2 bg-white backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-textColor text-2xl" />
          <input
            type="text"
            placeholder="Search here.."
            className=" text-textColor border-none outline-none bg-transparent w-32 text-base font-medium "
          />
          <BsToggles2 className="text-lighttextGray text-2xl" />
        </div> */}

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-primary backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-500 text-xl" />
        </motion.div>

        {/* <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-primary backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <MdLogout />
        </motion.div> */}
      </div>
    </div>
  );
};

export default DbHeader;
