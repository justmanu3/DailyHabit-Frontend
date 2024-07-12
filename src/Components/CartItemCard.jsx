import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {  HiCurrencyRupee } from "../assets/icons/index";
import { fadeInOut, buttonClick } from "../Animations";
import { editStockCount, increaseItemQuantity } from "../api";
import { getAllCartItems } from "../api";
import { setCartItems } from "../Context/actions/cartActions";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";

const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Cart item updated"));
    editStockCount(productId, "decrement").then((count) => {
      increaseItemQuantity(user?.user_id, productId, "decrement").then(
        (data) => {
          getAllCartItems(user?.user_id).then((products) => {
            dispatch(setCartItems(products));
            dispatch(alertNULL());
          });
        }
      );
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Cart item updated"));
    editStockCount(productId, "increment").then((count) => {
      increaseItemQuantity(user?.user_id, productId, "increment").then(
        (data) => {
          getAllCartItems(user?.user_id).then((products) => {
            dispatch(setCartItems(products));
            dispatch(alertNULL());
          });
        }
      );
    });
  };

  useEffect(() => {
    setCartTotal(data.product_price * data.quantity);
  }, [cartTotal, cart]);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

  return (
    <motion.div
      key={index}
      {...fadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-500 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.imageURL}
        className="w-24 min-w-[94px] h-24 object-contain"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full ">
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-black">
            {data?.product_category}
          </span>
        </p>

        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-600 ml-auto">
          <HiCurrencyRupee className="text-white" /> {cartTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-800 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          onClick={() => incrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-800 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartItemCard;
