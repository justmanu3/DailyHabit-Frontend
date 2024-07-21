import React, { useEffect, useState } from "react";
import LoginBg from "../assets/Images/BG.jpg";
import logo from "../assets/Logo/mainlogo.png";
import LoginInput from "../Components/LoginInput";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import googleicon from "../assets/Logo/googleicon.png";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../Config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Context/actions/userActions";
import { alertNULL, alertWarning } from "../Context/actions/alertActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  //navigating the user automatically to the home page right after the user login
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);

  //google login

  // const loginWithGoogle = async () => {
  //   await signInWithPopup(firebaseAuth, provider).then((userCred) => {
  //     firebaseAuth.onAuthStateChanged((cred) => {
  //       if (cred) {
  //         cred.getIdToken().then((token) => {
  //           // validate token
  //           validateUserJWTToken(token).then((data) => {
  //             dispatch(setUserDetails(data));
  //           });
  //           navigate("/home", { replace: true });
  //         });
  //       }
  //     });
  //   });
  // };

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            // validate token
            console.log(token);
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/home", { replace: true });
          });
        }
      });
    });
  };

  //signin

  const signInwithEmailPassword = async () => {
    if (email !== "" && password !== "") {
      try {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              // validate token
              validateUserJWTToken(token)
                .then((data) => {
                  if (data) {
                    dispatch(setUserDetails(data));
                    navigate("/home", { replace: true });
                  } else {
                    dispatch(alertWarning("Invalid token"));
                  }
                })
                .catch((error) => {
                  console.error("Error during token validation:", error);
                  dispatch(alertWarning("Token validation failed"));
                });
            });
          }
        });
      } catch (error) {
        console.error("Error during sign in:", error);
        dispatch(alertWarning("Incorrect email or password"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      }
    } else {
      dispatch(alertWarning("Email and password must not be empty"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex items-center justify-center bg-gray-100">
      {/* Background image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
        alt="Background"
      />

      {/* Content */}
      <div className="flex flex-col items-center bg-cardOverlay w-[90%] max-w-lg md:w-[80%] lg:w-[40%] h-auto md:h-auto z-10 backdrop-blur-md p-4 md:p-8 lg:p-12 rounded-lg">
        <div className="flex items-center gap-4 w-full mb-6">
          <img src={logo} className="w-8 md:w-10" alt="Logo" />
          <p className="text-2xl md:text-3xl text-white">DAILY HABIT</p>
        </div>

        <p className="text-2xl md:text-3xl text-textColor font-semibold mb-4">
          Welcome
        </p>
        <p className="text-base md:text-lg text-gray-700 mb-6">Sign In Here</p>

        <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-6">
          <LoginInput
            placeHolder="Email Here"
            icon=""
            inputState={email}
            inputStateFunc={setEmail}
            type="email"
          />
          <LoginInput
            placeHolder="Password Here"
            icon=""
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
          />

          <p className="text-gray-700 text-sm md:text-base">
            Don't have an account?
            <motion.button
              {...buttonClick}
              className="text-red-400 underline cursor-pointer bg-transparent ml-2"
              onClick={() => navigate("/signup")}
            >
              Create One
            </motion.button>
          </p>

          <motion.button
            {...buttonClick}
            className="w-full px-4 py-2 rounded-md bg-red-400 text-white text-lg md:text-xl capitalize hover:bg-red-500 duration-150"
            onClick={signInwithEmailPassword}
          >
            Sign In
          </motion.button>
        </div>

        <div className="flex items-center justify-between gap-4 w-full mt-8 mb-4">
          <div className="w-16 md:w-24 h-[2px] rounded-md bg-white"></div>
          <p className="text-white text-sm md:text-base">OR</p>
          <div className="w-16 md:w-24 h-[2px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center w-full px-6 py-3 bg-white text-gray-700 rounded-lg cursor-pointer gap-4 shadow-md hover:bg-gray-200"
          onClick={loginWithGoogle}
        >
          <img src={googleicon} className="w-5 h-5" alt="Google Icon" />
          <p className="capitalize text-sm md:text-base">Sign in with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
