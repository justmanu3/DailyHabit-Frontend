import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/bundle";

import "../assets/css/swiperstyles.css";
import SliderCard from "../Components/SliderCard";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    setSmoothies(products?.filter((data) => data.product_category));
    console.log(" First Value kittii", smoothies);
  }, [products]);

  useEffect(() => {
    console.log("Value kittii", smoothies);
  }, [smoothies]);

  return (
    <div className=" flex flex-wrap justify-center items-center gap-5 ">
      {/* <Swiper
        slidesPerView={10}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      > */}
      {smoothies &&
        smoothies.map((data, i) => (
          // <SwiperSlide key={i}>
          <SliderCard key={i} data={data} index={i} />
          // </SwiperSlide>
        ))}
      {/* </Swiper> */}
    </div>
  );
};

export default Slider;
