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
      <div className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-1">
        <Header />
      </div>

      <div className="bg-gray-300 rounded-2xl h-[75%] w-[75%] mx-auto mt-16 px-40">
        <div className="container mx-auto  px-4 py-10">
          <div className="grid grid-cols-3 gap-10 px-10">
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-lg shadow-md">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={location.state.imageURL}
                alt="Primary Image"
                className="w-full h-full object-cover rounded-lg bg-primary"
              />
            </div>
            {/* <div className="flex justify-center items-center w-[250px] h-[250px] rounded-lg">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={location.state.imageURL}
                alt="Secondary Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-lg">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={location.state.imageURL}
                alt="Tertiary Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div> */}
          </div>
        </div>

        <main className="container mx-auto -ml-20 px-10 py-10">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
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

    // <div>
    //   <div className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-1">
    //     <Header />
    //   </div>

    //   <div className="bg-gray-300 rounded-2xl h-[75%] w-[75%]">
    //     <div className="container mx-auto px-4 py-10">
    //       <div className="grid grid-cols-3 gap-4 px-6 ">
    //         <div className="flexjustify-center items-center w-[250px] h-[250px] rounded-lg shadow-md ">
    //           <motion.img
    //             whileHover={{ scale: 1.2 }}
    //             src={location.state.imageURL[0]}
    //             alt="Primary Image"
    //             className="w-full h-full object-cover rounded-lg bg-primary"
    //           />
    //         </div>
    //         <div className="flex justify-center items-center w-[250px] h-[250px] rounded-lg ">
    //           <motion.img
    //             whileHover={{ scale: 1.2 }}
    //             src={location.state.imageURL[1]}
    //             alt="Secondary Image"
    //             className="w-full h-full object-cover rounded-lg"
    //           />
    //         </div>
    //         <div className="flex justify-center items-center w-[250px] h-[250px] rounded-lg ">
    //           <motion.img
    //             whileHover={{ scale: 1.2 }}
    //             src={location.state.imageURL[2]}
    //             alt="Tertiary Image"
    //             className="w-full h-full object-cover rounded-lg"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <main className=" container mx-auto px-10 py-10">
    //       <div className="flex flex-wrap">
    //         <div className="w-full px-4">
    //           <h1 className="text-3xl font-bold pb-2">
    //             {location.state.product_name}
    //           </h1>
    //           <div className="flex items-center space-x-2 pb-4">
    //             <span className="text-yellow-400 text-xl font-bold">
    //               4 Star
    //             </span>
    //             <span className="text-gray-500">8 Ratings</span>
    //           </div>
    //           <div className="text-gray-700 text-lg pb-4">
    //             {location.state.product_category}
    //           </div>
    //           <div className="text-red-500  font-bold text-3xl pb-4">
    //             $ {location.state.product_price}
    //           </div>
    //           <div className="flex items-center space-x-2 pb-4">
    //             {/* <span className="text-red-500">
    //             Temporarily closed
    //           </span> */}
    //             <span className="text-gray-500">In Stock</span>
    //           </div>
    //           <div className="flex space-x-2">
    //             <motion.button
    //               {...buttonClick}
    //               onClick={sendToCart}
    //               whileHover={{ scale: 1.1 }}
    //               className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
    //             >
    //               Add to Cart
    //             </motion.button>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};

export default ViewProduct;
