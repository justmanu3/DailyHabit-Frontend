import React, { useEffect } from "react";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { addNewProductToCart, getAllCartItems, getAllOffers } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";
import { setCartItems } from "../Context/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { setAllOffers } from "../Context/actions/offerActions";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const offers = useSelector((state) => state.offers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!offers) {
      getAllOffers().then((data) => {
        dispatch(setAllOffers(data));
      });
    }
  }, [dispatch, offers]);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

  const sendToCart = () => {
    const productOffer = offers?.find(
      (offer) => offer?.productId === data?.productId
    );
    const discountedPrice = productOffer
      ? (data.product_price * (1 - productOffer.offer_discount / 100)).toFixed(
          2
        )
      : null;

    const productData = {
      ...data,
      product_price: discountedPrice || data.product_price,
    };

    console.log(productData);

    dispatch(alertSuccess("Product Added to Cart"));
    addNewProductToCart(user?.user_id, productData).then((res) => {
      getAllCartItems(user?.user_id).then((products) => {
        dispatch(setCartItems(products));
      });
      setInterval(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  const productOffer = offers?.find(
    (offer) => offer?.productId === data?.productId
  );
  const discountedPrice = productOffer
    ? (data.product_price * (1 - productOffer.offer_discount / 100)).toFixed(2)
    : null;

  return (
    <div className="bg-primary hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 gap-3">
      <motion.img
        whileHover={{ scale: 1.2 }}
        src={data?.imageURL}
        className="w-40 h-40 object-contain cursor-pointer"
        alt=""
        onClick={() =>
          navigate("/details", {
            state: {
              productId: data.productId,
              product_name: data.product_name,
              product_price: data.product_price,
              product_category: data.product_category,
              imageURL: data.imageURL,
              product_count: data.product_count,
            },
          })
        }
      />
      <div className="relative pt-12">
        <p className="text-xl text-textColor font-semibold">
          {data?.product_name}
        </p>
        <div className="text-lg font-semibold flex items-center justify-center gap-1">
          {discountedPrice ? (
            <>
              <p className="line-through text-red-500 flex items-center gap-1">
                <HiCurrencyRupee className="text-red-500" />
                {parseFloat(data?.product_price).toFixed(2)}
              </p>
              <p className="text-green-500 flex items-center gap-1">
                <HiCurrencyRupee className="text-green-500" />
                {discountedPrice}
              </p>
            </>
          ) : (
            <p className="text-red-500 flex items-center gap-1">
              <HiCurrencyRupee className="text-red-500" />
              {parseFloat(data?.product_price).toFixed(2)}
            </p>
          )}
        </div>

        {data?.product_count === 0 ? (
          <p className="text-red-500">Out of Stock</p>
        ) : (
          <motion.div
            {...buttonClick}
            onClick={sendToCart}
            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
          >
            <IoBasket className="text-2xl text-white" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SliderCard;
