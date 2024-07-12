import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOffer,
  deleteAnOffer,
  getAllOffers,
  getAllProducts,
} from "../api";
import { setAllProducts } from "../Context/actions/productActions";
import { setAllOffers } from "../Context/actions/offerActions";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../Context/actions/alertActions";

const initialData = {
  offer_name: "",
  offer_discount: "",
  productId: "",
};

const DBOffers = () => {
  const products = useSelector((state) => state.products);
  const offers = useSelector((state) => state.offers);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setData({
      ...data,
      productId: Number(e.target.value),
    });
  };

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (!offers) {
      getAllOffers().then((data) => {
        dispatch(setAllOffers(data));
      });
    }
  }, [dispatch, offers]);

  //create offer

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addNewOffer(data);
      dispatch(alertSuccess("New Coupon Added"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    } catch (error) {
      console.error("Failed to add new coupon", error);
      dispatch(alertDanger("Failed to add new coupon"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }

    try {
      const data = await getAllOffers();
      dispatch(setAllOffers(data));
    } catch (error) {
      console.error("Failed to fetch coupons", error);
      dispatch(alertDanger("Failed to get coupons"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }

    setData(initialData);
    setShowModal(false);
  };

  const handleDelete = (offerId) => {
    deleteAnOffer(offerId).then((res) => {
      console.log(offerId);
      dispatch(alertSuccess("Product Offer Deleted"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      getAllOffers().then((data) => {
        dispatch(setAllOffers(data));
      });
    });
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-start pt-5">
          <p className="font-semibold text-3xl">Offers</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-block mt-5 px-12 py-2.5 bg-blue-500 text-white leading-tight text-xl font-bold rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out shadow-blue-600/50"
        >
          Add Offer
        </button>
        <div className="mt-10">
          <table className="border-collapse w-50">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  S.No
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Offer
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Product
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Discount Percentage
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {offers?.length > 0 ? (
                offers.map((offer, index) => (
                  <tr
                    key={offer.offerId}
                    className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        S.No
                      </span>
                      {index + 1}
                    </td>

                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Offer
                      </span>
                      {offer.offer_name}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Product
                      </span>
                      {products?.find(
                        (product) => product.productId === offer.productId
                      )?.product_name || "Unknown"}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Discount Percentage
                      </span>
                      {offer.offer_discount}%
                    </td>

                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static hover:cursor">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Action
                      </span>

                      <span
                        className="rounded bg-red-400 py-1 px-3 text-xs font-bold cursor-pointer"
                        onClick={() => handleDelete(offer.offerId)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No offers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {showModal ? (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="max-w-lg w-full p-6 bg-white rounded-2xl">
                  <div className=" flex items-center justify-end  w-full">
                    <button
                      className="flex items-center bg-red-600 rounded-full w-6 justify-center text-md font-bold text-white"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      x
                    </button>
                  </div>
                  <h1 className="text-xl text-red-500 font-semibold">
                    Hello there,{" "}
                    <span className="font-normal text-black">
                      Create new Offer?
                    </span>
                  </h1>
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <label
                      htmlFor="product"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Product
                    </label>
                    <select
                      id="product"
                      type="number"
                      name="productId"
                      className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      value={data.productId}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="" disabled>
                        Select a product
                      </option>
                      {products &&
                        products.map((product, index) => (
                          <option key={index} value={product.productId}>
                            {product.product_name}
                          </option>
                        ))}
                    </select>

                    <label
                      htmlFor="offer_name"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Offer Name
                    </label>
                    <input
                      id="offer_name"
                      type="text"
                      name="offer_name"
                      autoComplete="address-line2"
                      className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      value={data.offer_name}
                      onChange={handleChange}
                      required
                    />

                    <label
                      htmlFor="offer_discount"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Discount Percentage
                    </label>
                    <input
                      id="offer_discount"
                      type="number"
                      name="offer_discount"
                      autoComplete="address-level2"
                      className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                      value={data.offer_discount}
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className="w-full py-3 mt-4 font-medium tracking-widest text-white uppercase bg-red-400 shadow-lg focus:outline-none hover:bg-red-500 hover:shadow-none"
                    >
                      SAVE
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DBOffers;
