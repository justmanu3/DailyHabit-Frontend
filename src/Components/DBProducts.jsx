import React, { useEffect, useState } from "react";
import { HiCurrencyRupee } from "../assets/icons/index";
import { useSelector, useDispatch } from "react-redux";
import { deleteAProduct, editAProduct, getAllProducts } from "../api";
import { setAllProducts } from "../Context/actions/productActions";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase.config";

const DBProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editProduct, setEditProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCount, setProductCount] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products once when the component mounts
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

  // Fetch categories once when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setSelectedCategories(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.product_name);
      setCategory(selectedProduct.product_category);
      setProductPrice(selectedProduct.product_price);
      setProductCount(selectedProduct.product_count);
    }
  }, [selectedProduct]);

  const handleClick = (data) => {
    setSelectedProduct(data);
    setEditProduct(true);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const submitEditing = () => {
    const updatedProduct = {
      product_name: productName,
      product_category: category,
      product_price: productPrice,
      product_count: productCount,
    };

    if (selectedProduct && selectedProduct.productId) {
      editAProduct(selectedProduct.productId, updatedProduct).then(() => {
        dispatch(alertSuccess("Product Updated Successfully"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);

        getAllProducts().then((data) => {
          dispatch(setAllProducts(data));
        });

        setEditProduct(false);
        setSelectedProduct(null);
      });
    }
  };

  const deleteFunction = (productId) => {
    if (window.confirm("Confirm Deletion?")) {
      deleteAProduct(productId).then((res) => {
        dispatch(alertSuccess("Product Deleted"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        getAllProducts().then((data) => {
          dispatch(setAllProducts(data));
        });
      });
    }
  };

  return editProduct ? (
    <div className="flex items-center  justify-center flex-col pt-6 px-24 w-full">
      <div className="flex items-end justify-end w-full">
        <motion.button
          className="border w-24 border-gray-300 bg-red-400 hover:bg-red-600 rounded-2xl mr-1"
          {...buttonClick}
          onClick={() => setEditProduct(false)}
        >
          close
        </motion.button>
      </div>
      <div className="border border-gray-300  rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeholder={"Product Name"}
          stateFunc={setProductName}
          stateValue={productName}
        />

        <div className="w-full flex items-center justify-around">
          <select
            className="px-4 py-2 w-full rounded-md text-lg text-lighttextGray font-normal cursor-pointer shadow-md border border-gray-200 backdrop-blur-md appearance-none bg-white"
            value={category}
            onChange={handleChange}
          >
            {selectedCategories.map((pdt, i) => (
              <option key={i} value={pdt.title}>
                {pdt.title}
              </option>
            ))}
          </select>
        </div>

        <InputValueField
          type="number"
          placeholder={"Price"}
          stateFunc={setProductPrice}
          stateValue={productPrice}
        />
        <InputValueField
          type="number"
          placeholder={"Stock Count"}
          stateFunc={setProductCount}
          stateValue={productCount}
        />

        <motion.button
          onClick={submitEditing}
          {...buttonClick}
          className="w-9/12 py-2 bg-red-400 text-white hover:bg-red-600 cursor-pointer"
        >
          Save Details
        </motion.button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Image</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Category</th>
            <th className="py-2 px-4 border-b border-gray-200">Price</th>
            <th className="py-2 px-4 border-b border-gray-200">Stock</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.productId}>
              <td className="py-2 px-4 border-b border-gray-200">
                <img
                  src={
                    Array.isArray(product.imageURL)
                      ? product.imageURL[0]
                      : product.imageURL
                  }
                  alt="Product"
                  className="w-32 h-16 object-contain rounded-md"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {product.product_name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {product.product_category}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <p className="text-xl font-medium text-textColor flex items-center justify-center">
                  <HiCurrencyRupee />
                  {parseFloat(product.product_price).toFixed(2)}
                </p>
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {product.product_count}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleClick(product)}
                  className="mr-2 text-white bg-emerald-500 border rounded-md "
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteFunction(product.productId);
                  }}
                  className="text-white bg-red-500 border rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
      className="w-full px-4 py-3 bg-white shadow-md outline-none rounded-md border-gray-200 focus:border-red-500"
    />
  );
};

export default DBProducts;
