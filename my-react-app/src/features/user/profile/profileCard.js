import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import "./profile.css";
import defaultImage from './default.png'; // import the default image

const ProfileCard = () => {
  const [backgroundColor, setBackgroundColor] = useState('#556771'); // Initial color
  const [borderColor, setBorderColor] = useState('#000'); // Initial color
  const [coloring, setColoring] = useState(false);

  const userDetails = useSelector(selectUser).user;
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    password: userDetails.password,
    profileImage: userDetails.profileImage || defaultImage // use the user's profile image or the default image
  });

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleColor = () => {
    setColoring(!coloring);
  }

  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      setUser({...user, profileImage: URL.createObjectURL(e.target.files[0])});
    } else {
      setUser({...user, [e.target.name]: e.target.value});
    }
  };

  const handleColorChange = (e) => {
    // Change the background color to a new value
    setBackgroundColor(e.target.value);
    setBorderColor(e.target.value);
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
        {coloring ? (
          <div className="color-change">
            <input type="color" onChange={handleColorChange} />
          </div>
        ) :
        ( 
          <div className="standard">
          </div>
        )}
        <div>
          <button className='profile-edit' onClick={handleEdit}>{editing ? 'Save Profile' : 'Edit Profile'}</button>
          <button className='backcolor-edit' style={{marginLeft: '2%'}} onClick={handleColor}> {coloring ? 'Save Profile' : 'Change Color'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
