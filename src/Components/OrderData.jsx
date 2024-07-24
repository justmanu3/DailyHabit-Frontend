import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import Invoice from "./Invoice";
import ConfirmModal from "../Components/ConfirmModal"; 

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet);
  const userId = user?.user_id;
  const walletId = wallet?.walletId;
  const [complaint, setComplaint] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null); // State to track selected order for cancellation

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
        if (status === "paid") {
          return getWallet(userId).then((walletData) => {
            dispatch(setWallet(walletData));
          });
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        return getAllOrders();
      })
      .then((data) => {
        dispatch(setOrders(data));
        dispatch(alertInfo("Order status updated"));
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

  const handleComplaint = () => {
    setComplaint(false);
    dispatch(alertInfo("Complaint Registered"));
    setTimeout(() => {
      dispatch(alertNULL());
    }, 3000);
  };

  const handleConfirmCancel = () => {
    if (selectedOrder) {
      handleClick(
        selectedOrder.orderId,
        "cancelled",
        selectedOrder.status,
        selectedOrder.total,
        walletId
      );
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {complaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="max-w-lg w-full p-6 bg-white rounded-2xl">
            <div className="flex items-center justify-end w-full">
              <button
                className="flex items-center bg-red-600 rounded-full w-6 h-6 justify-center text-md font-bold text-white"
                onClick={() => setComplaint(false)}
              >
                x
              </button>
            </div>
            <h1 className="text-xl text-red-500 font-semibold">
              Hello,{" "}
              <span className="font-normal text-black">
                Want to Raise a Complaint?
              </span>
            </h1>
            <form className="mt-4">
              <label
                htmlFor="reason"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Reason
              </label>
              <select
                id="reason"
                type="text"
                name="reason"
                className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              >
                <option value="default">Select a reason</option>
                <option value="one">Complaint regarding Delivery Time</option>
                <option value="two">Product Quantity</option>
                <option value="three">Food Quality</option>
                <option value="four">Wrong Delivery</option>
                <option value="five">Packing</option>
              </select>

              <label
                htmlFor="explanation"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Explanations
              </label>
              <input
                id="explanation"
                type="text"
                name="explanation"
                autoComplete=""
                className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />

              <label
                htmlFor="comments"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Comments (optional)
              </label>
              <input
                id="comments"
                type="text"
                name="comments"
                autoComplete=""
                className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />

              <button
                onClick={handleComplaint}
                type="submit"
                className="w-full py-3 mt-4 font-medium tracking-widest text-white uppercase bg-emerald-500 shadow-lg focus:outline-none hover:bg-emerald-700 hover:shadow-none"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}

      {showInvoice && (
        <Invoice data={data} onClose={() => setShowInvoice(false)} />
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />

      <motion.div
        key={index}
        {...fadeInOut(index)}
        className="w-full flex flex-col items-start justify-start px-3 py-4 border relative border-gray-300 bg-gray-200 drop-shadow-md rounded-md gap-4"
      >
        <div className="w-full flex items-center justify-between flex-wrap">
          <h3 className="text-md text-textColor font-semibold">
            ID {data.orderId}
          </h3>

          {!admin &&
            (data.sts === "delivered" || data.sts === "cancelled" ? (
              <></>
            ) : (
              <div className="flex items-center justify-center gap-2 mt-2">
                <motion.p
                  {...buttonClick}
                  className="text-red-600 text-base font-semibold capitalize border border-red-500 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => {
                    setSelectedOrder(data);
                    setIsModalOpen(true);
                  }}
                >
                  Cancel Order
                </motion.p>
              </div>
            ))}

          {!admin &&
            (data.sts === "preparing" || data.sts === "cancelled" ? (
              <></>
            ) : (
              <div className="flex items-center justify-center gap-2 mt-2">
                <motion.p
                  {...buttonClick}
                  className="text-orange-600 text-base font-semibold capitalize border border-orange-500 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => setComplaint(true)}
                >
                  Raise A Complaint
                </motion.p>
                <motion.p
                  {...buttonClick}
                  className="text-black text-base font-semibold capitalize border border-gray-600 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => setShowInvoice(true)}
                >
                  Invoice
                </motion.p>
              </div>
            ))}

          <div className="flex items-center gap-4 flex-wrap">
            <p className="flex items-center gap-1 text-textColor">
              Total:
              <HiCurrencyRupee className="text-lg text-red-400" />{" "}
              <span className="text-textColor font-bold">{data?.total}</span>
            </p>

            <p className="px-2 py-1 text-sm text-textColor font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md">
              {data?.status}
            </p>
            <p
              className={`text-base font-semibold capitalize border border-gray-300 px-2 py-1 rounded-md ${
                (data.sts === "preparing" && "text-orange-400 bg-orange-100") ||
                (data.sts === "cancelled" && "text-red-500 bg-red-100") ||
                (data.sts === "delivered" && "text-emerald-400 bg-emerald-100")
              }`}
            >
              {data.sts}
            </p>
            {admin && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <p className="text-lg font-semibold text-textColor">Mark as</p>
                <motion.p
                  {...buttonClick}
                  className="text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => handleClick(data.orderId, "preparing")}
                >
                  Preparing
                </motion.p>
                <motion.p
                  {...buttonClick}
                  className="text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => handleClick(data.orderId, "cancelled")}
                >
                  Cancelled
                </motion.p>
                <motion.p
                  {...buttonClick}
                  className="text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => handleClick(data.orderId, "delivered")}
                >
                  Delivered
                </motion.p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-start flex-wrap w-full">
          <div className="flex flex-col items-start justify-center gap-4">
            {data?.items &&
              data.items.map((item, j) => (
                <motion.div
                  {...fadeInOut(j)}
                  key={j}
                  className="flex items-start justify-start gap-2"
                >
                  {item.imageURL ? (
                    <img
                      src={item.imageURL}
                      className="w-16 h-16 object-contain"
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

          <div className="flex items-start justify-start flex-col gap-2 px-4 ml-auto w-full md:w-460">
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
        </div>
      </motion.div>
    </>
  );
};

export default OrderData;
