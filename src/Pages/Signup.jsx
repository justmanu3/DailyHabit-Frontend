import React, { useState } from "react";
import LoginBg from "../assets/Images/BG.jpg";
import logo from "../assets/Logo/mainlogo.png";
import LoginInput from "../Components/LoginInput";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../Config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Context/actions/userActions";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
  alertWarning,
} from "../Context/actions/alertActions";
import axios from "axios";
import { baseURL } from "../api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [otpButton, setOtpButton] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const user = useSelector((state) => state.user);
  //   const alert = useSelector((state) => state.alert);

  const firebaseAuth = getAuth(app);

  //signup
  //   const signUpWithEmailPassword = async () => {
  //     if (userEmail === "" || password === "" || confirmPassword === "") {
  //       dispatch(alertInfo("Required field should not be empty"));
  //     } else {
  //       if (password === confirmPassword) {
  //         setuserEmail("");
  //         setPassword("");
  //         setconfirmPassword("");
  //         await createUserWithEmailAndPassword(
  //           firebaseAuth,
  //           userEmail,
  //           password
  //         ).then((userCred) => {
  //           firebaseAuth.onAuthStateChanged((cred) => {
  //             if (cred) {
  //               cred.getIdToken().then((token) => {
  //                 // validate token
  //                 validateUserJWTToken(token).then((data) => {
  //                   dispatch(setUserDetails(data));
  //                 });
  //                 navigate("/login", { replace: true });
  //               });
  //             }
  //           });
  //         });
  //       } else {
  //         setTimeout(() => {
  //           dispatch(alertWarning("Error in Signing in"));
  //         }, 3000);
  //         dispatch(alertNULL());
  //       }
  //     }
  //   };

  const handleSendOTP = async () => {
    {
      if (!email) {
        dispatch(alertWarning("Please provide email address"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 2000);
      }
    }
    setOtpButton(true);
    try {
      const response = await axios.post(`${baseURL}/api/users/sendotp`, {
        email,
      });
      console.log("response", response);
      console.log(email);

      localStorage.setItem("otp", response.data.otp);
      console.log("OTP:", response.data.otp);
      setTimeout(() => localStorage.removeItem("otp"), 60000); // Clears the OTP after 60 seconds
      dispatch(alertSuccess("OTP sent to Email"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 2000);
    } catch (error) {
      dispatch(alertDanger("Failed to sent OTP"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 2000);
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTPAndSignUp = async () => {
    const storedOtp = localStorage.getItem("otp");
    if (!storedOtp) {
      dispatch(alertWarning("OTP does not Match"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 2000);
      return;
    }

    if (password !== confirmPassword) {
      dispatch(alertWarning("Password does not Match"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 2000);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/users/verifyotp`, {
        userOtp: inputOtp,
        storedOtp,
      });

      if (response.data === "OTP verified successfully") {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCred) => {
            onAuthStateChanged(firebaseAuth, (cred) => {
              if (cred) {
                cred.getIdToken().then((token) => {
                  validateUserJWTToken(token).then((data) => {
                    dispatch(setUserDetails(data));
                    dispatch(alertSuccess("Signed up Succesfully"));
                    setTimeout(() => {
                      dispatch(alertNULL());
                    }, 2000);
                    navigate("/home", { replace: true });
                  });
                });
              }
            });
          })
          .catch((error) => {
            dispatch(alertDanger("Error Signing up"));
            setTimeout(() => {
              dispatch(alertNULL());
            }, 2000);
            console.error("Firebase signup error:", error);
          });
      } else {
        dispatch(alertWarning("Error Signing Up"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 2000);
      }
    } catch (error) {
      dispatch(alertWarning("Incorrect OTP"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 2000);
      console.error("OTP verification error:", error);
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
      <div className="flex flex-col items-center bg-cardOverlay w-[90%] max-w-lg md:w-[80%] lg:w-[50%] h-auto z-10 backdrop-blur-md p-4 md:p-8 lg:p-12 rounded-lg">
        <div className="flex items-center gap-4 mb-6 w-full">
          <img src={logo} className="w-8 md:w-10" alt="Logo" />
          <p className="text-2xl md:text-3xl text-white">DAILY HABIT</p>
        </div>

        <p className="text-2xl md:text-3xl text-textColor font-semibold mb-4">
          Welcome
        </p>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Sign Up with Details
        </p>

        <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-6">
          {/* Uncomment and adjust as needed */}
          {/* <LoginInput
            placeHolder={"Username"}
            icon=""
            inputState={name}
            inputStateFunc={setName}
            type="text"
          /> */}
          <LoginInput
            placeHolder={"Email Here"}
            icon=""
            inputState={email}
            inputStateFunc={setEmail}
            type="email"
          />
          {otpButton ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize hover:bg-red-500 duration-150"
              onClick={handleSendOTP}
            >
              Send OTP
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize hover:bg-red-500 duration-150"
              onClick={handleSendOTP}
            >
              Resend OTP
            </motion.button>
          )}

          <LoginInput
            placeHolder={"Enter OTP Here"}
            icon=""
            inputState={inputOtp}
            inputStateFunc={setInputOtp}
            type="text"
          />

          <LoginInput
            placeHolder={"Password Here"}
            icon=""
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
          />

          <LoginInput
            placeHolder={"Confirm Password"}
            icon=""
            inputState={confirmPassword}
            inputStateFunc={setconfirmPassword}
            type="password"
          />

          <p className="text-gray-700 text-sm md:text-base mt-4">
            Already Have an Account?
            <motion.button
              {...buttonClick}
              className="text-red-400 underline cursor-pointer bg-transparent ml-2"
              onClick={() => navigate("/login")}
            >
              Sign In here
            </motion.button>
          </p>

          <motion.button
            {...buttonClick}
            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize hover:bg-red-500 duration-150 mt-4"
            onClick={handleVerifyOTPAndSignUp}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
