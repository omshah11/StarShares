// Profile.js
import React, { useState } from 'react';
import ProfileCard from './profileCard';
import BiographyCard from './biographyCard';
import './profile.css'; // Your main CSS file
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import defaultImage from './default.png'; // import the default image
import recentlyPlayedButton from './recentlyPlayedButton'; // Assuming you have a RecentlyPlayedButton component
import DummyPlayButton from './DummyButton';

const Profile = () => {
  const userDetails = useSelector(selectUser).user;
  const [user, setUser] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    password: userDetails.password,
    profileImage: userDetails.profileImage || defaultImage // use the user's profile image or the default image
  });
  const [userBiography, setUserBiography] = useState(''); // Initialize with user's existing biography
  const handleBiographySave = (newBiography) => {
    // Save the new biography (you can send this to your backend)
    console.log('New biography:', newBiography);
    setUserBiography(newBiography); // Update the state with the new biography
  };

  return (
    <div className="profile-container">
      <ProfileCard user={user} />
      <BiographyCard initialBiography={userBiography} onSave={handleBiographySave} />
      <DummyPlayButton hello/>
    </div>
  );
};

export default Profile;
