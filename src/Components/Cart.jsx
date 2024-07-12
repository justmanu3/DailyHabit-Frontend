import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { buttonClick, slideIn } from "../Animations";
import { setCartOff } from "../Context/actions/displayCartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  BiChevronRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons/index";
import { useNavigate } from "react-router-dom";

import CartItemCard from "./CartItemCard";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((data) => {
        tot += data.product_price * data.quantity;
      });
      setTotal(tot);
    }
  }, [cart]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmCodPayment = () => {
    closeModal();
    navigate("/checkout");
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-full md:w-508 bg-transparent backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-2 px-4">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronRight className="text-[30px] text-lighttextGray" />
        </motion.i>
        <p className="text-lg text-textColor font-semibold">Your Cart</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FcClearFilters className="text-[20px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-700 h-full py-4 gap-2">
        {cart && cart.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-2 overflow-y-scroll scrollbar-none px-3 flex-grow">
              {cart.map((products, i) => (
                <CartItemCard key={i} index={i} data={products} />
              ))}
            </div>

            <div className="bg-zinc-800 rounded-t-[40px] w-full flex flex-col items-center justify-center px-3 py-10 gap-10">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-2xl text-zinc-500 font-semibold">Total</p>
                <p className="text-2xl text-orange-600 font-semibold flex items-center justify-center gap-2">
                  <HiCurrencyRupee className="text-white" />
                  {total}
                </p>
              </div>

              <motion.button
                {...buttonClick}
                className="bg-red-300 w-[70%] h-10 px-3 py-2 text-lg text-textColor font-semibold hover:bg-red-500 hover:text-primary drop-shadow-md rounded-2xl"
                onClick={confirmCodPayment}
              >
                Checkout
              </motion.button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl text-primary font-bold">Cart is Empty</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
