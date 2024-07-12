import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../src/assets/Logo/mainlogo.png";
import { isActiveStyle, isNotActiveStyle } from "../assets/utils/styles";
import { motion } from "framer-motion";
import { buttonClick, dropDown } from "../Animations/index";
import { MdLogout, MdShoppingCart } from "../assets/icons/index";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../assets/icons/Avatar.png";
import { getAuth } from "firebase/auth";
import { setUserNull } from "../Context/actions/userActions";
import { app } from "../Config/firebase.config";
import { setCartOn } from "../Context/actions/displayCartActions";

const Header = () => {
  //getting user from the redux
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-1">
      <NavLink to={"/home"} className="flex items-center justify-center gap-5">
        <img src={logo} className="w-12" alt="" />
        <p className="font-normal text-xl">DAILY HABIT</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-10">
          <NavLink
          to={"/home"}
            className={({ isActive }) =>
              !isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Home
          </NavLink>

          {/* <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Products
          </NavLink> */}

          {/* <NavLink
            className={({ isActive }) =>
              !isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            About
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              !isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Service
          </NavLink> */}
        </ul>

        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-textColor" />
          {cart?.length > 0 && (
            <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>

        {user ? (
          <>
            <div
              className=" relative cursor-pointer"
              onMouseEnter={() => {
                setIsMenu(true);
              }}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center ">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...dropDown}
                  onMouseLeave={() => {
                    setIsMenu(false);
                  }}
                  className="px-6 py-4 w-48 bg-slate-300 backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                >
                  {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                    <Link
                      className="hover:text-red-600 text-xl text-textColor"
                      to="/dashboard/home"
                    >
                      {" "}
                      Dashboard
                    </Link>
                  )}

                  {user?.user_id !== process.env.REACT_APP_ADMIN_ID && (
                    <Link
                      className="hover:text-red-600 text-xl text-textColor"
                      to="/profile/userprofile"
                    >
                      My Profile
                    </Link>
                  )}

                  {user?.user_id !== process.env.REACT_APP_ADMIN_ID && (
                    <Link
                      className="hover:text-red-600 text-xl text-textColor"
                      to="/userorders"
                    >
                      {" "}
                      Orders
                    </Link>
                  )}

                  <hr />

                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-red-300 hover:bg-red-500 gap-3"
                  >
                    <MdLogout className="text-2xl text-textColor" />
                    <p className="text-textColor text-xl ">Sign out</p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-lighttextGray border border-red-300 hover:bg-red-400 cursor-pointer"
              >
                {" "}
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
