import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

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
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const categoryCollectionRef = collection(db, "categories");

  const getAllCategory = () => {
    return getDocs(categoryCollectionRef);
  };

  ////

  const fetchCategories = async () => {
    const querySnapshot = await getAllCategory();
    setSelectedCategory(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  //////

  useEffect(() => {
    fetchCategories();
  }, [selectedCategory]);

///////
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
        {/* Input fields for product details */}
        <InputValueField
          type="text"
          placeholder={"Product Name"}
          stateFunc={setProductName}
          stateValue={productName}
        />

        <div className="w-full flex items-center justify-around">
          <select
            className="px-4 py-2 w-full rounded-md text-lg text-lighttextGray font-normal cursor-pointer shadow-md border border-gray-200 backdrop-blur-md appearance-none bg-white"
            defaultValue={category}
            onChange={handleChange}
            // style={{ minWidth: "550px" }}
          >
            <option value="other">{category}</option>

            {selectedCategory &&
              selectedCategory.map((pdt, i) => (
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
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => {
              // Ensure that imageURL is treated as an array and render the first image
              const imageUrl = Array.isArray(rowData.imageURL)
                ? rowData.imageURL[0]
                : rowData.imageURL;
              return (
                <img
                  src={imageUrl}
                  alt="Product"
                  className="w-32 h-16 object-contain rounded-md"
                />
              );
            },
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-medium text-textColor flex items-center justify-center">
                <HiCurrencyRupee />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
          {
            title: "Stock",
            field: "product_count",
          },
        ]}
        data={products}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, data) => {
              handleClick(data);
              // navigate("/edit", data);
              console.log("edit data ond", data);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (window.confirm("Confirm Deletion?")) {
                deleteAProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted"));
                  setTimeout(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
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

// import React from "react";
// import DataTable from "../Components/DataTable";
// import { HiCurrencyRupee } from "../assets/icons/index";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteAProduct, getAllProducts } from "../api";
// import { setAllProducts } from "../Context/actions/productActions";
// import { alertNULL, alertSuccess } from "../Context/actions/alertActions";

// const DBProducts = () => {
//   const products = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   return (
//     <div className="flex items-center justify-center gap-4 pt-6 w-full">
//       <DataTable
//         columns={[
//           {
//             title: "Image",
//             field: "imageURL",
//             render: (rowData) => (
//               <img
//                 src={rowData.imageURL}
//                 className="w-32 h-16 object-contain rounded-md"
//               />
//             ),
//           },
//           {
//             title: "Name",
//             field: "product_name",
//           },
//           {
//             title: "Category",
//             field: "product_category",
//           },
//           {
//             title: "Price",
//             field: "product_price",
//             render: (rowData) => (
//               <p className="text-xl font-medium text-textColor flex items-center justify-center">
//                 <HiCurrencyRupee />
//                 {parseFloat(rowData.product_price).toFixed(2)}
//               </p>
//             ),
//           },
//           {
//             title: "Stock",
//             field: "product_count",
//           },
//         ]}
//         data={products}
//         title="List of Products"
//         actions={[
//           {
//             icon: "edit",
//             tooltip: "Edit Data",
//             onClick: (event, rowData) => {
//               alert("Want to Edit  " + rowData.product_name);
//             },
//           },
//           {
//             icon: "delete",
//             tooltip: "Delete Data",
//             onClick: (event, rowData) => {
//               if (window.confirm("Confirm Deletion?")) {
//                 deleteAProduct(rowData.productId).then((res) => {
//                   dispatch(alertSuccess("Product Deleted"));
//                   setInterval(() => {
//                     dispatch(alertNULL());
//                   }, 3000);
//                   getAllProducts().then((data) => {
//                     dispatch(setAllProducts(data));
//                   });
//                 });
//               }
//             },
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default DBProducts;
