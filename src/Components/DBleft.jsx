import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo/mainlogo.png";
import { isActiveStyle, isNotActiveStyle } from "../assets/utils/styles";

const DBleft = () => {
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
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Orders
        </NavLink>

        <NavLink
          to={"/dashboard/products"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Products
        </NavLink>

        <NavLink
          to={"/dashboard/additems"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Add Items
        </NavLink>

        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Users
        </NavLink>

        <NavLink
          to={"/dashboard/categories"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Category
        </NavLink>
        <NavLink
          to={"/dashboard/coupons"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Coupons
        </NavLink>
        <NavLink
          to={"/dashboard/salesreport"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Sales Report
        </NavLink>
        <NavLink
          to={"/dashboard/offers"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Offers
        </NavLink>
        {/* <NavLink
          to={"/dashboard/statistics"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Statistics
        </NavLink> */}
      </ul>
    </div>
  );
};

export default DBleft;
