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
    <div className="flex items-center justify-center flex-col pt-6 w-full ">
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
        <>
          <h1 className="text-[72px] text-textColor font-bold">No Orders</h1>
        </>
      )}
    </div>
  );
};

export default DBOrders;
