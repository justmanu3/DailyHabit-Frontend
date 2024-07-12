import React from 'react'
import ProfileLeft from '../Components/ProfileLeft';
import ProfileRight from '../Components/ProfileRight';

const Profile = () => {
  return (
    <div className="w-screen h-screen flex bg-primary">
     <ProfileLeft/>
     <ProfileRight/>
    </div>
  );
}

export default Profile