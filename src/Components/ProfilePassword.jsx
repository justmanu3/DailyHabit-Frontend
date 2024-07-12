import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../api";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";

const ProfilePassword = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [passwordUpdated, setPasswordUpdated] = useState(false);

  ///////////-----------
  const [formData, setFormData] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = formData.newPassword;
    const uid = user.uid;
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match");
      console.log("newpass...", newPassword);
      console.log("uid......", uid);
      return;
    }

    try {
      const response = await updateUserPassword(uid, newPassword);
      setPasswordUpdated(true);
      // alert("Password updated successfully");
      dispatch(alertSuccess("Password updated Succesfully"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    } catch (error) {
      console.error("Error while updating password", error);
      alert("Failed to update password");
    }
  };

  if (passwordUpdated) {
    setFormData({
      previousPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordUpdated(false);
  }

  return (
    <div className="flex items-center justify-center pt-6 px-24 w-full">
      {" "}
      <div className="grid pt-20 place-items-center ">
        <div className="max-w-lg  p-12 bg-white rounded-2xl">
          <h1 className="text-xl text-red-500 font-semibold">
            Hello there ?,{" "}
            <span className="font-normal text-black">
              Want to Change your Password?
            </span>
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <label
              htmlFor="previous-password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Previous Password
            </label>
            <input
              id="previous-password"
              type="password"
              name="previousPassword"
              placeholder="Previous Password"
              autoComplete="current-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              value={formData.previousPassword}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              name="newPassword"
              placeholder="********"
              autoComplete="new-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              value={formData.newPassword}
              onChange={handleChange}
            />
            <label
              htmlFor="password-confirm"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Confirm Password
            </label>
            <input
              id="password-confirm"
              type="password"
              name="confirmPassword"
              placeholder="********"
              autoComplete="new-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-red-400 shadow-lg focus:outline-none hover:bg-red-500 hover:shadow-none"
            >
              Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePassword;
