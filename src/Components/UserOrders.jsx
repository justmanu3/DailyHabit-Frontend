import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../Context/actions/ordersAction";
import OrderData from "./OrderData";
import { motion } from "framer-motion";
import { fadeInOut } from "../Animations";

const UserOrders = () => {
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orders) {
      getAllOrders()
        .then((data) => {
          dispatch(setOrders(data));
          setUserOrders(data.filter((item) => item.userId === user?.user_id));
        })
        .finally(() => setLoading(false));
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
      setLoading(false);
    }
  }, [orders]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />

      {/* Loader */}
      {loading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-red-200 backdrop-blur-md flex items-center justify-center h-full w-full"
        >
          Loading...
        </motion.div>
      )}

      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 gap-2 pb-24">
        {userOrders?.length > 0 ? (
          <>
            {userOrders
              .slice()
              .reverse()
              .map((item, i) => (
                <OrderData key={i} index={i} data={item} admin={false} />
              ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-textColor font-bold">No Orders</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UserOrders;
