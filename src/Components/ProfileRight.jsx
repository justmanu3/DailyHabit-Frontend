import React from 'react'
import ProfileHeader from './ProfileHeader';
import { Route, Routes } from 'react-router-dom';
import ProfileUser from './ProfileUser';
import ProfilePassword from './ProfilePassword'
import ProfileAddress from './ProfileAddress'
import ProfileWallet from './ProfileWallet';

const ProfileRight = () => {
  return (
    <div className="flex flex-col py-12 px-12 flex-1 h-full">
      <ProfileHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/userprofile" element={<ProfileUser />} />
          <Route path="/useraddress" element={<ProfileAddress />} />
          <Route path="/userpassword" element={<ProfilePassword />} />
          <Route path="/userwallet" element={<ProfileWallet />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProfileRight