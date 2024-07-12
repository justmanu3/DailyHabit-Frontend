import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllUserDetails } from "../Context/actions/allUserActions";
import { blockAndUnblockUser, getAllUsers } from "../api";
import DataTable from "./DataTable";
import Avatar from "../assets/icons/Avatar.png";
import { buttonClick } from "../Animations";
import { motion } from "framer-motion";
import { alertNULL, alertSuccess } from "../Context/actions/alertActions";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUser);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(null);
  // const [checkTwo, setCheckTwo] = useState(null);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  useEffect(() => {
    // if (check || checkTwo) {
    console.log("Check working ann");
    getAllUsers().then((data) => {
      dispatch(setAllUserDetails(data));
    });
    // }
  }, [check]);

  //block and unblock users
  const blockAndUnblock = (uid, checkDisabled) => {
    setCheck(!check);
    if (checkDisabled === false) {
      const disabledvalue = true;
      try {
        blockAndUnblockUser(uid, disabledvalue).then(() => {
          // setCheck(true);
          // setCheckTwo(false);
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
          // setCheckTwo(true);
          // setCheck(false);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!allUsers) {

  //       const data = await getAllUsers();
  //       dispatch(setAllUserDetails(data));

  //     }
  //   };

  //   fetchData();
  // }, [allUsers, dispatch]);

  return (
    <motion.div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : Avatar}
                className="w-32 h-16 object-contain rounded-full"
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },

          {
            title: "Action",
            field: "disabled",
            render: (rowData) => (
              <p
                className={`px-2 py-1 text-center text-primary rounded-2xl cursor-pointer ${
                  rowData.disabled === false ? "bg-emerald-500" : "bg-red-500"
                }`}
                {...buttonClick}
                onClick={() => blockAndUnblock(rowData.uid, rowData.disabled)}
              >
                {rowData.disabled === false ? "Unblocked" : "Blocked"}
              </p>
            ),
          },
        ]}
        data={allUsers}
        title="List of Users"
        actions={
          [
            // {
            //   icon: "edit",
            //   tooltip: "Block User?",
            //   onClick: (event, rowData) => {
            //     blockAndUnblock(rowData.uid, rowData.disabled);
            //     // alert("Want to Edit  " + rowData.displayName);
            //   },
            // },
            // {
            //   icon: "delete",
            //   tooltip: "Delete User",
            //   onClick: (event, rowData) => {
            //     if (window.confirm("Confirm Deletion?")) {
            //       deleteAProduct(rowData.productId).then((res) => {
            //         dispatch(alertSuccess("Product Deleted"));
            //         setInterval(() => {
            //           dispatch(alertNULL());
            //         }, 3000);
            //         getAllProducts().then((data) => {
            //           dispatch(setAllProducts(data));
            //         });
            //       });
            //     }
            //   },
            // },
          ]
        }
      />
    </motion.div>
  );
};

export default DBUsers;
