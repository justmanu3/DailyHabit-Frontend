import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../Context/actions/ordersAction";
import OrderData from "./OrderData";

const DBOrders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        console.log(data);
        dispatch(setOrders(data));
      });
    }
  }, [dispatch, orders]);

    return (
    <div className="flex flex-col items-center pt-6 w-full px-4 md:px-6 lg:px-8">
      {orders ? (
        <>
          {orders
            .slice()
            .reverse()
            .map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={true} />
            ))}
        </>
      ) : (
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-textColor font-bold">
          No Orders
        </h1>
      )}
    </div>
  );
};


export default DBOrders;
