import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "../assets/icons";
import { MdDelete } from "../assets/icons/index";
import Spinner from "./Spinner";
import { db, storage } from "../Config/firebase.config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../Context/actions/alertActions";
import { buttonClick } from "../Animations/index";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../Context/actions/productActions";
import { collection, getDocs } from "firebase/firestore";

const DBAddItems = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [productCount, setProductCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageDownloadURLs, setImageDownloadURLs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  ////uploading image
  const uploadImages = (e) => {
    setIsLoading(true);
    const files = Array.from(e.target.files);
    const uploadTasks = files.map((file) => {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progressing
          },
          (error) => {
            dispatch(alertDanger(`Error: ${error.message}`));
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(uploadTasks)
      .then((urls) => {
        setImageDownloadURLs(urls);
        setIsLoading(false);
        dispatch(alertSuccess("All images uploaded successfully"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      })
      .catch((error) => {
        console.error("Error uploading one or more files: ", error);
        setIsLoading(false);
      });
  };

  /////// deleting all images
  const deleteAllImagesFromFirebase = () => {
    setIsLoading(true);
    const deletePromises = imageDownloadURLs.map((url) => {
      const deleteRef = ref(storage, url);
      return deleteObject(deleteRef);
    });

    Promise.all(deletePromises)
      .then(() => {
        setImageDownloadURLs([]);
        setIsLoading(false);
        dispatch(alertSuccess("All images removed"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      })
      .catch((error) => {
        console.error("Error removing images: ", error);
        setIsLoading(false);
      });
  };

  ///
  const handleChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  /////

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

  ////

  useEffect(() => {
    console.log("Categories fetched:", category);
  }, [category]);

  // useEffect(() => {
  //   console.log("category kitti", category);
  // }, []);

  const submitProduct = () => {
    // Validate input fields
    if (!productName) {
      dispatch(alertDanger("Product name is required"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    if (!category) {
      dispatch(alertDanger("Category is required"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
      dispatch(alertDanger("Please enter a valid price"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    if (!productCount || isNaN(productCount) || productCount <= 0) {
      dispatch(alertDanger("Please enter Stock Count"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    if (!imageDownloadURLs.length) {
      dispatch(alertDanger("At least one image is required"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    const data = {
      product_name: productName,
      product_category: category,
      product_price: productPrice,
      product_count: productCount,
      imageURL: imageDownloadURLs,
    };

    addNewProduct(data)
      .then((res) => {
        console.log(res);
        dispatch(alertSuccess("New Product Added"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        setImageDownloadURLs([]);
        setProductName("");
        setProductPrice("");
        setProductCount("");
        setSelectedCategory("");
      })
      .catch((error) => {
        console.error("Failed to add new product", error);
        dispatch(alertDanger("Failed to add new product"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });

    getAllProducts()
      .then((data) => {
        dispatch(setAllProducts(data));
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        dispatch(alertDanger("Failed to Get products"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });
  };

  useEffect(() => {
    console.log("selected..", selectedCategory);
    console.log("category....", category);
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        {/* Input fields for product details */}
        <InputValueField
          type="text"
          placeholder={"Enter the Product Name"}
          stateFunc={setProductName}
          stateValue={productName}
        />

        <div className="w-full flex items-center justify-around">
          <select
            className="px-4 py-2 rounded-md text-lg text-lighttextGray font-normal cursor-pointer shadow-md border border-gray-200 backdrop-blur-md appearance-none bg-white"
            defaultValue={category}
            onChange={handleChange}
            style={{ minWidth: "910px" }}
          >
            <option value="other">Select a category</option>

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
          placeholder={"Enter the Price"}
          stateFunc={setProductPrice}
          stateValue={productPrice}
        />
        <InputValueField
          type="number"
          placeholder={"Enter the Stock Count"}
          stateFunc={setProductCount}
          stateValue={productCount}
        />
        {/* Image upload section */}
        <div className="w-full bg-cardOverlay backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-wrap justify-center gap-2 p-2">
              {imageDownloadURLs.map((url, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  src={url}
                  className="w-25 h-25 object-contain rounded-md"
                  style={{ width: "250px", height: "250px" }}
                />
              ))}
            </div>
          )}
          {!isLoading && imageDownloadURLs.length > 0 && (
            <motion.button
              {...buttonClick}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
              onClick={deleteAllImagesFromFirebase}
            >
              <MdDelete className="-rotate-0 text-white" />
            </motion.button>
          )}
        </div>
        {/* File input hidden behind label */}
        {!isLoading && (
          <label className="w-full bg-cardOverlay rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
              <div className="flex flex-col justify-center items-center cursor-pointer">
                <p className="font-bold text-4xl">
                  <FaCloudUploadAlt />
                </p>
                <p className="text-lg text-textColor">
                  Click to Upload an Image
                </p>
              </div>
            </div>
            <input
              type="file"
              name="upload-image"
              accept="image/*"
              onChange={uploadImages}
              multiple
              className="w-0 h-0"
            />
          </label>
        )}
        <motion.button
          onClick={submitProduct}
          {...buttonClick}
          className="w-9/12 py-2 bg-red-400 text-white hover:bg-red-600 cursor-pointer"
        >
          Submit
        </motion.button>
      </div>
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

export default DBAddItems;
