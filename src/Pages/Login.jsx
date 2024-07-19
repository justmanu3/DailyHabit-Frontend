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
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                // validate token
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/home", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Incorrect email or password"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* Background image */}

      <img
        src={LoginBg}
        className="w-full h-screen object-cover absolute top-0 left-0"
        alt=""
      />

      {/* Content */}
      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12">
        <div className="flex items-center justify-items-start gap-4 w-full">
          <img src={logo} className="w-10" alt="" />
          <p className=" text-3xl">DAILY HABIT</p>
        </div>

        <br />
        <p className="text-3xl text-textColor font-semibold">Welcome</p>
        <p>Sign In Here</p>

        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icon=""
            inputState={email}
            inputStateFunc={setEmail}
            type="email"
          />
          <LoginInput
            placeHolder={"Password Here"}
            icon=""
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
          />

          <p>
            Doesn't have an Account?
            <motion.button
              {...buttonClick}
              className="text-red-400 underline cursor-pointer bg-transparent"
              onClick={() => navigate("/signup")}
            >
              Create One
            </motion.button>
          </p>

          <motion.button
            {...buttonClick}
            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize hover:bg-red-500 duration-150"
            onClick={signInwithEmailPassword}
          >
            Sign In
          </motion.button>
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[2px] rounded-md bg-white"></div>

          <p className="text-white"></p>
          <div className="w-24 h-[2px] rounded-md bg-white"></div>
        </div>
        <br />
        <motion.div
          {...buttonClick}
          className=" flex items-center justify-center px-32 py-3 bg-slate-200 backdrop-blur-md cursor-pointer rounded-3xl gap-4 "
          onClick={loginWithGoogle}
        >
          <img src={googleicon} className="w-5 h-5" alt="" />
          <p className="capitalize text-base text-textColor">
            Signin with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
