import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../Context/actions/alertActions";
import { addNewCoupon, deleteACoupon, getAllCoupons } from "../api";
import { setAllCoupons } from "../Context/actions/couponActions";

const DBCoupons = () => {
  const [showModal, setShowModal] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [couponPercentage, setCouponPercentage] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxDiscount, setMaxDiscount] = useState(null);
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons);

  useEffect(() => {
    if (!coupons) {
      getAllCoupons().then((data) => {
        dispatch(setAllCoupons(data));
      });
    }
  }, [dispatch, coupons]);

  const handleSubmit = () => {
    if (!couponName) {
      dispatch(alertDanger("Coupon Name is required"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    if (!couponPercentage || isNaN(couponPercentage) || couponPercentage <= 0) {
      dispatch(alertDanger("Please enter valid Coupon Percentage"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    const data = {
      coupon_name: couponName,
      coupon_discount: couponPercentage,
      min_amount: minAmount,
      max_discount: maxDiscount,
    };

    addNewCoupon(data)
      .then((res) => {
        console.log(res);
        dispatch(alertSuccess("New Coupon Added"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        setCouponName("");
        setCouponPercentage(null);
      })
      .catch((error) => {
        console.error("Failed to add new coupon", error);
        dispatch(alertDanger("Failed to add new coupon"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });
    getAllCoupons()
      .then((data) => {
        dispatch(setAllCoupons(data));
      })
      .catch((error) => {
        console.error("Failed to fetch coupons", error);
        dispatch(alertDanger("Failed to Get coupons"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });
  };

  const handleDelete = (couponId) => {
    deleteACoupon(couponId).then((res) => {
      console.log(couponId);
      dispatch(alertSuccess("Coupon Deleted"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      getAllCoupons().then((data) => {
        dispatch(setAllCoupons(data));
      });
    });
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-start pt-5">
          <p className="font-semibold text-3xl">Coupons</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className=" inline-block mt-5 px-12 py-2.5 bg-emerald-500 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out  shadow-emerald-600/50 "
        >
          Add Coupon
        </button>
      </div>
      <div className="mt-10">
        <table className="border-collapse w-50 ">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                S.No
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Coupon Name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Discount Percentage
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Minimum Purchase Value
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                maximum Discount
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons &&
              coupons?.map((doc, index) => {
                return (
                  <tr
                    key={index}
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
                        Coupon Name
                      </span>
                      {doc?.coupon_name}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Discount Percentage
                      </span>
                      {doc?.coupon_discount}%
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Minumum Purchase Value
                      </span>
                      ₹ {doc?.min_amount}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Maximum Discount
                      </span>
                      ₹ {doc?.max_discount}
                    </td>

                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static hover:cursor">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Action
                      </span>

                      <span
                        className="rounded bg-red-400 py-1 px-3 text-xs font-bold cursor-pointer"
                        onClick={() => handleDelete(doc?.couponId)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {showModal ? (
          <>
            <div className=" h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <div className="">
                      <h3 className="text-3xl font-semibold">Add Coupon</h3>
                    </div>

                    <button
                      className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form
                      className="  max-w-[600px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col text-grey-500 ">
                        <label className="text-gray-600"> Coupon Name </label>

                        <input
                          className="rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none"
                          type="text"
                          name="name"
                          defaultValue={couponName}
                          onChange={(e) => setCouponName(e.target.value)}
                        />

                        <label className="text-gray-600">
                          {" "}
                          Discount Percentage{" "}
                        </label>

                        <input
                          className="rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none"
                          type="number"
                          name="percentage"
                          defaultValue={couponPercentage}
                          onChange={(e) => setCouponPercentage(e.target.value)}
                        />
                        <label className="text-gray-600">
                          {" "}
                          Minimum Amount{" "}
                        </label>

                        <input
                          className="rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none"
                          type="number"
                          name="percentage"
                          defaultValue={minAmount}
                          onChange={(e) => setMinAmount(e.target.value)}
                        />
                        <label className="text-gray-600">
                          {" "}
                          Maximum Discount{" "}
                        </label>

                        <input
                          className="rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none"
                          type="number"
                          name="percentage"
                          defaultValue={maxDiscount}
                          onChange={(e) => setMaxDiscount(e.target.value)}
                        />
                      </div>

                      <br />
                      <button
                        className="rounded-full w-full inline-block px-10 py-2 bg-green-600 text-white  leading-tight text-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-shadow-600/50 "
                        // onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <div></div>
                    </form>
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default DBCoupons;
