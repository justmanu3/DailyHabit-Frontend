import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductToCart,
  getAllCartItems,
  getAllProducts,
} from "../api/index";
import { setAllProducts } from "../Context/actions/productActions";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";
import { setCartItems } from "../Context/actions/cartActions";
import Header from "./Header";
import Cart from "./Cart";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const location = useLocation();
  const isCart = useSelector((state) => state.isCart);
  const productId = location.state.productId;
  const product_name = location.state.product_name;
  const product_category = location.state.product_name;
  const product_price = location.state.product_price;
  const imageURL = location.state.imageURL;
  const product_count = location.state.product_count;

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
      console.log("data ready", data);
    }
  }, []);

  useEffect(() => {
    console.log(productId);
  }, []);

  const data = {
    data: {
      productId,
      product_name,
      product_category,
      product_price,
      imageURL,
      product_count,
    },
  };

  const sendToCart = () => {
    dispatch(alertSuccess("Product Added to Cart"));
    addNewProductToCart(user?.user_id, data).then((res) => {
      console.log("cartilott", data);
      getAllCartItems(user?.user_id).then((products) => {
        dispatch(setCartItems(products));
      });
      setInterval(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  return (
    <div>
      <div className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-4 md:px-12 py-2">
        <Header />
      </div>

      <div className="bg-gray-300 rounded-2xl w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mt-24 px-4 md:px-16 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 px-4 md:px-10">
            <div className="flex justify-center items-center w-full h-64 md:w-64 md:h-64 rounded-lg shadow-md">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={location.state.imageURL}
                alt="Primary Image"
                className="w-full h-full object-cover rounded-lg bg-primary"
              />
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 md:px-10 py-10">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-3xl font-bold pb-2">
                {location.state.product_name}
              </h1>
              <div className="flex items-center space-x-2 pb-4">
                <span className="text-yellow-400 text-xl font-bold">
                  4 Star
                </span>
                <span className="text-gray-500">8 Ratings</span>
              </div>
              <div className="text-gray-700 text-lg pb-4">
                {location.state.product_category}
              </div>
              <div className="text-red-500 font-bold text-3xl pb-4">
                $ {location.state.product_price}
              </div>
              <div className="flex items-center space-x-2 pb-4">
                <span className="text-gray-500">In Stock</span>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  {...buttonClick}
                  onClick={sendToCart}
                  whileHover={{ scale: 1.1 }}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isCart && <Cart />}
    </div>
  );
};

export default ViewProduct;
