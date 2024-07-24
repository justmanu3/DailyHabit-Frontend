import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo/mainlogo.png";
import { isActiveStyle, isNotActiveStyle } from "../assets/utils/styles";
import { useSelector } from "react-redux";

const ProfileLeft = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="h-full py-10 flex flex-col bg-gray-300 backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink
        to={"/home"}
        className="flex items-center justify-start px-6 gap-3"
      >
        <img src={logo} className="w-8" alt="" />
        <p className="font-normal text-xl">DAILY HABIT</p>
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          to={"/profile/userprofile"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          User Profile
        </NavLink>

        <NavLink
          to={"/profile/useraddress"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Address
        </NavLink>

        {user?.email_verified === false ? (
          <NavLink
            to={"/profile/userpassword"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Change Password
          </NavLink>
        ) : null}

        <NavLink
          to={"/profile/userwallet"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Wallet
        </NavLink>
      </ul>
    </div>
  );
};

export default ProfileLeft;
