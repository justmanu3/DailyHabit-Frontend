import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import { getAuth } from "firebase/auth";
import { app } from "./Config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { setUserDetails } from "./Context/actions/userActions";
import { fadeInOut } from "./Animations";
import { motion } from "framer-motion";
import Alert from "./Components/Alert";
import Dashboard from "./Pages/Dashboard";
import { setCartItems } from "./Context/actions/cartActions";
import ViewProduct from "./Components/ViewProduct";
import Signup from "./Pages/Signup";
import PrivateRoutes from "./Utils/PrivateRoute";
import Profile from "./Pages/Profile";
import CheckOutSuccess from "./Components/CheckOutSuccess";
import UserOrders from "./Components/UserOrders";
import CheckoutPage from "./Components/CheckOut";
import NotFound from "./Components/NotFound";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    console.log(process.env)
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          // validate token
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((products) => {
                // console.log(products);
                dispatch(setCartItems(products));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);

  return (
    <div className=" min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 insert-0 bg-red-200 backdrop-blur-md flex items-center justify-center h-full w-full"
        >
          Loading...
        </motion.div>
      )}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound/>}/>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/details" element={<ViewProduct />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/checkoutsuccess" element={<CheckOutSuccess />} />
          <Route path="/userorders" element={<UserOrders />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
