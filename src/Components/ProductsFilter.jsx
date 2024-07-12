import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fadeInOut } from "../Animations/index";
import { IoFastFood } from "../assets/icons/index";
import SliderCard from "./SliderCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase.config";

const ProductsFilter = () => {
  const [category, setCategory] = useState("Oat Bowls");
  const products = useSelector((state) => state.products);
  const [dbcategory, setDbCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setDbCategory(items);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  // Reset search term and sort order when category changes
  useEffect(() => {
    setSearchTerm("");
    setSortOrder("");
  }, [category]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedProducts = (products) => {
    return products.sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.product_price - b.product_price;
      } else if (sortOrder === "high-to-low") {
        return b.product_price - a.product_price;
      } else {
        return 0;
      }
    });
  };

  return (
    <motion.div className="w-full flex items-start justify-start flex-col pt-8">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1 ml-5">
          <p className="text-2xl text-textColor font-bold">Our Menu</p>
          <div className="w-40 h-1 rounded-md bg-red-400"></div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="w-full pt-6 flex items-center justify-center gap-20 py-8">
        {dbcategory &&
          dbcategory.map((data, i) => (
            <FilterCard
              key={data.id}
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5 ml-10">
        {products &&
          sortedProducts(products)
            .filter((data) => data.product_category === category)
            .filter((data) =>
              data.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((data, i) => (
              <SliderCard
                key={data.id}
                data={{ ...data, imageURL: data.imageURL[0] }}
                index={i}
              />
            ))}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...fadeInOut(index)}
      onClick={() => setCategory(data.title)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${
        category === data.title ? "bg-red-500" : "bg-primary"
      } hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-10`}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.title ? "bg-primary" : "bg-red-500"
        }`}
      >
        <IoFastFood
          className={`${
            category === data.title ? "text-red-500" : "text-primary"
          } group-hover:text-red-500`}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          category === data.title ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default ProductsFilter;
