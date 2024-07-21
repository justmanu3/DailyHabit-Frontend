import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllAddress } from "../Context/actions/addressActions";
import {
  addNewAddress,
  baseURL,
  codOrderPlacement,
  getACoupon,
  getAddress,
  getAllAddress,
  getAllCoupons,
  getWallet,
  orderByWallet,
} from "../api";
import {
  alertNULL,
  alertSuccess,
  alertWarning,
} from "../Context/actions/alertActions";
import axios from "axios";
import { setAllCoupons } from "../Context/actions/couponActions";
import { setWallet } from "../Context/actions/walletActions";

function CheckoutPage() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const addresses = useSelector((state) => state.address);
  const wallet = useSelector((state) => state.wallet);
  const coupons = useSelector((state) => state.coupons);
  const [myAddress, setMyAddress] = useState(null);
  const [myCoupon, setMyCoupon] = useState(null);

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [status, setStatus] = useState("COD");
  const [status1, setStatus1] = useState("paid");
  const [couponApplied, setCouponApplied] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletId = wallet?.walletId;

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((data) => {
        tot += data.product_price * data.quantity;
      });
      setTotal(tot);
      setSubTotal(tot);
    }
  }, [cart]);

  useEffect(() => {
    if (!addresses || addresses.length === 0) {
      getAllAddress(user?.user_id).then((data) => {
        dispatch(setAllAddress(data));
      });
    }
  }, [dispatch, addresses, user]);

  useEffect(() => {
    if (!coupons) {
      getAllCoupons().then((data) => {
        dispatch(setAllCoupons(data));
      });
    }
  }, [dispatch, coupons]);

  useEffect(() => {
    if (!wallet) {
      getWallet(user?.user_id).then((data) => {
        dispatch(setWallet(data));
      });
    }
  }, [dispatch, wallet]);

  const user_id = user?.user_id;

  const customer = {
    customerdata: {
      cart: cart,
      total: total,
      user: user?.user_id,
    },
    status: status,
    customer_details: {
      name: user?.name,
      email: myAddress?.email,
      phone: myAddress?.phone,
      address: myAddress,
    },
  };

  async function checkout() {
    if (!selectedAddress) {
      dispatch(alertWarning("Please select an address"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    const result = await codOrderPlacement(user_id, customer);
    console.log("Order placement result:", result);
    if (result) {
      console.log("Order placed successfully!");
      dispatch(alertSuccess("Order placed"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      navigate("/checkoutsuccess");
    } else {
      dispatch(alertWarning("Error in placing order"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  }

  //wallet order

  const customer1 = {
    customerdata: {
      cart: cart,
      total: total,
      user: user?.user_id,
    },
    status: status1,
    customer_details: {
      name: user?.name,
      email: myAddress?.email,
      phone: myAddress?.phone,
      address: myAddress,
    },
  };

  async function payByWallet() {
    if (!selectedAddress) {
      dispatch(alertWarning("Please select an address"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }
    try {
      const result = await codOrderPlacement(user_id, customer1);
      console.log("Order placement result:", result);

      if (result) {
        orderByWallet(user_id, total, walletId);
        console.log("Order placed successfully!");
        dispatch(alertSuccess("Order placed"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        navigate("/checkoutsuccess");
      } else {
        dispatch(alertWarning("Error in placing order"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      }
    } catch (error) {
      console.error("Error in order placement:", error);
      dispatch(alertWarning("Error in placing order"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  }

  const initialFormData = {
    line1: "",
    line2: "",
    city: "Kochi",
    state: "Kerala",
    postal_code: "678778",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //coupon

  const handleCouponChange = (e) => {
    const selectedCouponId = e.target.value;
    setSelectedCoupon(selectedCouponId);
    console.log(selectedCouponId);
  };

  const couponApply = async () => {
    if (selectedCoupon) {
      try {
        const response = await getACoupon(selectedCoupon);
        console.log(response);
        if (response) {
          console.log("Coupon retrieved:", response);
          setMyCoupon(response);

          const discountAmount = response.data.coupon_discount;
          const newTotal = total - discountAmount;

          setTotal(newTotal > 0 ? newTotal : 0);

          dispatch(alertSuccess("Coupon Applied"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);

          setCouponApplied(true);
        } else {
          console.log("No matching coupon found.");
        }
      } catch (error) {
        console.error("Error while getting the coupon:", error);
      }
    } else {
      console.log("No coupon selected.");
    }
  };

  //remove coupon

  const removeCoupon = () => {
    setMyCoupon(null);
    setSelectedCoupon(null);
    setCouponApplied(false);

    dispatch(alertSuccess("Coupon Removed"));
    setTimeout(() => {
      dispatch(alertNULL());
    }, 3000);

    // Reset the total to the original amount before the coupon was applied
    let tot = 0;
    if (cart) {
      cart.forEach((data) => {
        tot += data.product_price * data.quantity;
      });
    }
    setTotal(tot);
  };
  //address

  const handleAddressChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedAddress(selectedId);
    console.log("Selected address ID:", selectedId);

    try {
      const address = await getAnAddress(selectedId);
      console.log("Address retrieved:", address);
    } catch (error) {
      console.error("Error while getting the address:", error);
    }
  };

  const getAnAddress = async (selectedAddressId) => {
    try {
      const response = await getAddress(user?.user_id, selectedAddressId);
      if (response) {
        console.log("Address retrieved:", response);
        setMyAddress(response);
        return response;
      } else {
        console.log("No address found or an error occurred.");
        return null;
      }
    } catch (error) {
      console.error("Error while getting the address:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addNewAddress(user?.user_id, formData);
    if (response) {
      setFormData(initialFormData);
      dispatch(alertSuccess("New Address Added"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      getAllAddress(user?.user_id).then((data) => {
        dispatch(setAllAddress(data));
      });
    } else {
      console.log("Failed to save");
    }
  };

  const confirmPaymentMethod = () => {
    if (!selectedAddress) {
      dispatch(alertWarning("Please select an address"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    const updatedCart = cart.map((item) => ({
      ...item,
      imageURL: null,
    }));

    const data = {
      user: user,
      cart: updatedCart,
      total: total,
    };

    console.log("Sending data to the API:", data);

    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        console.log("Response from API:", res.data);
        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          console.error("URL not found in the response");
        }
      })
      .catch((err) => {
        console.error("Error directing to checkout session:", err);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen px-4 lg:px-10 gap-6 lg:gap-10 bg-gray-100">
      <Header />

      {/* Delivery Address Form */}
      <motion.div className="w-full lg:w-1/3 bg-gray-200 rounded-2xl p-5 pt-20 drop-shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="addressLine1"
              className="block mb-1 text-sm font-medium"
            >
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="line1"
              autoComplete="address-line1"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              value={formData.line1}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="addressLine2"
              className="block mb-1 text-sm font-medium"
            >
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="line2"
              autoComplete="address-line2"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={formData.line2}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="city" className="block mb-1 text-sm font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              autoComplete="address-level2"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              value={formData.city}
              readOnly
            />
          </div>
          <div className="mb-2">
            <label htmlFor="state" className="block mb-1 text-sm font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              autoComplete="address-level1"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              value={formData.state}
              readOnly
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="postalcode"
              className="block mb-1 text-sm font-medium"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="postalcode"
              name="postal_code"
              autoComplete="postal-code"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              value={formData.postal_code}
              readOnly
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <motion.button
            {...buttonClick}
            type="submit"
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Save Address
          </motion.button>
        </form>
      </motion.div>

      {/* Order Details and Payment */}
      <motion.div className="w-full pt-20 lg:w-2/3 border border-red-200 bg-white rounded-md p-5 drop-shadow-lg">
        <h2 className="font-bold text-lg mb-4">Order Details</h2>
        <table className="w-full table-auto mb-4">
          <thead>
            <tr>
              <th className="text-left px-2 py-1">Product</th>
              <th className="text-right px-2 py-1">Price & Quantity</th>
            </tr>
          </thead>
          <tbody>
            {(cart || []).map((item, index) => (
              <tr key={index}>
                <td className="text-left px-2 py-1">{item.product_name}</td>
                <td className="text-right px-2 py-1">
                  {Number(item.product_price).toFixed(2)} * {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <p className="font-bold">Subtotal:</p>
          <p>₹ {subTotal}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-2">
          <p>Shipping: </p>
          <p>Free</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-2">
          <p className="text-red-500 font-bold">Coupon Offer:</p>
          <p className="text-red-500 font-bold">₹</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-2 text-lg font-bold">
          <p>Total:</p>
          <p>₹ {total}</p>
        </div>

        <h3 className="font-bold text-lg mt-4 mb-2">Coupons</h3>
        {coupons?.length > 0 ? (
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
            <select
              className="w-full md:w-2/4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={selectedCoupon}
              onChange={handleCouponChange}
            >
              <option value="">Apply Coupon</option>
              {coupons
                .filter((coup) => total > coup.min_amount)
                .map((coup, index) => (
                  <option key={index} value={coup.couponId}>
                    {coup.coupon_name}
                  </option>
                ))}
            </select>

            <div className="flex items-center justify-center bg-blue-600 rounded-3xl mt-4 md:mt-0">
              {couponApplied ? (
                <button
                  {...buttonClick}
                  className="font-semibold text-white cursor-pointer px-4 py-2"
                  onClick={removeCoupon}
                >
                  Remove Coupon
                </button>
              ) : (
                <button
                  {...buttonClick}
                  className="font-semibold text-white cursor-pointer px-4 py-2"
                  onClick={couponApply}
                >
                  Apply Coupon
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>No coupons available</p>
        )}

        <h3 className="font-bold text-lg mt-4 mb-2">Select Address</h3>

        {addresses?.length > 0 ? (
          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={selectedAddress}
              onChange={handleAddressChange}
              required
            >
              <option value="">Select an address</option>
              {addresses.map((addr, index) => (
                <option key={index} value={addr.addressId}>
                  {`${addr.line1}, ${addr.line2}, ${addr.city}, ${addr.state}, ${addr.postal_code}, ${addr.phone}, ${addr.email}`}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>No addresses available. Please add a new address.</p>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
          {wallet && wallet.amount !== 0 && total < wallet.amount ? (
            <motion.button
              {...buttonClick}
              className="bg-emerald-500 text-white py-2 px-6 rounded-md hover:bg-emerald-600 border border-white"
              onClick={payByWallet}
            >
              Pay by Wallet
            </motion.button>
          ) : null}

          {total && total > 1000 ? null : (
            <motion.button
              {...buttonClick}
              className="bg-emerald-500 text-white py-2 px-6 rounded-md hover:bg-emerald-600 border border-white"
              onClick={checkout}
            >
              Cash On Delivery
            </motion.button>
          )}

          <motion.button
            {...buttonClick}
            className="bg-white text-emerald-700 font-bold py-2 px-6 rounded-md border border-emerald-400"
            onClick={confirmPaymentMethod}
          >
            Pay Online
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckoutPage;
