// ProfileCard.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateProfile } from '../userSlice';
import "./profile.css";
import defaultImage from './default.png'; // import the default image

const ProfileCard = () => {
  const [backgroundColor, setBackgroundColor] = useState('#e3e8f0'); // Initial color
  const userDetails = useSelector(selectUser).user;
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    password: userDetails.password,
    profileImage: userDetails.profileImage || defaultImage // use the user's profile image or the default image
  });
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editing) {
      dispatch(updateProfile(user)); // Dispatch action to update profile
    }
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  return (
    <div className="profile">
      <div style={{backgroundColor}} className="profile-card">
        <h2>Profile</h2>
        <img src={user.profileImage} alt="ProfileCard" />
        {editing ? (
          <div className="edit">
            <p>Choose Profile Image</p>
            <input type="file" name="profileImage" onChange={handleChange} />
            <p>Change Email</p>
            <input type="email" name="email" value={user.email} onChange={handleChange} />
            <p>Change Password</p>
            <input type="password" name="password" value={user.password} onChange={handleChange} />
          </div>
        ) : (
          <div className="info">
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
          </div>
        )}
        
        <div>
          <button className='profile-edit' onClick={handleEdit}>{editing ? 'Save Profile' : 'Edit Profile'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
