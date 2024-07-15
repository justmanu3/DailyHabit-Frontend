import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllUserDetails } from "../Context/actions/allUserActions";
import { blockAndUnblockUser, getAllUsers } from "../api";
import Avatar from "../assets/icons/Avatar.png";
import { buttonClick } from "../Animations";
import { motion } from "framer-motion";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUser);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(null);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, [allUsers, dispatch]);

  useEffect(() => {
    if (check !== null) {
      console.log("Check working ann");
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, [check, dispatch]);

  //block and unblock users
  const blockAndUnblock = (uid, checkDisabled) => {
    setCheck(!check);
    if (checkDisabled === false) {
      const disabledvalue = true;
      try {
        blockAndUnblockUser(uid, disabledvalue).then(() => {
          console.log("Values...kititiiii");
        });
        dispatch(alertSuccess("User Blocked"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      } catch (error) {}
    } else if (checkDisabled === true) {
      const disabledvalue = false;
      try {
        blockAndUnblockUser(uid, disabledvalue).then(() => {
          console.log("Values...kititiiii");
        });
        dispatch(alertSuccess("User Unblocked"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <motion.div className="flex items-center justify-center gap-4 pt-6 w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Image</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => (
            <tr key={user.uid}>
              <td className="py-2 px-4 border-b border-gray-200">
                <img
                  src={user.photoURL ? user.photoURL : Avatar}
                  className="w-32 h-16 object-contain rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.displayName}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <motion.p
                  className={`px-2 py-1 text-center text-primary rounded-2xl cursor-pointer ${
                    user.disabled === false ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => blockAndUnblock(user.uid, user.disabled)}
                >
                  {user.disabled === false ? "Unblocked" : "Blocked"}
                </motion.p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DBUsers;
