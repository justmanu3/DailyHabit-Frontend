import React from "react";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  //getting user from the redux
  const user = useSelector((state) => state.user);
  // const firebaseAuth = getAuth(app);

  // const signOut = () => {
  //   firebaseAuth
  //     .signOut()
  //     .then(() => {
  //       dispatch(setUserNull());
  //       navigate("/login", { replace: true });
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-textColor">
        Welcome to Daily Habit !
        {user?.name && (
          <span className="block text-base text-gray-900">{`Hello ${user?.name} ...`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        {/* <motion.div
          {...buttonClick}
          className="w-14 h-14 rounded-md cursor-pointer bg-primary backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <MdLogout />
        </motion.div> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
