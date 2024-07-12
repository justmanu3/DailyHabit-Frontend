import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { buttonClick, fadeInOut } from "../Animations/index";
import { HiCurrencyRupee } from "../assets/icons/index";
import {
  getAllOrders,
  getWallet,
  updateOrderSts,
  updateWalletAmount,
} from "../api";
import { setOrders } from "../Context/actions/ordersAction";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertNULL } from "../Context/actions/alertActions";
import { setWallet } from "../Context/actions/walletActions";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet);
  const userId = user?.user_id;
  const walletId = wallet?.walletId;

  useEffect(() => {
    if (!wallet) {
      getWallet(user?.user_id).then((data) => {
        dispatch(setWallet(data));
      });
    }
  }, [dispatch, user]);

  const handleClick = (orderId, sts, status, total, walletId) => {
    console.log(orderId, walletId);

    updateOrderSts(orderId, sts)
      .then((response) => {
        if (status === "paid") {
          return updateWalletAmount(userId, total, walletId);
        } else {
          return Promise.resolve();
        }
      })
      .then((walletResponse) => {
        return getAllOrders();
      })
      .then((data) => {
        dispatch(setOrders(data));
        dispatch(alertInfo("Order status and wallet amount updated"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating order status or wallet amount:", error);
        dispatch(alertInfo("Failed to update order status or wallet amount"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });
  };

  return (
    <motion.div
      key={index}
      {...fadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-gray-200 drop-shadow-md rounded-md gap-4"
    >
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-md text-textColor font-semibold">
              Order ID
            </th>
            <th className="text-left text-md text-textColor font-semibold">
              Total
            </th>
            <th className="text-left text-md text-textColor font-semibold">
              Status
            </th>
            <th className="text-left text-md text-textColor font-semibold">
              Items
            </th>
            <th className="text-left text-md text-textColor font-semibold">
              Shipping Details
            </th>
            {admin && (
              <th className="text-left text-md text-textColor font-semibold">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID {data.orderId}</td>
            <td className="flex items-center gap-1 text-textColor">
              <HiCurrencyRupee className="text-lg text-red-400" />
              <span className="text-textColor font-bold">{data?.total}</span>
            </td>
            <td>
              <p className="px-2 py-[2px] text-sm text-textColor font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md">
                {data?.status}
              </p>
              <p
                className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
                  (data.sts === "preparing" &&
                    "text-orange-400 bg-orange-100") ||
                  (data.sts === "cancelled" && "text-red-500 bg-red-100") ||
                  (data.sts === "delivered" &&
                    "text-emerald-400 bg-emerald-100")
                }`}
              >
                {data.sts}
              </p>
            </td>
            <td>
              <div className="flex items-center justify-center gap-4">
                {data?.items &&
                  data.items.map((item, j) => (
                    <motion.div
                      {...fadeInOut(j)}
                      key={j}
                      className="flex items-center justify-center gap-1"
                    >
                      {item.imageURL ? (
                        <img
                          src={item.imageURL}
                          className="w-10 h-10 object-contain"
                          alt=""
                        />
                      ) : null}

                      <div className="flex items-start flex-col">
                        <p className="text-base font-semibold text-textColor">
                          {item.product_name}
                        </p>
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-textColor">
                            Qty: {item.quantity}
                          </p>
                          <p className="flex items-center gap-1 text-textColor">
                            <HiCurrencyRupee className="text-base text-red-400" />
                            {parseFloat(item.product_price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </td>
            <td>
              <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
                <h1 className="text-lg text-textColor font-semibold">
                  {data.shipping_details.name}
                </h1>

                <p className="text-base text-textColor -mt-2">
                  {data.shipping_details.address?.line1}
                  {data.shipping_details.address?.line2}{" "}
                  {data.shipping_details.address?.city}{" "}
                  {data.shipping_details.address?.state}{" "}
                  {data.shipping_details.address?.postal_code}
                </p>
                <p className="text-base text-textColor -mt-2">
                  {data.customer.email} {data.customer.phone}
                </p>
              </div>
            </td>
            {admin && (
              <td className="flex items-center justify-center gap-2">
                <p className="text-lg font-semibold text-textColor">Mark as</p>
                <motion.p
                  {...buttonClick}
                  className="text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer"
                  onClick={() => handleClick(data.orderId, "preparing")}
                >
                  Preparing
                </motion.p>
                <motion.p
                  {...buttonClick}
                  className="text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer"
                  onClick={() => handleClick(data.orderId, "cancelled")}
                >
                  Cancelled
                </motion.p>
                <motion.p
                  {...buttonClick}
                  className="text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer"
                  onClick={() => handleClick(data.orderId, "delivered")}
                >
                  Delivered
                </motion.p>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export default OrderData;
