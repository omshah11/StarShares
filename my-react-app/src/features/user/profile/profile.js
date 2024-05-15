// Profile.js
import React, { useState } from 'react';
import ProfileCard from './profileCard';
import BiographyCard from './biographyCard';
import './profile.css'; // Your main CSS file
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import defaultImage from './default.png'; // import the default image
import RecentlyPlayedButton from './recentlyPlayedButton';
import NewsCard from './newsCard';
import TransactionsCard from './transactionCard';

const Profile = () => {
  const userDetails = useSelector(selectUser).user;
  const user = useState({
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
    <div className="profile-container" >
      <div className="left-container">
        <div className="profile-container-1">
          <ProfileCard user={user} />
          <p></p>
          <BiographyCard initialBiography={userBiography} onSave={handleBiographySave} />
          <div className="play-container">
            <RecentlyPlayedButton/>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="transactions-container"> 
          <TransactionsCard/>
        </div>
        <div className="news-container">
          <NewsCard/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
