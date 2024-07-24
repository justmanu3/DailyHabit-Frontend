import React, { useEffect, useState } from "react";
import Avatar from "../assets/icons/Avatar.png";
import { buttonClick } from "../Animations";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../api";

const ProfileUser = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUserProfile(user.uid, username);
      alert("User profile updated successfully");
      setEditing(false);
    } catch (error) {
      alert("Error updating user profile");
    } finally {
      setIsLoading(false);
    }
  };

  return editing ? (
    <div className="flex items-center justify-center pt-6 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <div className="grid pt-12 place-items-center">
        <div className="max-w-md sm:max-w-lg p-6 sm:p-8 md:p-12 bg-white rounded-2xl relative shadow-lg">
          <div className="absolute top-4 right-4">
            <motion.button
              className="flex items-center justify-center w-6 h-6 text-white bg-red-500 hover:bg-red-600 rounded-full"
              onClick={() => {
                setEditing(false);
              }}
            >
              X
            </motion.button>
          </div>
          <h1 className="text-lg sm:text-xl pt-7 text-red-500 font-semibold">
            Hello there,{" "}
            <span className="font-normal text-black">
              Want to Edit Profile?
            </span>
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder=""
              autoComplete="email"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              value={email}
              disabled // Email is not editable
            />
            <label
              htmlFor="username"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder=""
              autoComplete="new-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              value={username}
              onChange={handleUsernameChange}
            />

            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-red-400 shadow-lg focus:outline-none hover:bg-red-500 hover:shadow-none"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center flex-col pt-6 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <div className="max-w-md sm:max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto"
          src={user?.picture ?? Avatar}
          alt="Profile picture"
        />
        <h2 className="text-lg sm:text-2xl font-semibold mt-3 text-center">
          {user?.email}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1 text-center">
          {user?.name}
        </p>
        <div className="flex items-center justify-center mt-5">
          {user?.email_verified == false ? (
            <motion.button
              {...buttonClick}
              className="w-24 py-2 text-white bg-red-400 hover:bg-red-500 rounded-xl"
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </motion.button>
          ) : null}
        </div>
        <div className="mt-5">
          <h3 className="text-lg sm:text-xl font-semibold">NOTE</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Here, you'll find a wealth of resources, tips, and products designed
            to help you make eco-friendly choices in your daily life. We are
            here to guide and inspire you every step of the way. Thank you for
            choosing to be part of this important journey. Let's make every
            action count and work towards a sustainable future, one step at a
            time. Welcome to DAILY HABIT, where every choice matters!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
