import React, { useEffect } from "react";
import { HiCurrencyRupee } from "../assets/icons/index";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { useDispatch, useSelector } from "react-redux";
import { createWallet, getWallet } from "../api";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";
import { setWallet } from "../Context/actions/walletActions";

const ProfileWallet = () => {
  const user = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wallet) {
      getWallet(user?.user_id).then((data) => {
        dispatch(setWallet(data));
      });
    }
  }, [dispatch, wallet, user]);

  const acivateWallet = async (e) => {
    e.preventDefault();
    const user_id = user?.user_id;
    const date = new Date();
    const response = await createWallet(user_id, date);
    if (response) {
      dispatch(alertSuccess("Wallet Activated"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      getWallet(user?.user_id).then((data) => {
        dispatch(setWallet(data));
      });
    } else {
      console.log("Failed to save");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-start gap-3 pt-3">
        {wallet === null ? (
          <div className="flex pt-10">
            <motion.button
              className="flex items-center justify-center w-60 h-10 bg-emerald-600 font-sans font-extrabold text-2xl rounded-lg text-white"
              {...buttonClick}
              onClick={acivateWallet}
            >
              Activate Wallet
            </motion.button>
          </div>
        ) : (
          <div className="flex pt-10">
            <p className="pt-1 text-2xl">Wallet Balance: {"  "}</p>
            <div className="flex items-center justify-center w-40 h-10 bg-emerald-600 font-sans font-extrabold text-2xl rounded-lg text-white">
              <p>
                <HiCurrencyRupee />
              </p>
              <p>{wallet.amount}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <table className="border-collapse w-50 ">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                S.No
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Transaction
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Reason
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Amount{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {wallet &&
              wallet?.transactions?.map((doc, index) => {
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
                      {doc?.transactiontype}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Discount Percentage
                      </span>
                      {doc?.reason}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Minumum Purchase Value
                      </span>
                      ₹ {doc?.amount}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileWallet;
