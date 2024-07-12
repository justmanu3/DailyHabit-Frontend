import React, { useEffect, useState } from "react";
import { addNewAddress, deleteAnAddress, getAllAddress } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setAllAddress } from "../Context/actions/addressActions";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";

const ProfileAddress = () => {
  const address = useSelector((state) => state.address);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!address) {
      getAllAddress(user?.user_id).then((data) => {
        dispatch(setAllAddress(data));
      });
    }
  }, [dispatch, address, user]);

  useEffect(() => {
    setAddressList(address);
  }, [address]);

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

  // Delete address
  const deleteAddress = async (addressId) => {
    const response = await deleteAnAddress(user?.user_id, addressId);
    console.log("delete function ==------>", user?.user_id, addressId);
    if (response) {
      dispatch(alertSuccess("Address Deleted"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      getAllAddress(user?.user_id).then((data) => {
        dispatch(setAllAddress(data));
      });
    } else {
      console.log("Failed to delete address");
    }
  };

  return (
    <div className="flex items-center justify-between h-screen px-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-2xl">
        <h1 className="text-xl text-red-500 font-semibold">
          Hello there,{" "}
          <span className="font-normal text-black">Create new Address?</span>
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <label
            htmlFor="addressLine1"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Address Line 1
          </label>
          <input
            id="addressLine1"
            type="text"
            name="line1"
            autoComplete="address-line1"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            value={formData.line1}
            onChange={handleChange}
          />

          <label
            htmlFor="addressLine2"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Address Line 2
          </label>
          <input
            id="addressLine2"
            type="text"
            name="line2"
            autoComplete="address-line2"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            value={formData.line2}
            onChange={handleChange}
          />

          <label
            htmlFor="city"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            autoComplete="address-level2"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            value={formData.city}
            readOnly
          />

          <label
            htmlFor="state"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            State
          </label>
          <input
            id="state"
            type="text"
            name="state"
            autoComplete="address-level1"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            value={formData.state}
            readOnly
          />

          <label
            htmlFor="zipCode"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Pin Code
          </label>
          <input
            id="zipCode"
            type="text"
            name="postal_code"
            autoComplete="postal-code"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            value={formData.postal_code}
            readOnly
          />

          <label
            htmlFor="email"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label
            htmlFor="phoneNumber"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            name="phone"
            autoComplete="tel"
            className="block w-full p-3 mt-1 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            value={formData.phone}
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

      {addressList?.length > 0 ? (
        <div className="max-w-lg w-full p-6 bg-white rounded-2xl ml-4">
          <h2 className="text-xl text-red-600 font-semibold">ADDRESSES</h2>
          <div className="mt-4">
            {addressList?.map((addr, index) => (
              <div
                key={index}
                className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-700">{addr.line1}</p>
                  <p className="text-gray-700">{addr.line2}</p>
                  <p className="text-gray-700">
                    {addr.city}, {addr.state} {addr.pincode}
                  </p>
                  <p className="text-gray-700">{addr.email}</p>
                  <p className="text-gray-700">{addr.phone}</p>
                </div>
                <motion.div className="flex space-x-2">
                  {/* <motion.button
                    {...buttonClick}
                    className="px-3 py-1 text-xs text-white bg-green-400 rounded hover:bg-green-500"
                    onClick={() => setIsOpen(true)}
                  >
                    Edit
                  </motion.button> */}
                  <motion.button
                    {...buttonClick}
                    className="px-3 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-500"
                    onClick={() => deleteAddress(addr.addressId)}
                  >
                    Delete
                  </motion.button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No addresses found</p>
      )}
    </div>
  );
};

export default ProfileAddress;
