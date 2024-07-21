import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/bundle";
import "../assets/css/swiperstyles.css";
import SliderCard from "../Components/SliderCard";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    const filteredSmoothies = products
      ?.filter((product) => product.product_category === "Smoothies")
      .slice(0, 3); // Get only the first 3 smoothies
    setSmoothies(filteredSmoothies);
  }, [products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {smoothies &&
        smoothies.map((data, i) => (
          <SliderCard key={i} data={data} index={i} />
        ))}
    </div>
  );
};

export default Slider;
