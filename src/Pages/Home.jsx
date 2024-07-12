import React, { useEffect } from "react";
import Header from "../Components/Header";
import HomePage from "../Components/HomePage";
import HomeSlider from "../Components/HomeSlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers, getAllProducts } from "../api/index";
import { setAllProducts } from "../Context/actions/productActions";
import ProductsFilter from "../Components/ProductsFilter";
import Cart from "../Components/Cart";
import Footer from "../Components/Footer";
import { setAllOffers } from "../Context/actions/offerActions";

const Home = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const offers = useSelector((state) => state.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  useEffect(() => {
    if (!offers) {
      getAllOffers().then((data) => {
        dispatch(setAllOffers(data));
      });
    }
  }, [dispatch, offers]);

  return (
    <main className=" min-h-screen flex items-center justify-center flex-col ">
      <Header />
      <div className="w-full flex flex-col items-start justify-start pt-24  mt-0  pb-10">
        <HomePage />
        {/* <HomeSlider /> */}
        <ProductsFilter />
        <Footer />
      </div>

      {isCart && <Cart />}
    </main>
  );
};

export default Home;
